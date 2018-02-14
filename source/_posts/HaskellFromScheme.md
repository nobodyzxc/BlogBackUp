---
title: Scheme 初學者眼中的 Haskell
date: 2018-02-14 22:44:50
categories: Note
---
<center>

嘛，情人節，和 Haskell 約個會吧！
原篇 Haskell Note 已移至草稿區，
因為學完 Scheme 後回來看 Haskell，
發現有不少地方是已經會的。
而我覺得記些基本的東西意義不大，
所以改成以一個接觸過 Scheme 的 FP 初學者角度，
重新來看待 Haskell 這個語言。
</center>

<!-- more -->

## Syntax

### Pattern matching

我記得王垠的 40 行代碼好像有 require pmatch,
所以 scheme 應該是有以 library 實現 pattern matching 的。

而 Haskell 則是內建此種語言特性，大概可以有三種地方可以用到。

1. 函數定義，可以少去一些 if else
   ```haskell
   -- 注意 match 的順序性
   fib 0 = 0
   fib 1 = 1
   fib x = fib (x - 1) + fib (x - 2)
   ```
   ```scheme
      (define (fib x) ; 懶得寫 = 所以用 case
         (case x      ; 不過 racket 其實是用 equal?
            [(0) 0]   ; R6RS, R5RS 是用 eqv?
            [(1) 1]
            [else (+ (fib (- x 1))
                     (fib (- x 2)))]))
   ```

2. 拆 tuple, list
```haskell
   -- as pattern
   all@a:b = [1, 2, 3]
   -- all == [1, 2, 3]
   -- a == 1
   -- b == [2, 3]

   (a, b, c) = (1, 2, 3)
   -- a == 1, b == 2, c == 3

   -- 結合 1. 定義 sum'
   sum [] = 0
   sum' (x:xs) = x + (sum' xs)
```

3. List comprehension 中
```haskell
   [x + y | (x, y) <-zip [1, 2, 3] [4, 5, 6]]
   --       ^ match
```

### Guard
   感覺之前一直不能接受這個 syntax, 現在看作 cond 就好了。
   書中的例子藉由 Guard 定義一個函數。
```haskell
   bmiTell bmi -- *attension! no = here
       | bmi <= 18.5 = "You're underweight, you emo, you!"
       | bmi <= 25.0 = "You're supposedly normal. Pffft, I bet you're ugly!"
       | bmi <= 30.0 = "You're fat! Lose some weight, fatty!"
       | otherwise   = "You're a whale, congratulations!"
```

   其實就是

```scheme
   (define (bmiTell bmi)
      (cond
         ((<= bmi 18.5) "You're underweight, you emo, you!")
         ((<= bmi 25.0) "You're supposedly normal. Pffft, I bet you're ugly!")
         ((<= bmi 30.0) "You're fat! Lose some weight, fatty!")
         (else          "You're a whale, congratulations!")))
```

### Where

   用於函數定義中，於定義下方加入 where syntax 做簡易的 binding。

```haskell
 bmiTell weight height -- *attension! no = here
       | bmi <= 18.5 = "You're underweight, you emo, you!"
       | bmi <= 25.0 = "You're supposedly normal. Pffft, I bet you're ugly!"
       | bmi <= 30.0 = "You're fat! Lose some weight, fatty!"
       | otherwise   = "You're a whale, congratulations!"
         where bim = weight height = weight / height ^ 2
         -- where 裡面可作 pattern matching 亦可定義函數
```

   嘛，就是 scheme 裡的 nested define 嘛。

```scheme
   (define (bmiTell weight height)
      (define bim (/ weight (* height height)))
      (cond
         ((<= bmi 18.5) "You're underweight, you emo, you!")
         ((<= bmi 25.0) "You're supposedly normal. Pffft, I bet you're ugly!")
         ((<= bmi 30.0) "You're fat! Lose some weight, fatty!")
         (else          "You're a whale, congratulations!")))
```

### Let

   當然也有 let expression，bindings 和 exprs 用 in 關鍵字隔開
   bindings 中可以用 pattern matching，也可以用 ; 隔開每個 binding

   list comprehension 中也可以用 let bind 一些值，注意有效範圍。

```haskell
   [nv | (x, y) <- lst, let nv = x + y, nv > 10]
--  ^^   x-----------x  ^^^^^^^^^^^^^^  ^^^^^^^
```

### Case

   pattern matching 本質上是 case exprs 的語法糖。
   而在我看來 pattern matching 在 scheme 中也就是 cond 的語法糖 (null? 等函數去判斷）
   所以在 case exprs 可以解決的基本上 Guard 也可以解決，而回歸原始，用 if else 解決。
   重點是記得適用場景，Guard 用在 Bool，case 用在 pattern matching。
   之前這邊一直沒有摸清楚。

```haskell
   case expression of pattern -> result
                      pattern -> result
                      pattern -> result
```

### HOF

   與 scheme 最大的不同就是 Haskell 會自己做 currying。
   善用 currying 特性就可以很自然的做出 partially applied function。
   如此就不用再寫 lambda 去餵 HOF 啦～

   還有就是 map 的力量，Haskell 的 map 是 map :: (a -> b) -> [a] -> [b]，
   和 scheme 的 map 不太一樣，scheme 因為是動態語言所以 map 吃的 function 彈性比較大。
   如 `(map + '(1 2 3) '(1 2 3))` 後面可以接幾個 list 端看前面 function （加號的話可以無限啦～）。
   而 Haskell 要用 + 號則是用 zipWith，`zipWith (+) [1, 2, 3] [1, 2, 3]`。
   Haskell map 和 zipWith 也就只是差在 unary 和 binary，依舊不能和 scheme map 比。
   或許有其他方法吧，這就要研究一下 Haskell 的 var args 用法了。

   一些 haskell hof 可以玩玩

```
   map, filter,
   foldl, foldr, foldl1, foldr1,
   scahnl, scanr, scanl1, scanr1
```

> 注意 foldl 系列的第一個參數的型態是 (b -> a -> b)
> 所以在寫 lambda 的時候是 (\ e acc -> expr)
> 而 foldr 系列則是 (a -> b -> b)
> 寫 lambda 的時候則是 (\ acc e -> expr)

### Lambda

   lambda 寫法 `\ bindings -> exprs`

### $ 的使用

   $ 號使用，一般下一個元素都會當作參數向左結合，
   但是前面有 $ 號的話，就可以不用被當成參數，
   直接當成 function apply 到右邊（後面）的參數上，
   直到完成，再餵回前面去。

   還有可以將 data 當 func 特性，如 `map ($ 3) [(4+),(10*),(^2),sqrt] `

### Function composition

   嘛，就是 f(g(x)) 可以用 haskell 寫成 f . g。就是這樣而已！
   注意的是 apply to arguments 的部份搭配個 $ , 也就是 f . g $ arg

## Module

> transpose 函數可以反轉一組 List 的 List。

光看中文還蠻容易誤解的，但看了他的例子及看了英文後，這不就轉置嗎？

馬上想到 python 是用 scheme, python 是用 zip (map) 達成，
但考慮到 haskell 的靜態特性，所以把 var arg 裝到一個 list 成為一個新函數。

## Self suspicion

* tuple likes struct, while list likes array ?
* 試想 zip implement, 是 zip (x:xs) (y:ys) = (x, y) : zip xs ys
  而不是 list comprehension [... |  x<-xs, y<-ys, ...],
  這兩種使用 list element 的方式差別是什麼，
  後者如何以 recursion 實現。
  並考慮一下迴圈是否有類似的狀況。
* 那就是右摺疊可以處理無限長度的資料結構，而左摺疊不可以。將無限 List 從中斷開執行左摺疊是可以的，不過若是向右，就永遠到不了頭了。
  （覺得怪怪的，這敘述，搭配一下實例思考一下）

```haskell
head' :: [a] -> a
head' = foldr1 (\x _ -> x)
last' :: [a] -> a
last' = foldl1 (\_ x -> x)
```
  -> 好像是惰性求值的關係，可以從無限開始跑可是變數要用 anonymous 表示無限那端。
* 自定義的 `:-:` 沒有定義，用起來直接是串起來的效果？!
