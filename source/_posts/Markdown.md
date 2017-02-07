---
title: Trav.0 - Markdown
date: 2016-12-22 00:42:57
categories: Trav.
---
<center>
工欲善其事，必先利其器啊，既然 hexo 使用了 Markdown 來渲染文章，那就趕快來學個。
所謂 Markdown 是種輕量級標記語言，透過簡單的語法便可將.md 轉成.html。
等等！看來我對 Markdown 有誤解，
它的目的在於作為一個網路**寫作**用語言，重點在讓文檔**易讀易寫**，
至於轉成 html 是為了易於發布（當然嘛，瀏覽器讀的是 html)，
Markdown 宗旨是讓寫作變得容易，所以沒有 html 這麼多花招，
當然，要用 html 的東西，直接用就是了（直接上 tag)，
其實渲染器說穿了就是文本替換罷了... 吧？
剛好之前對 html 有些涉獵，所以 Markdown 在做些甚麼大抵上也是摸的到的。
所以學完 Markdown 後，我應該也可試試寫個渲染器（咦？)
</center>

<!-- more -->
## 0. 轉義
進入各類用法前，先來個提要吧，遇到 Markdown 有歸為特殊用法的符號時，
如果要讓它顯示原本的意思，就需要轉義，這時只要加一個反斜線`\`，在前就好了。

## 1. 標題
先來個所謂的"起手式"，也是 html 都會教的第一課，就是標題啦~
html 的標題是用`<h[1-6][><h[1-6]\>`（就是 h1 到 h6)，轉成 Markdown 用`#`號表示

### 用法
```
# \# is equal to h1
h1 還可以用這樣
===============
## \#\# is equal to h2
h2 也可以用這樣
---------------
### \#\#\# is equal to h3
```
記得井號後要空格

### 效果
> # \# is equal to h1
> h1 還可以用這樣
> ===============
> ## \#\# is equal to h2
> h2 也可以用這樣
> ---------------
> ### \#\#\# is equal to h3

## 2. 內文
html 的內文 tag`<p></p>`，在 Markdown 即是一個簡單文章的區段，不用特別加符號，
`<p></p>`的開合用空行即能達成

### 用法
```
就是一個簡單的內文，用 f12 確認一下吧
```
### 效果

就是一個簡單的內文，用 f12 確認一下吧

## 3. 強調
html 的強調用法有斜體`<i></i>`、粗體`<b></b>`、刪除線`<s></s>`，
Markdown 分別是使用`*`或`_`、`**`或`__`、`~~`

### 用法
```
*我是斜體呦* _我也是斜體_
**我是粗體呦** __我也是粗體__
*__兩個混著用__* _**注意遞迴式包裝**_
_**剩下的兩種**_ *__我也幫你試過了__*
***這種呢我也試*** ___我猜是不行___
~~刪除線是這樣，混著用我就不試了~~
```
### 效果
*我是斜體呦* _我也是斜體_
**我是粗體呦** __我也是粗體__
*__兩個混著用__* _**注意遞迴式包裝**_
_**剩下的兩種**_ *__我也幫你試過了__*
***這種呢我也試*** ___我猜是不行___
~~刪除線是這樣，混著用我就不試了~~

誒誒，竟然可以？! 我錯了（逃
不行，這時不能逃，才學到一半（正經臉
有點好奇底線是怎樣，結果發現好像是 style/CSS 的坑，[標記語言不用理](http://softwareengineering.stackexchange.com/questions/207727/why-there-is-no-markdown-for-underline)


## 4. 清單
html 的清單... 沒記錯的話，最外層都是要先包一層`<li></li>`，
再來看是要列順序 (ordered) 的`<ol></ol>`，還是要`<ul></ul>`就看尼囉。
Markdown 對於`<ol>`就編個號，例如`1.`就好，`<ul>`可以用`*`、`+`或`-`。

### 用法
```
基本上不用理會 li 的存在，Markdown 會判斷，恩，我猜的（逃
巢狀清單的話用縮排達成。跟標題一樣，注意編號和*+- 號後要空格
1. 第一大條
  * 一大的無序一中
  * 一大的無序二中
2. 第二大條
  1. 二大的有序一中
  2. 二大的有序二中
    * 二大二中的無序一小
```
### 效果
1. 第一大條
  * 一大的無序一中
  * 一大的無序二中
2. 第二大條
  1. 二大的有序一中
  2. 二大的有序二中
    * 二大二中的無序一小

## 5. 超鏈結
再來就是 html 最重要（我覺得）的超鏈結啦~，複習一下 html 全名 [HyperText Markup Language](https://zh.wikipedia.org/wiki/HTML)
html 的超鏈結就是`<a></a>`tag，在 Markdown 可以用`[]()`及`[][] + []:`使用

### 用法
```
<a href="超鏈結" title="標題（可略）">超鏈結名稱</a>
[超鏈結名稱](超鏈結 "標題（可略）")

標題就是滑鼠一到鏈結上面會顯示的東東啦
當然，超鏈結也可以用相對路徑啦，寫過網頁的就知道了

example:
[It's a google link](https://www.google.com)
[nobodyzxc github](http://github.com/nobodyzxc "你瞅啥")

這邊有種特殊用法，就是參考鏈結，有點像註腳，個人覺得像是變數

[超鏈結名稱][參考名稱]
『參考名稱』: 超鏈結

如此一來，他的參考名稱就會去參考到超鏈結。
兩行可以放得很開，第二習慣放最後面，當註腳（的樣子）。

example:
[知乎][zhihu 注意大小寫，這是一個變數參考 0]
many lines
[zhihu 注意大小寫，這是一個變數參考 0]: http://zhihu.com
```
### 效果
[It's a google link](https://www.google.com)
[nobodyzxc github](http://github.com/nobodyzxc "你瞅啥")

[知乎][zhihu 注意大小寫，這是一個變數參考 0]
many lines
[zhihu 注意大小寫，這是一個變數參考 0]: http://zhihu.com

## 6. 註腳
"聽說！"生成 html 時會變成清單，放在檔案最下面，或是變成視窗跳出來，不太一定
用中括號加`^`數字，`[^0]`

### 用法
```
註解零  [^0]
[^0] 就是這樣嗎？
一樣要注意空格啊
```
### 效果
註解零  [^0]
[^0] 就是這樣嗎？

Text prior to footnote reference.[^2]
[^2] Comment to include in footnote.

WTF? 好像弄不太起來... 有需要再找吧...

## 7. 圖片
敘述最少的一個，超鏈結前加驚嘆號

### 用法
```
![my logo](https://avatars0.githubusercontent.com/u/17202064?v=3&s=460)
![看山醬萌萌噠][ref]
[ref]: /images/zhi.jpg "zhi~~侵刪呦"
```

### 效果
![my logo](https://avatars0.githubusercontent.com/u/17202064?v=3&s=460)
![看山醬萌萌噠][ref]
[ref]: /images/zhi.jpg "zhi~~侵刪呦"

Image from [zhihu](https://www.zhihu.com/question/35778876/answer/65568580)、[看山微博](http://tw.weibo.com/liukanshan)

## 8. 程式碼區塊
如果鑲嵌行間請用`` ` ``前後包裝，一大塊則用<code>\`\`\`</code>包（可以加語言名稱）

### 用法
<figure class="highlight plain"><table><tbody><tr><td class="gutter"><pre><div class="line">1</div><div class="line">2</div><div class="line">3</div><div class="line">4</div><div class="line">5</div><div class="line">6</div><div class="line">7</div><div class="line">8</div></pre></td><td class="code"><pre><div class="line">行間鑲嵌一個、`/\`</div><div class="line"></div><div class="line">\`\`\`C</div><div class="line">#include&lt;stdio.h&gt;</div><div class="line">int main(void){// 對 我是不換行派的，打我啊</div><div class="line">    return 0;</div><div class="line">}</div><div class="line">\`\`\`</div></pre></td></tr></tbody></table></figure>

### 效果
行間鑲嵌一個`/`

```C
#include<stdio.h>
int main(void){// 對 我是不換行派的，打我啊
    return 0;
}
```
不要問我<code>\`\`\`</code>是怎麼打出來的，
我絕對不會說<code><code>\`\`\`</code></code>是借助 html 和反斜線之力完成的。

## 9. 表格
恩，就是 html 的`<table><tr><td></td></tr></table>`等

### 用法
```
冒號用來對齊（擺左齊左、擺右齊右，都擺置中）

| editor        | intro     | comment            |
|---------------|:---------:|-------------------:|
| emacs         | 神的編輯器| 聽說這表格他很會畫 |
| vim           | 編輯器之神| 本人目前用此編輯器 |

最左最右的 | 不一定需要
表格內部亦支援 Markdown 格式

```
### 效果
| editor        | intro     | comment            |
|---------------|:---------:|-------------------:|
| emacs         | 神的編輯器| 聽說這表格他很會畫 |
| vim           | 編輯器之神| 本人目前用此編輯器 |

## 10. 引言
電子郵件或論壇常見到的咚咚`>`

### 用法
```
> 引言
```

### 效果
> 引言

## 11. 內嵌 html
不用多說，用下去就對了。

## 12. 水平分割線

### 用法
```
獨立一行，大於等於三個符號接起來即可

-----------

***********
___________

```

### 效果
-----------

***********
___________


凌晨四點... 我睡了... 本文的 Markdown 版本在[這裡](https://github.com/nobodyzxc/BlogBackUp/blob/master/source/_posts/Markdown.md)，晚安
* reference
  * [一本 gitbook](https://wastemobile.gitbooks.io/gitbook-chinese/content/format/markdown.html)
  * [domain name 像官網](http://markdown.tw/)
