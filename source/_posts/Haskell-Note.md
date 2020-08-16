---
title: Haskell Note （Basic Syntax to Type）
date: 2017-01-31 22:44:50
categories: Note
tags:
- haskell
- lambda
- fp
---
<center>
A world without loop , but recursion。<br>
學校 PL 課程，及 <a href="https://learnyoua.haskell.sg/content/zh-tw/">Haskell 趣學指南</a> 的一些心得筆記。<br>
<s>更新：戰場轉換到 scheme，scheme 新坑開完再回來。</s><br>
更更新：我回乃了。
</center>


<!-- more -->


<br><br>
## Some hints

* 不像 PP , OOP 告訴電腦要做什麼，FP 的思考方式是描述問題。
* function call 有最高優先順序。
* if 在 haskell 裡是 exp 不是 statment
* function name 字首必須小寫 (Type 為大寫）。
* 認清 `++` 和 `:` ，適時使用`:`，在**前端**插入元素。
* List 的比較依照字典序。

## Function list
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
|[ valOfFunc </code>&#124;</code> var\* <- [t] `, boolean(Guard)*` ]<br> `_` = anonymous var| list comprehension  |
|   `fst` (t , t)    | the first elm in tuple(pair) |
|   `snd` (t , t)    | the second elm in tuple(pair) |
| `zip` [t] [t]   | make a list of tuple(pair) |
|  (\var -> valOfFunc) | lambda exp |
| `zipWith` (t-\>t'-\>t'') [t] [t'] | zip two list by a func |
| `flip` (t-\>t''-\>t''') | flip the param order of a func call |
| `map` (t-\>t') [t] | like for\_each , list comprehension |
| `filter` (t-\>Bool) [t] | like Guard in list comprehension |
| `takeWhile` t-\>Bool [t] | take elm to return a new list while ... |
| `foldl` (t-\>t'-\>t) t [t'] | do ... to acc while elm \= [] |
| `foldr` (t-\>t'-\>t) t' [t] | almost simialr to foldl |
| `foldl1` (t-\>t-\>t) [t']  | take head of list as init |
| `foldr1` (t-\>t-\>t) [t']  | almost simialr to foldl1 |
| `scanl` (t-\>t'-\>t) t [t'] | acc operated val to list from left |
| `scanr` (t-\>t'-\>t) t' [t] | acc operated val to list from right |
| `scanl1` (t-\>t-\>t) [t] | omit |
| `scanr1` (t-\>t-\>t) [t] | omit |



## Data

#### type
|     Type    |     Note     |
|:-----------:|:------------:|
|     Bool    ||
|     Int     ||
|   Integer   |Big Num , operations are not efficient as Int|
|    Float    ||
|    Double   ||
|     Char    ||
|     Maybe   | Nothing or single elm |

#### structure

|     Structure    |     Note     |
|:-----------:|:------------:|
|     List    | [] |
|     Tuple   | () |

## Typeclass

不禁讓我想到統計的三個 data Type , interval , odinal , categorical。

`=>`符號左邊是型態約束（表示此 Type Var 屬於哪個 Typeclass)，
右邊是引數和回傳值。用於描述函式原型 (?)。

例如將一般數字型態轉為更通用的 Integral 的函式 `fromIntegral`
其定義為 `fromIntegral :: (Num b, Integral a) => a -> b`

| Typeclass |   Feature   | Example type  | support func |  Note  |
|:---------:|:-----------:|:-------------:|:------------:|:------:|
|     Eq    | 可判斷相等  | Int ...       |      ==      ||
|     Ord   |   可排序    | Int ...       | > , < , >= , <= , compare | 有 Eq 特性 |
|    Show   |  可轉字串   | Int ...       |     show     ||
|    Read   | 可由字串轉  | Int ...       |     read     |注意聲明，否則型態推導可能沒辦法 work|
|    Enum   | 順序可枚舉  | Int ...       | .. , succ , pred ||
|    Bounded|  有上下界   | Int ...       | minBound , maxBound | 若 Tuple 內皆為 Bounded ， <br>則此 Tuple 亦有 Bounded 特性。|
|     Num   |  數字類型   | Int ...       | fromIntegral ||
|  Integral |  整數類型   | Integer       | fromIntegral ||
|  Floating | 浮點數類型  | Float         |              |||

## Pattern matching
* 順序很重要

1. 函式定義內對參數的 pattern matching
   一開始提到的是可以在 .hs 中像 select case 全部啪出來，不用 if else，在 ghci [需要用 guard](http://stackoverflow.com/questions/15733266/pattern-matching-in-ghci)。
   其實是 case of 的語法糖。
2. 函式引數和參數的 pattern matching
   其實就是參數可以將引數拆開（我用詞好[精準](http://no8dyzxc.pixnet.net/blog/post/290731567) \>///<)，好用。
3. List Comprehension 的 pattern matching
   指南的例子 : `[a + b | (a , b) <- xs]`

* 以上前兩點是我亂叫的，意思知道就好。（奪門而出

  還有一種 at pattern , xs@(a:as)，表示把 xs 拆成 (a:as)。

## Guard & Key words

```haskell
func param
    | [bool exp] = val
    | [bool exp] = val
    --let keyword(can be anywhere)
    | [bool exp] = let [name binding;...;...] in [exp]
    ...
    | otherwise = val
    --where keyword(must be the structure end)
    where [name binding]
          [function def balala]

--let keyword in list comprehension
[nameCanSee | nameCannotSee , let [name binding]]
[nameCannotSee | nameCannotSee , let [name binding] in [bool exp]]

func param = case [exp] of [pattern] -> val
                          [pattern] -> val
                          [pattern] -> val

```

## High Order Function

* Curried functions = 不完全的 function
  ex:
```haskell
ghci > tkMaxCmpWithTen = max 10
ghci > tkMaxCmpWithTen 9
10
ghci > addThree = (+3)
ghci > addThree 10
13
```
* High Order function = take function as parameter (**Or return a function**)
```haskell
ghci >  applyTwice func x = func (func x)
ghci > applyTwice addThree 10
16
ghci > applyTwice (+3) 10
16

```
* `$` and `.`
```haskell
$ comb to right

f(g(x)) = f . g $ x

sum . map (*3) $ [1..9]
(int)sum(list) . (list)map (*3)(list) $ (list)[1..9]
```

## Module
引入函式庫。
```haskell
--in .hs
import Data.List
import Data.List hiding (nub)  --ignore nub in module
import Data.List (nub，sort)   --only import num 'n sort
import qualified Data.Map      --need use 'Data.Map.func' to call func
import qualified Data.Map as M --can alias 'Data.Map' to 'M'
--in ghci can also use
:m Data.List
```
## Our own data type
> 永遠不要在 data 聲明中加型別約束

```haskell
-- Object method
-- data Typename = valueConstructor param ...
data Circle = Circle Float Float Float

-- Enum method
-- data Typename = v0 | v1 | v2 ...
data Day = Mon | Tue | Wed | Thu | Fri | Sat | Sun

data Point = Point Float Float
data Shape = Circle Point Float | Rectangle Point Point

modlue Shape
( Point (..) -- export all value constructor
, Shape (Circle , Rectangle) -- export Circle and Rectangle
, surface -- function name
, baseCircle -- auxilliary function , baseCircle :: Float -> Float -> Shape
) where
-- 可以選擇不導出 value constructor，這樣強迫使用者使用 auxilliary function，
-- 避免使用者直接對 value constructor 做 pattern matching，一個封裝的概念。


-- record syntax avoid writting boring "get functions"
data Person = Person { firstName :: String
                     , lastName :: String
                     , age :: Int
                     , height :: Float
                     , phoneNumber :: String
                     , secCrush :: String
                     } deriving (Show)

ghci > secCrush me
"\x4a\x79\x75\x6e\x2d\x59\x69\x20\x4a\x68\x61\x6e\x67"

-- deriving
data Day = Mon | Tues | Wed | Thur | Fri deriving (Eq , Ord , Bounded)

-- type key word to alias type
type String = [char]

type IntMap v = Map Int v
-- same as
type IntMap = Map Int

-- operator
-- infix[lr] seq symbol
infixr 5 ++

-- an example of binary search tree
data Tree a = EmptyTree | Node a (Tree a) (Tree a) deriving (Show, Read, Eq)

singleton x = Node x EmptyTree EmptyTree

treeInsert x EmptyTree = singleton x
treeInsert x (Node a left right)
      | x == a = Node x left right
      | x < a  = Node a (treeInsert x left) right
      | x > a  = Node a left (treeInsert x right)

treeElem x EmptyTree = False
treeElem x (Node a left right)
    | x == a = True
    | x < a  = treeElem x left
    | x > a  = treeElem x right

mkTree ls = foldr treeInsert EmptyTree ls
```
typeclass
```haskell
-- 先前有介紹過 TypeClass，在這裡我們為自己的資料型態加上 TypeClass
data Day = Monday | Tuesday | Wednesday | Thursday | Friday | Saturday | Sunday
           deriving (Eq, Ord, Show, Read, Bounded, Enum)
-- Eq 可比 , Ord 排序由左至右分別是小到大 , Show & Read 提供 IO , Bounded 提供上下界 , Enum 順序枚舉
-- 因為 Enum 的特性，可以使用
[minBound .. maxBound] :: [Day]
```

type key word and the type constructor
```haskell
-- type 提供了一個對類別不錯的 alias 方法
type String = [Char] -- 最常見的
-- 我們寫 Function 在宣告可能會用到

-- type constructor
type AssocList k v = [(k,v)]
-- 用法嘛，宣告用（應該不只這樣，再想想）
[(1,2),(4,5),(7,9)] :: AssocList Int Int
```


## Questions?

* tuple likes struct , while list likes array ?
* 那就是右摺疊可以處理無限長度的資料結構，而左摺疊不可以。
  （因為 Lazy Eval 所以 foldr 可以跑出結果，foldl 會無窮）
```haskell
head' :: [a] -> a
head' = foldr1 (\x _ -> x)
last' :: [a] -> a
last' = foldl1 (\_ x -> x)
```
