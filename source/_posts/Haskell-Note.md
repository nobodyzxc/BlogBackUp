---
title: Trav.2 - Haskell Note
date: 2017-01-31 22:44:50
categories: Trav.
---
<center>
學校 PL 課程，及 [Haskell 趣學指南](https://learnyoua.haskell.sg/content/zh-tw/)的一些心得筆記。
</center>

<!-- more -->

## some hint

* 不像 imperative languages 告訴電腦要做什麼，FP 的思考方式是描述問題。
* function call 有最高優先順序。
* if 在 haskell 裡是 exp 不是 statment
* function name 字首必須小寫 (Type 為大寫)。
* 認清 `++` 和 `:` ，適時使用`:`，在**前端**插入元素。
* List 的比較依照字典序。

## function list
|  function   |       Note      |
|:-----------:|:---------------:|
|`+` , `-` , `*` , `/`||
|   `mod` a b   ||
|`&&` , </code>&#124;&#124;</code> , `not`||
|   `==` , `/=`   ||
|`>`, `>=` , `<` ,`<=`||
|   `max` a b   | (a > b ? a : b) |
|   `min` a b   | (a < b ? a : b) |
|   `succ` a    |   return ++a;   |
| a <code>\`</code>func<code>\`</code> b|   func  a b     |
| `(`infixFunc`)` a b |a infixFunc b|
| `if` boolean `then` val <br>`else` val| boolean ? val : val |
|     `++`      |   connect list  |
|     `:`       | ins elm to list |
|     `!!`      |elm in list at idx|
|   `head` [t]   |first elm in list|
|   `tail` [t]   |a list contains all elm in origin list except head|
|   `last` [t]   |last elm in list |
|   `init` [t]   |a list contains all elm in origin list except last|
|   `length` [t] | the len of list |
|   `null` [t]   | check the list is null , better then [t] == null  |
| `reverse` [t]  | reverse a list  |
| `take` num [t] |a list contains the first `num` elm in origin list|
| `drop` num [t] |a list which is <br>the origin list removes first `num` elms|
| `maximum` [t]  | the max elm in a list |
| `minimum` [t]  | the min elm in a list |
|   `sum`  [t]   | the sum of all elm in a list |
| `product` [t]  | the product of all elm in a list |
|   `elem` [t]   | check if the elm is in a list |
|     `..`      | range , [elm .. elm] , [elm , elm .. elm]<br>elm avoid using float |
| (`cycle` [t])  | a list of cycling orign list |
|(`repeat`  elm)| a inf list made by a elm |
|`replicate` num elm| same as `take num (repeat elm)` |
| lambda exp  |[ func </code>&#124;</code> var\* <- [t] `, boolean(Guard)*` ]<br> `_` = anonymous var|
|   `fst` (t , t)    | the first elm in tuple(pair) |
|   `snd` (t , t)    | the second elm in tuple(pair) |
| `zip` [t] [t]   | make a list of tuple(pair) |

## data Type
|     Type    |     Note     |
|:-----------:|:------------:|
|     Bool    ||
|     Int     ||
|   Integer   |Big Num , operations are not efficient as Int|
|    Float    ||
|    Double   ||
|     Char    ||
|      []     | List |
|      ()     | Tuple |
## Typeclass

不禁讓我想到統計的三個 data Type , interval , odinal , categorical。

`=>`符號左邊是型態約束(表示此 Type Var 屬於哪個 Typeclass)，
右邊是引數和回傳值。用於描述函式原型(?)。

例如將一般數字型態轉為更通用的 Integral 的函式 `fromIntegral`
其定義為 `fromIntegral :: (Num b, Integral a) => a -> b`

| Typeclass |   Feature   | Example type  | support func |  Note  |
|:---------:|:-----------:|:-------------:|:------------:|:------:|
|     Eq    | 可判斷相等  | Int ...       |      ==      ||
|     Ord   |   可排序    | Int ...       | > , < , >= , <= , compare | 有 Eq 特性 |
|    Show   |  可轉字串   | Int ...       |     show     ||
|    Read   | 可由字串轉  | Int ...       |     read     |注意稱明，否則型態推導可能沒辦法 work|
|    Enum   | 順序可枚舉  | Int ...       | .. , succ , pred ||
|    Bounded|  有上下界   | Int ...       | minBound , maxBound | 若 Tuple 內皆為 Bounded ， <br>則此 Tuple 亦有 Bounded 特性。|
|     Num   |  數字類型   | Int ...       | fromIntegral ||
|  Integral |  整數類型   | Integer       | fromIntegral ||
|  Floating | 浮點樹類型  | Float         |||
|

## pattern matching
* 順序很重要

1. 函式內對參數的 pattern matching
   一開始提到的是可以在 .hs 中像 select case 全部啪出來，不用 if else，在 ghci [需要用 guard](http://stackoverflow.com/questions/15733266/pattern-matching-in-ghci)。
2. 函式引數和參數的 pattern matching
   其實就是參數可以將引數拆開(我用詞好[精準](http://no8dyzxc.pixnet.net/blog/post/290731567) \>///<)，好用。
3. List Comprehension 的 pattern matching
   指南的例子 : `[a + b | (a , b) <- xs]`

* 以上前兩點是我亂叫的(奪門而出

## self suspicion

* tuple likes struct , while list likes array ?
* 試想 zip implement , 是 zip (x:xs) (y:ys) = (x , y) : zip xs ys
  而不是 list comprehension [... |  x<-xs , y<-ys , ...] ,
  這兩種使用 list element 的方式差別是什麼 ,
  後者如何以 recursion 實現。
  並考慮一下迴圈是否有類似的狀況。
