---
title: C Type Defination to English
date: 2017-07-15 17:04:01
categories: Note
---

<center>
PL 教授給的 <a href="https://www.google.com.tw/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=1&amp;cad=rja&amp;uact=8&amp;ved=0ahUKEwiYrNTC6orVAhXEebwKHVxyDXIQFgglMAA&amp;url=http%3A%2F%2Fwww2.mta.ac.il%2F~hbinsky%2Fc%2520content%2FFunction%2520Pointer.pdf&amp;usg=AFQjCNEzZ-0v-7fvdH5Z8sEVHbebcpV4mg">8 頁 Func Ptr 閱讀材料</a>。<br>
那就來玩一下吧。<br>
wait to refer:<a href="http://ieng9.ucsd.edu/~cs30x/rt_lt.rule.html">rule</a>
</center>


<!-- more -->


<br><br>
<script src="/files/c-syntax-patch.js"></script>
<link href="/files/c-syntax-patch.css" rel="stylesheet" type="text/css">

> The flip side of this is that you have to deal with old mistakes and with compatibility problems. For example, I consider the C declarator syntax an experiment that failed.-Bjarne Stroustrup, in his SlashDot interview on 2/25/2000.

> 我嘗試寫成 Haskell 的定義型態。
> 那個 Type\* 能理解就好了 （逃

[https://cdecl.org/](https://cdecl.org/)

1. <code class='patch'>long \*a(int)</code>
    ```C
    declare a as function (int) returning pointer to long
    ```
    ```Haskell
    a :: Int -> Long*
    ```
2. <code class='patch'>long (\*b(int))</code>
    ```C
    declare b as function (int) returning pointer to long
    ```
    ```Haskell
    b :: Int -> Long*
    ```
3. <code class='patch'>long (\*c)(int)</code>
    ```C
    declare c as pointer to function (int) returning long
    ```
    ```Haskell
    c :: (Int -> Long)*
    ```
4. <code class='patch'>long \*d(int)(char)</code>
    ```C
    declare d as function (int) returning function (char) returning pointer to long
    ```
    ```Haskell
    d :: Int -> (Char -> Long*)
    ```
5. <code class='patch'>long (\*e(int))(char)</code>
    ```C
    declare e as function (int) returning pointer to function (char) returning long
    ```
    ```Haskell
    e :: Int -> (Char -> Long)*
    ```
6. <code class='patch'>long (\*f)(int)(char)</code>
    ```C
    declare f as pointer to function (int) returning function (char) returning long
    ```
    ```Haskell
    f :: (Int -> (Char -> Long))*
    ```
7. <code class='patch'>void qsort(void \*, size_t, size_t,int (\*)(const void \*, const void \*))</code>
    ```C
    declare qsort as function (pointer to void,
                               size_t,
                               size_t,
                               pointer to function (pointer to const void,
                                                    pointer to const void)
                                )
                     returning int) returning void
    ```
    ```Haskell
    qsort :: Void* -> Size_t -> Size_t -> (Void* -> Void*)* -> Void
    ```

1. start with the identifier
2. look to the right for brackets[ ] or parentheses()
3. look to the left for asterisks
4. remember that parentheses group
5. finally, look at the type (eg. int)

[reference link](http://cseweb.ucsd.edu/~ricko/rt_lt.rule.html)


重點是先往右讀，然後讀到括號，再往左讀，如此往復。
先找變數宣告名稱，\w+ 後跟的是 ( ，則此宣告為一函數，否則為變數。

先往右，遇到 `(`，為函數，參數為 fnArg。
往左讀，遇到 `*`，回傳為一指標，指向 long。
`long *fn(fnArg)` -> `fn :: FnArg -> Long*`

如果再右邊還有括號，則他的回傳指標為函數指標，其參數為該括號內容。
`long *fn(fnArg)(argOfAfnRtnedByAFn)` -> `fn :: FnArg -> (ArgOfAfnRtnedByAFn -> Long)*`

如果後面一直有括號，其指的函數類型就一直向右 eval 括號就好了。
`long *fn(fnArg)(argOfAfnRtnedByAFn)(argOfAfnRtnedByAFnRtnedByAFn)`
-> `fn :: FnArg -> (ArgOfAfnRtnedByAFn -> (ArgOfAfnRtnedByAFnRtnedByAFn -> Long*))`

注意指標可能出現的位置。
`long (*fn(fnArg)(argOfAfnRtnedByAFn))(argOfAfnRtnedByAFnRtnedByAFn)`
-> `fn :: fnArg -> (ArgOfAfnRtnedByAFn -> (ArgOfAfnRtnedByAFnRtnedByAFn -> Long)*)`

`long (*fn(fnArg))(argOfAfnRtnedByAFn)(argOfAfnRtnedByAFnRtnedByAFn)`
-> `fn :: fnArg -> (ArgOfAfnRtnedByAFn -> (ArgOfAfnRtnedByAFnRtnedByAFn -> Long))*`

有時指標不只一個，看著辦吧。

> Illegal combinations include:
	 []() - cannot have an array of functions
	 ()() - cannot have a function that returns a function
	 ()[] - cannot have a function that returns an array

所以其實上面五項，應該只有幾個是 Illegal 的（from reference）

> 其實回傳函數指標和回傳函數在 C 裡是一樣的事情

變數名前有`*`代表他是一個指標，
`long *ptr` -> `ptr :: Long*`

如果右邊有閉括號，代表他是一個函數指標。
`long (*ptr)(argOfApointedFn)` -> `ptr :: (ArgOfApointedFn -> Long)*`

其指的函數類型就一直向右 eval 括號就好了。
`long (*ptr)(argOfApointedFn)(argOfAFnRtnedByAFnPointedByAPtr)`
-> `ptr :: (ArgOfApointedFn -> (ArgOfAFnRtnedByAFnPointedByAPtr -> Long))*`

一樣，有時指標不只一個，看著辦吧。

我都快搞不清我在寫啥了（
Haskell 的 Type 表達比較好理解（
