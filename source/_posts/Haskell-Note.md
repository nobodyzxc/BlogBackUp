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
* 函數名字首必須小寫
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
| `if` boolean `then` val <br>`else` val| boolean ? val : val |
|     `++`      |   connect list  |
|     `:`       | ins elm to list |
|     `!!`      |elm in list at idx|
|   `head` []   |first elm in list|
|   `tail` []   |a list contains all elm in origin list except head|
|   `last` []   |last elm in list |
|   `init` []   |a list contains all elm in origin list except last|
|   `length` [] | the len of list |
|   `null` []   | check the list is null , better then [] == null  |
| `reverse` []  | reverse a list  |
| `take` num [] |a list contains the first `num` elm in origin list|
| `drop` num [] |a list which is <br>the origin list removes first `num` elms|
| `maximum` []  | the max elm in a list |
| `minimum` []  | the min elm in a list |
|   `sum`  []   | the sum of all elm in a list |
| `product` []  | the product of all elm in a list |
|   `elem` []   | check if the elm is in a list |
|     `..`      | range , [elm .. elm] , [elm , elm .. elm]<br>elm avoid using float |
| (`cycle` [])  | a list of cycling orign list |
|(`repeat`  elm)| a inf list made by a elm |
|`replicate` num elm| same as `take num (repeat elm)` |
| lambda exp  |[ func </code>&#124;</code> var\* <- [] `, boolean(Guard)*` ]<br> `_` = anonymous var|
|   `fst` ()    | the first elm in tuple(pair) |
|   `snd` ()    | the second elm in tuple(pair) |
| `zip` [] []   | make a list of tuple(pair) |

## self suspicion

* tuple likes struct , while list likes array ?

