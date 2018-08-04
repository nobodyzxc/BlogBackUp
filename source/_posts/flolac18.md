---
title: FLOLAC'18
date: 2018-07-27 23:38:45
categories: Memoir
mathjax: true
tags:
- flolac
- functional programming
- logic
- lambda
---

<center>
為期兩個禮拜的課程結束，我收穫到了什麼呢？
</center>

<!-- more -->
<br><br>

## 楔子

對 Functional 的追求，
我隻身一人到了台大上課，
然而心中的那份悸動，
究竟能不能被滿足呢？

在集訓前，因為專題和教授會面，
偶然得知了講師竟然是高中校友，
不過因為我高中不是電研社，
所以對於這位大我十屆的學長感到非常陌生。

看了他的部落格，
望著那豐富的經歷，
對自己研究的東西侃侃而談，
以及對於教學的心得，
友人們的回應等等，
是和自己截然不同的角色呢。

漸漸的知道自己周遭，
也是有人受到相同的東西吸引，
投入相關的領域，
開始覺得不是那麼的孤獨。

不過光是受到吸引是不夠的，
要付出才能夠積累。
希望我不再孤獨。

> 結果去那還是沒認識半個人 XD

接下來會記一下學到的東西吧。
課程有四部份，以下摘自教材，
為我最有印象的幾個部份。

## 函數式編程

> Functional Programming


### Induction

這門課主要不是在介紹 Haskell Fancy 的 Features，
而是以 Proof 和 Programming 做結合，想要證明一些性質。
像是 `take n xs ++ drop n xs == xs`。

介紹了一些 Haskell 基本的東西後，
玩過了 Wholemeal Programming 後，
一切便都從 Induction 開始。

就以證明 `take n xs ++ drop n xs == xs` 為例吧。

```haskell
take n [] ++ drop n [] == [] ,valid.

take n (x:xs) ++ drop n (x:xs)

=   {       by take's definition       }

(x : take (n - 1) xs) ++ drop (n - 1) xs

=   {       by ++'s property,
             [] ++ ys == ys,
       (x:xs) ++ ys == x : (xs ++ ys)  }

x : (take (n - 1) xs ++ drop (n - 1) xs)

=   {           by induction           }

x : xs, valid.
```

### Fold-Fusion

``` haskell
-- consider
square x = x * x

sumsq xs = sum (map square xs)
```

其中 sumsq 的複雜度是 O(2N)，
先做出一個 square 後的 list 再 sum 起來。

但我們應該可以將它化成 O(N) 吧？
一邊 sum 一邊 square。

例如改寫成
```
sumsq = foldr (\e acc -> square e + acc) 0
```

如此的轉換稱作 fold fusion。

**Theorem**
{% codeblock line_number:false%}
 Given f :: a → b → b,
       e :: b
       h :: b → c
 and   g :: a → c → c, we have
{% endcodeblock %}

> `h . foldr f e = foldr g (h e)`, if `h (f x y) = g x (h y)` for all x and y.

那這個 g function 該如何推導呢？
看起來最重要的就是這個 g function 了啊。

我們以 sumsq 做例子。
首先，我們要將 `h . foldr f e` 和 `sum . map square` 做匹配。

很直覺地 `h == sum` 而 `map square == foldr f e`
將 map 化為 foldr : `map f == foldr (mf f) where mf f = \e acc -> f e : acc`

```
map square
== foldr (mf square) []
== foldr (e acc -> square e: acc) []
```

所以 `h == sum`, `f == (e acc -> square e: acc)`, `e == []`

利用 `h (f x y) = g x (h y)`

```haskell
h (f x y)

= { match }

sum ((e acc -> square e : acc) x xs)

= { elimination lambda }

sum (square x : xs)

= { definition of sum }

square x + sum xs

= { let ssq x y = square x + y }

ssq x (sum xs)

= { match }

g x (h y)
```

所得 `g == ssq`, `h == sum`, `xs == []`

最後由 `h . foldr f e = foldr g (h e)` 得到

`sum . foldr (mf square) []) == foldr ssq (sum [])`

即為 `foldr ssq 0`，就是原先改寫的 `foldr (\e acc -> square e + acc) 0`

### Reduce Complixity by Tupling

``` haskell
-- consider
steep [] = True
steep (x:xs) = steep xs && x > sum xs
```

steep 用來判斷一 List 之元素差是否保持陡峭。
如果該元素大於其後所有元素之和回傳 True 反之 False。

考慮其複雜度，
呼叫 steep 有 n 次，每次 steep 中的 sum 又需要 n 的複雜度，
所以複雜度是 O(N^2)。

那有沒有辦法降低複雜度呢？
比如說每次呼叫 steep 時一邊計算 sum？
為了一次回傳兩個值，我們使用 tuple。

```haskell
steepsum xs = (steep xs, sum xs)
```

如此，`steep xs = fst $ steepsum xs`

現在，我們將 steepsum 變成 recursive function，
實現一邊算 steep 一邊算 sum。

```haskell
steepsum (x:xs)

= { definition of steepsum }

(steep (x:xs), sum (x:xs))

= { definition of steep and sum }

(steep xs && x > sum xs, x + sum xs)

= { extracting sub expressions }

(sp && x > sm, x + sm)
    where (sp, sm) = steepsum xs
```

至此，我們成功的將 O(N^2) 的 steep 改寫成 O(N) 的 steep。

```haskell
steep [] = True
steep (x:xs) = steep xs && x > sum xs

-- transform

steep xs = fst $ steepsum xs

steepsum [] = (True, 0)
steepsum xs = (sp && x > sm, x + sm)
   where (sp, sm) = steepsum xs
```

### Monad

這又是另一段故事了，有時間再說 XD
~~或者就跳過了，反正對於 Monad，我有預感我會自開一篇~~

## 邏輯

> Logic

### Instuitionistic Logic and Nature Induction

這門課主要講的是直覺邏輯 (Instuitionistic Logic)，
跟之前在學校學的古典邏輯不太一樣。

直覺邏輯系統沒有排中律 ( ⊢ q ∨ ¬q )，
但這不意謂著直覺邏輯比較弱，
一個邏輯系統的強弱倚賴於將命題歸類的能力，
從某種意義來說，
推不出排中律意謂著直覺邏輯更加嚴格。

在直覺邏輯的 rule 大部分和古典邏輯相同。
值得注意的是，直覺邏輯沒有 double negation 的 rule。

而 negation 的部份，應該是相同的

~I: φ → ⊥ // ¬φ
~I: [A ... F] // ~A

這裡學到的是寫成 tree 的樣子
而學校學的 NI 是寫成 block

然後 twitter 有[這個 bot](https://twitter.com/ipc_bot?lang=zh-tw) 可以玩。他可以將你輸入的命題作自動推導。


<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-lang="en"><p lang="sl" dir="ltr">.<a href="https://twitter.com/nobodyzxc1?ref_src=twsrc%5Etfw">@nobodyzxc1</a> Provable. (upn07) <a href="https://t.co/swaCztVhcA">pic.twitter.com/swaCztVhcA</a></p>&mdash; IPC bot (@ipc_bot) <a href="https://twitter.com/ipc_bot/status/1023874979740282881?ref_src=twsrc%5Etfw">July 30, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

之前在學校學的寫成
```
(A ∧ B) ∧ C → A ∧ (B ∧ C)

1.1 (A ∧ B) ∧ C                 // Assumeption
1.2     C                       // ∧E by 1.1
1.3     A ∧ B                   // ∧E by 1.1
1.4     A                       // ∧E by 1.3
1.5     B                       // ∧E by 1.3
1.6     (B ∧ C)                 // ∧I by 1.2 and 1.5
1.7     A ∧ (B ∧ C)             // ∧I by 1.4 and 1.6
2   (A ∧ B) ∧ C → A ∧ (B ∧ C) // →I by 1.1 and 1.7
```

### Others

之後還有提到 semantic of propositional logic 及 first-order logic，
一樣有些 introducing 和 elimination 的 rules...
就不細講了，可以透過這些 rule 可以做 structural proof 和 nature induction 的 proof。

最後就是提到 Curry-Howard correspondence，
將 first-order logic 和 typed lambda calculas 對應起來。

這門課還有演示了 Agda ，感覺很好玩，
用了 [aquamacs](http://aquamacs.org/) 搭配 $\LaTeX$ 的語法，打出了 [FLOLAC18.agda](https://gist.github.com/josh-hs-ko/3a0ea16a225ca4efbd01428c06b8fdba) 啊～

原來這就是利用程式輔助證明啊。~~有時間再入坑~~

然後講師還出了一題用 foldr 定義 foldl，
直覺就是 reverse 一下啊，
結果隔一節課後補充說只能用 lambda wwwww
當下並沒有很認真想，但直覺就是像 CPS 的東東吧。
過了幾天，它就在腦中跑出來了...

```haskell
foldl f e xs = foldr (\e acc -> (\b -> acc $ f b e)) id xs $ e
```

## Lambda 演算與型別

> λ Calculas and Types


先是用 Formal Language 定義了由 0 | succ | add 組成的數。
然後介紹了 SI。

### Syntax of Lambda Calculas

第二節課才進到 lambda calculas，
lambda form 很簡單，只有 variable, application, abstraction 三條規則。

然後就用 lambda 定義了 tuple, fst, snd, nature numbers, boolean...

α conversion, β conversion 啦，
大概就是我之前在網路上看過的那些了。

然後提到的 Free and Bound Variables，
之前在學校 LICS 課討論的 first-order logic 蠻像的。
(那時候 LICS 討論 admissiable 討論蠻久的...)

### Properties of Lambda Calculas

這邊提到的 Evaluation Strategies，
剛好之前也有看過，但沒有和 Haskell 產生連結，

- Call-by-value strategie
   rightmost-outermost but not inside any λ-abstraction
   > ex: Scheme

- Call-by-name strategie
   leftmost-outermost but not inside any λ-abstraction
   > ex: Haskell

之前寫過 mini Scheme 的 eval/apply 終於知道和 Haskell 差在哪裡了。
這也是讓 Haskell Lazy 的原因啊。(Lazy Evaluation 為**一種** call-by-name 的方法)

之前看 call-by-name 只是覺得會有用這麼麻煩的方法求值的實現嗎？
用 Call-by-value 不是很好嗎... 原來 Haskell 就是。

算是把以前的惑又解更開了。

有時間把 [Wiki](https://en.wikipedia.org/wiki/Evaluation_strategy) 看看吧。

### Simple typed Lambda Calculas and System F

算是會做 lambda calculas 的 type derivation...

但是老實說，並沒有把 System F 搞得很清楚 ><


## 並行計算模型與訊程型別

> Models of concurrent computation and session types

重點就在 π Calculas，一堆 dual types 的 derivation...

dual types 確保了通訊雙方 type 相對一致，確立了安全性。

π Calculas 有蠻多版本的，然後由簡單到複雜...

感覺比 λ Calculas 複雜啊～～看得眼睛花，
不過這門相較於其他，算是比較簡單的了。

講師使用 [Scribble](http://www.scribble.org/) 寫了簡單的 protocal 作為示範。
其中 IDE 的 type checking 讓你在寫的時候就知道自己傳收兩邊的 type 有沒有寫錯。

## Talk (Racket)

以前學 Scheme 用的就是 Racket，
沒有寫很多程式，但知道這語言潛力很大，
但就是沒有一個好好的介紹，讓我入門。

Talk 介紹了 Racket，才知道他的強大。

之前看知乎上，談論到 Racket 的 Macro 很棒，
但我都知其然，而不知其所以然。

今天總算是見識到啦><

> #lang power

以後 slide 也靠 Slideshow 轉 Markdown 啦～
~~之前還不知道 Racket 有 Slideshow，還用 landslide 轉 Markdown (一個 Python 寫的工具)~~

<object width="100%" height="400" data="/mycode/flolac-2018-racket-sharing.pdf"></object>

## 後記

flolac 結束幾天後，
在 telegram 上的一個前端群組，
偶然發現一位網友在說 type，
其中描述的像是 lambda calculas (haskell) 中的 type，
然後又提到 curry howard isomorphism，

...

這不就是這次上的東西嗎？

一問之下才發現，他是那坐在我後面幾排，
那位旁聽的高中生啊 XD

算是結下了緣吧 :)
