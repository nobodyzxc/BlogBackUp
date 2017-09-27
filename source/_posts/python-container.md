---
title: About Python's container
date: 2017-05-29 21:10:34
categories: Note
---

<center>
Python 感覺入門很久了，但對於容器的使用一直感到很生疏，遂筆記一篇，期能熟之。
</center>

<!-- more -->
## Question

我對於 Python 的一些存在一直不能感到理解，就是這些對容器的 function 了。
為啥不要做的像 Ruby 一樣把它做成物件下的 function 呢？
等到理解的時候或許就能向 The Zen of Python 靠近一點了吧。
果然正式提出疑問，才有動力去找[解答](http://effbot.org/pyfaq/why-does-python-use-methods-for-some-functionality-e-g-list-index-but-functions-for-other-e-g-len-list.htm)。
> (a) For some operations, prefix notation just reads better than postfix — prefix (and infix!) operations have a long tradition in mathematics which likes notations where the visuals help the mathematician thinking about a problem. Compare the easy with which we rewrite a formula like x\*(a+b) into x\*a + x\*b to the clumsiness of doing the same thing using a raw OO notation.

```
恩... 習慣問題嗎？
嗯？len("asd" + "efg") 和 ("asd" + "efg").length() 嗎？
確實，前面的比較好看些。
```
> (b) When I read code that says len(x) I know that it is asking for the length of something. This tells me two things: the result is an integer, and the argument is some kind of container. To the contrary, when I read x.len(), I have to already know that x is some kind of container implementing an interface or inheriting from a class that has a standard len(). Witness the confusion we occasionally have when a class that is not implementing a mapping has a get() or keys() method, or something that isn’t a file has a write() method.

```
好像是在說，用 len(container) 就比較不用去思考 container 底下有沒有 len() 這個實作。
確實，我常常被 javascript 的 string.length 和 C++ 的 string.length() 混淆。
```

## Functionality functions for containers

1. repr(container) -> 轉成可以讓被 eval 的字串符（哼哼，人家 Scheme 才沒這麼複雜呢）。
2. len(container) -> 取得容器長度
3. del(container[idx]) -> 移除容器的第幾個節點
4. reversed(container) -> 回傳一個 reversed 的 iterator （注意，不是原本的容器類型，所以要再轉。)

* 常用的就這些，其他有遇到再加吧。
* 一些 infix 的就不說了。以上是 prefix。

## Methods of containers
```
function( param ) intro
        ([param]) -> 參數可有可無
        (  ...  ) -> 不定長度
```
### help(tuple)

tuple 的特性就是 read-only，他的元素一旦確立下來就不能用 `=` 改。
替代方法可以轉成 list 再轉回來，不然就是直接再造一個新的 tuple。

tuple(iterable) 建構子可以輕易的將其他容器 (iterable) 轉為 tuple 容器。（沒有參數等同 new 一個空的）

1. `T.count(elm)`
> 回傳元素個數出現次數。
2. `T.index(elm)`
> 回傳元素出現的第一次出現的 index。

### help(list)

list(iterable) 建構子可以輕易的將其他容器 (iterable) 轉為 list 容器。（沒有參數等同 new 一個空的）

1. `L.append(elm)`
> 將元素加到 list 的尾端。
2. `L.clear()`
> 清空容器。
3. `L.copy()`
> new 出一個一模一樣的 copy。(lb = la.copy() 和 lb = la 是不一樣的！)
4. `L.count(elm)`
> 回傳元素個數出現次數。
5. `L.extend(iterable)`
> 把其他容器 (iterable) append(Scheme 向） 在後面。
6. `L.index(elm)`
> 回傳元素出現的第一次出現的 index。
7. `L.insert(idx , elm)`
> 在 index 之*前*插入元素。
8. `L.pop([idx])`
> 移除 idx 位置的元素，並回傳該元素。（沒有參數等同對最後一個元素進行操作）
9. `L.remove(elm)`
> 移除第一個出現的元素。
10. `L.reverse()`
> 對 list 進行倒轉（不回傳值）。
11. `L.sort([key = None , reverse=False])`
> 排序。

### help(set)

set(iterable) 建構子可以輕易的將其他容器 (iterable) 轉為 set 容器。（沒有參數等同 new 一個空的）

1. `S.add(elm)`
> 增加元素到 Set 中。
2. `S.clear()`
> 清空容器。
3. `S.copy()`
> new 出一個一模一樣的 copy。(sb = sa.copy() 和 sb = sa 是不一樣的！)
4. `S.difference(set ...)`
> 回傳差集。
5. `S.difference_update(set ...)`
> S = S.difference(Set ...)。應該可以算是語法糖的東西。
6. `S.discard(elm)`
> 移除一個元素，如果它存在於 set 中，不存在也不會噴錯。
7. `S.intersection(set ...)`
> 回傳交集。
8. `S.intersection_update(set ...)`
> S = S.intersection()。
9. `S.isdijoint(set)`
> 不相交回傳 True。
10. `S.issubset(set)`
> 如果 S 是參數的子集回傳 True。
11. `S.issuperset(set)`
> 如果 S 是參數的超集回傳 True。
12. `S.pop()`
> 移除任一元素並回傳（我試過了，好像也不是那麼隨意）（如果 empty 發生 KeyError）
13. `S.remove(elm)`
> 移除一元素（必須存在於 set 否則發生 KeyError)
14. `S.symmetric_difference(set)`
> 回傳集合為刪除交集的聯集部分。
15. `S.symmetric_difference_update(set)`
> S.symmetric_difference 的語法糖。
16. `S.union(set ...)`
> 聯集。
17. `S.update(set ...)`
> 感覺就是 S.union_update()，不過這裡直接叫 update 了。

### help(dict)

dict(iterable) 建構子可以輕易的將其他容器 (iterable) 轉為 dict 容器。（沒有參數等同 new 一個空的）

1. `D.clear()`
> 清空容器。
2. `D.copy()`
> new 出一個一模一樣的 copy。(db = da.copy() 和 db = da 是不一樣的！)
3. `D.fromkeys(iterable [, value = None])`
> 可以拿其他容器當 key 和指定預設的 value。
4. `D.get(key [, d = None])`
> 用法和 D[key] 很像但 D[key] 如果不存在會噴 KeyError， get 則噴 d。
5. `D.items()`
> 回傳一個物件提供 view of items（然後可以幹嘛？)
6. `D.keys()`
> 回傳一個物件提供 view of keys（然後可以幹嘛？)
7. `D.pop(key [, d])`
> 移除 key 和其 item， d 是 key 不存在時的回傳值，但跟 get 不同，預設噴 KeyError。
8. `D.popitem()`
> 移除一 key , item pair 並回傳該 pair 為 tuple。(dict 為 empty 噴 KeyError)
9. `D.setdefault(key [, d])`
> 和 D.get(key , d) 同，如果不存在 k 則設定 D[key] = d。
10. `D.update([dict | assignment])`
> 更新字典，assignment 用法比較特殊，字串可以不用 quotation。
11. `D.values()`
> 回傳一個物件提供 view of values。（然後可以幹嘛？)
