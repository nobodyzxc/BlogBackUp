---
title: 我所理解的 continuation
date: 2019-08-10 09:41:46
categories:
---

<center>
對，就是那個 continuation。
</center>

<!-- more -->

<br><br>

# About Scheme

學校 scheme 學了大半學期，continuation 這個詞估計同學連聽都沒聽過。

說到底我們學 scheme 也就是為了寫那個 eval/apply (mini scheme) 罷了，
頂多還有 oop 那個 vtable 而已（就是實作那個傳統 oo 的 message passing）。

用 scheme 寫 compiler 什麼的根本是夢想（艸
當初如果學的是 yscheme 的 p523(p423) 該有多好（
反正現在入坑還來得及（？

總結一下目前為止，除了老師的教材，我學習過的 scheme 資源好了。

- [SICP](https://sarabander.github.io/sicp/html/index.xhtml)
- [Yet Another Scheme Tutorial](https://deathking.github.io/yast-cn/)
- [The Scheme Programming Language](https://scheme.com/tspl4)

其中在學校老師推薦的閱讀是 SICP，我讀完第一章就讀不下去了。
後來看到 yast，就先跳過去讀，第一次看到 continuation 就是在這裡，
還有 promise 之類的東西，才了解到原來 scheme 除了 S-expression 外，還有這麼多有趣的特性。

不過讀 yast 跳過了蠻多 macro 的部份，因為有許多內容是基於實作 (MIT Scheme) 的。
後來我就去寫我的 scheme interpreter in C， 雖然是個玩具，不過也玩了很久。

目前因為 Lab 同學介紹，我得知了 [yscheme](https://github.com/tiancaiamao/yscheme)，但在研究時發現自己對 syntax 還是不太熟，
所以又找了 tspl ，準備詳細地再學一次。

目前對於 Scheme 的計畫是 tspl > yscheme > SICP > The Little Schemer（沒有官方版本，只有找到[筆記](https://the-little-schemer.readthedocs.io/zh_CN/latest/commandments_and_rules.html)）。
不過要完成大概需要很久吧（

此外，我來說一下我接觸過的 lisp 實作吧。

scheme:
- [Guile](https://www.gnu.org/software/guile/) 出自 GNU ，強調其腳本結合性，可以寫 C/Cpp 去擴展它，編譯器前端還支持 JS, elisp, Lua。
- [Racket](https://plt-scheme.org/) 又稱 plt-scheme, DrScheme，其底下有一堆小語言，[flolac'18](/2018/07/27/flolac18/#Talk-Racket) 有介紹，我寫作業用的 impl。
- [BiwaScheme](https://www.biwascheme.org/) JS 寫的，當初學校教學用的是這個的 [REPL](https://repl.it/languages/scheme)。
- [GNU/MIT-scheme](https://www.gnu.org/software/mit-scheme/) yast 用的就是這個。
- [Chez Scheme](https://scheme.com/download/) Petite 是他的免費版本。此 impl 聽說很快，可以看看[大神介紹](https://www.yinwang.org/blog-cn/2013/03/28/chez-scheme)。
- [CHICKEN Scheme](https://www.call-cc.org/) 這我聽很久了，但一直沒去了解它（

common lisp:
- [CLISP](https://clisp.sourceforge.io/) GNU 的 Common Lisp 的實作，Common Lisp 和 Scheme 為 Lisp 兩大流派，彼此影響。


others:
- [elisp](https://www.gnu.org/software/emacs/manual/html_node/eintr/) Emacs Lisp，神之編輯器的內建語言，神的語言果然不能太平凡啊。
- [Clojure](https://clojure.org/) 跑在 JVM 上的 lisp 方言。

# About evaluation

要理解 continuation，我們必須先了解 scheme 的 eval/apply。
continuation 和 evaluation strategy 是習習相關的。

## application

> `(procedure arg ...)`

假設現在有個簡單的 application: `(+ 1 2)`，interpreter 要去解釋他：
- eval `+` symbol，find the procedure bind to it.
- eval `1` literal，convert it to number instance
- eval `2` literal，convert it to number instance
- apply procedure that bind to `+` to 1 and 2
- return 3

複雜一點的例子 `(cons (+ 1 2) (list 3))`：
- eval `cons`, find the procedure that bind to it
- eval `(+ 1 2)`
   - eval `+` symbol，find the procedure bind to it.
   - eval `1` literal，convert it to number instance
   - eval `2` literal，convert it to number instance
   - apply procedure that bind to `+` to 1 and 2
   - return 3
- eval `(list 3)`
   - eval `list`, find the procedure(list constructor) bind to it
   - eval `3` literal, convert it to number instance
   - return (3 . nil)
- apply cons on 3 and 3
- return (3 . (3 . nil))

## special form - if

> `(if test-expr then-expr)`
> `(if test-expr then-expr else-expr)`

叫做 special form 的原因是因為它的 evaluation strategy 和 application 不同，
凡是 special form 的 keyword 都有一套屬於自己的 evaluation strategy。

舉個例子，如果把 if 實作成 application 的話，每個參數都要被 eval。
考慮此情況：`(if #t (+ 1 2) (1 2))`。

在 application 中 `(1 2)` 不能被 eval，因為 `1` 並不是一個 procedure，他不能 apply 到 `2` 上。
這會讓 interpreter 拋出一個 exception 來警告你。
但實際上 interpreter 卻沒有。為什麼呢？

因為 `if` 是 special form，他只會 eval 關心的部份，剩下的部份他不進行 eval，所以不噴 exception。
所以對於 `if` 的 evaluation 是：

- eval `if`, use the if special form evaluation strategy
- eval `#t` literal, convert it to boolean value
- because the test-expr is true, we select then-expr to eval
- eval `(+ 1 2)`
   - eval `+` symbol，find the procedure bind to it.
   - eval `1` literal，convert it to number instance
   - eval `2` literal，convert it to number instance
   - apply procedure that bind to `+` to 1 and 2
   - return 3

但是如果是 `(if #f (+ 1 2) (1 2))`，就會噴 exception 了。

## special form - lambda

> (lambda (arg-id ...) body ...+)
> (lambda rest-id body ...+)
> (lambda (arg-id ...+ . rest-id) body ...+)

lambda 此 special 用於構造一個 procedure，一個 procedure 包含 arguments 和 procedure body。

對於 `(lambda (x) (+ x 1))`：
- eval `lambda`, construct a lambda procedure
- take arg list as procedure arguments
- take body expressions as procedure body
- return the constructed procedure

而當我們 apply 這個 procedure 為 `((lambda (x) (+ x 1)) 3)` 時：
- eval `(lambda (x) (+ x 1))`
   - eval `lambda`, construct a lambda procedure
   - take arg list as procedure arguments
   - take body expressions as procedure body
   - return the constructed procedure
- eval `3` literal, convert it to number instance
- apply procedure on 3
   - bind 3 to `x`, extend the binding to environment
   - eval `(+ x 1)`
      - eval `+` symbol，find the procedure bind to it
      - eval `x` symbol, lookup the value(3) bind to it
      - eval `1` literal, convert it to number instance
      - apply procedure that bind to `+` to 3(x) and 1
      - return 4

## special form - let

> (let ([id expr] ...) body ...+)
> (let proc-id ([arg-id init-expr] ...) body ...+)

let 則可以寫成一種 lambda + application 的 macro 變換。

比如 `(let [(x 3) (y 4)] (+ x y))` 會被轉成 `((lambda (x y) (+ x y)) 3 4)`
而像上面的例子 `((lambda (x) (+ x 1)) 3)` 則可以寫作 `(let [(x 3)] (+ x 1))`

由於 let 都會被轉成 lambda + application，
所以他的 evaluation strategy 就是先做 macro 轉換，再加上 lambda, application。
在此不再贅述。

# About continuation

前面廢話那麼多，終於要來講講 continuation 了。
我記得當初我在跟教授講我在看 continuation 時，他說可以去看看 Kent 的論文（

> Kent 就是寫 tspl 和 Chez Scheme compiler 的那位

continuation 在編譯器上應用似乎比較多，CPS 和 SSA 似乎有某種關係，
我覺得和 currying 也有，不過我還沒有看到那（
這邊大概只會對 `call/cc` 做探討，畢竟要讀懂一段 `call/cc` 的 scheme 我不知打了多少次結。

continuation 代表在 evaluation 過程中的一個點，你可以在那點代入新值，重啟計算。

在方才長長的 evaluation list 中，只要有 eval 的地方就可以捕捉他的 continuation，紀錄下該 eval 的位置，
下次直接利用捕捉到的 continuation, 從剛剛那個位置代成新的值，重新 eval 出另一個結果。

continuation 在 scheme 中是頭等公民 (first-class)，屬於一種資料型態，像 function 一樣可以被傳來傳去的。
`call/cc` 是捕捉 continuation 的一個 procedure，全名是 `call-with-current-continuation`。

現在我們看個 lambda 的例子：`(lambda (x) (* 2 x))`，我們感興趣的地方是那個 `x`，
我們希望之後計算可以從 x 帶入新值，再次進行計算。那就來捕捉他的 continuation 吧。

上述例子使用 lambda 只是為了說明，我們還是需要一個實際的 application 來做 evaluation。

```
(define x 4)
(* 2 (call/cc (lambda (k) x))) ;=> 8
```

可以看到 `call/cc` 需要一個單參數的 lambda 作為參數，其中那個 k 就是 continuation 了。
我們在上例沒有把 k 存起來，而且在第一次 evaluation 中，
我們照舊傳了 x 回去給 `(lambda (e) (* 2 e))` 這個 procedure。

現在試著將 continuation 帶出來。

```
(define kon #f)
(define x 4)
(* 2 (call/cc (lambda (k)
                  (set! kon k)
                  x ;=> value that first time eval returned
               ))) ;=> 8

kon ;=> #<system continuation>

(kon 8) ;=> 16, use 8 replace the (call/cc ...) segment in previous evaluation
```

可以觀察到，我們用 `set!` 將 x 的位置用 continuation 記錄下來，並帶入新值。
在使用 `call/cc` 時，就把感興趣的點用 `call/cc` 的 lambda 參數的 procedure body 包起來就好了，
而該點在第一次做 evaluation 時的傳回值，也是由 procedure body 這個 expression eval 出來的結果而定。
該點的值可以在其後重新用 continuation 以不同的值帶入。

那對於 `call/cc` 首次 evaluation 回傳的 value 能不能直接是那個 continuation 呢？當然可以。

```
(define x (call/cc (lambda (k) k)))
x ;=> #<system continuation>

(x 4)

x ;=> 4
```



陰陽謎題 侯世達

```scheme
(let* [(yin ((lambda (foo) (newline) foo)
             (call/cc (lambda (bar) bar))))
       (yang ((lambda (foo) (display "*") foo)
              (call/cc (lambda (bar) bar))))]
  (yin yang))
```
