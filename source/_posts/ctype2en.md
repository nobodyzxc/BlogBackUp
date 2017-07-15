---
title: C Type Defination to English
date: 2017-07-15 17:04:01
categories:
---

<center>
PL 教授給的 [8 頁 Func Ptr 閱讀材料](https://www.google.com.tw/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwiYrNTC6orVAhXEebwKHVxyDXIQFgglMAA&url=http%3A%2F%2Fwww2.mta.ac.il%2F~hbinsky%2Fc%2520content%2FFunction%2520Pointer.pdf&usg=AFQjCNEzZ-0v-7fvdH5Z8sEVHbebcpV4mg)。
那就來玩一下吧。
</center>
<!-- more -->
<script src="/mycode/c-syntax-path.js"></script>
<link href="/mycode/c-syntax-path.css" rel="stylesheet" type="text/css">
<p></p>
<p></p>
> 我嘗試寫成 Haskell 的定義型態。
> 當然， Haskell 並沒有 Pointer，我把它當作一種自定義的資料型態。

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

> 自已試著抽象成一套規則

先找變數宣告名稱，\w+ 後跟的是 ( ，則此宣告為一函式，否則為一般變數。

函式右邊括號是他的參數，其名前有`*`代表他的回傳值是一個指標。
`long *fn(fnArg)` -> `fn :: FnArg -> Long*`

如果再右邊還有括號，則他的回傳指標為函數指標，其參數為該括號內容。
`long *fn(fnArg)(argOfAfnRtnedByAFn)` -> `fn :: FnArg -> (ArgOfAfnRtnedByAFn -> Long)*`

如果後面一直有括號，其指的函式類型就一直向右 eval 括號就好了。
`long *fn(fnArg)(argOfAfnRtnedByAFn)(argOfAfnRtnedByAFnRtnedByAFn)`
-> `fn :: FnArg -> (ArgOfAfnRtnedByAFn -> (ArgOfAfnRtnedByAFnRtnedByAFn -> Long))*`

注意指標可能出現的位置。
`long (*fn(fnArg)(argOfAfnRtnedByAFn))(argOfAfnRtnedByAFnRtnedByAFn)`
-> `fn :: fnArg -> (ArgOfAfnRtnedByAFn -> (ArgOfAfnRtnedByAFnRtnedByAFn -> Long)*)`

`long (*fn(fnArg)(argOfAfnRtnedByAFn)(argOfAfnRtnedByAFnRtnedByAFn))`
-> `fn :: fnArg -> (ArgOfAfnRtnedByAFn -> (ArgOfAfnRtnedByAFnRtnedByAFn -> Long*))`

有時指標不只一個，看著辦吧。

> 其實回傳函數指標和回傳函數在 C 裡是一樣的事情

變數名前有`*`代表他是一個指標，
`long *ptr` -> `ptr :: Long*`

如果右邊有括號，代表他是一個函數指標。
`long (*ptr)(argOfApointedFn)` -> `ptr :: (ArgOfApointedFn -> Long)*`

其指的函式類型就一直向右 eval 括號就好了。
`long (*ptr)(argOfApointedFn)(argOfAFnRtnedByAFnPointedByAPtr)`
-> `ptr :: (ArgOfApointedFn -> (ArgOfAFnRtnedByAFnPointedByAPtr -> Long))*`

一樣，有時指標不只一個，看著辦吧。

> 我都快搞不清我在寫啥了，轉 Haskell 的表達清楚很多。
