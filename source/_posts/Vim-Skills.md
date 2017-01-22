---
title: Trav.1 - Vim Skills
date: 2017-01-22 23:32:56
categories: Trav.
---
<center>
結識 vim ，算得上機緣巧遇啊。唉，意味深遠啊。
這篇文章會不定期更新，隨著我的 vim skill。
這段旅途的終點，大概就是我不用 vim 的那天吧！
(可能是入 emacs 教，或是奔向 IDE 了吧～)
</center>
## 0. 起手式 - 基本操作
要編輯一個存在的文檔`tst.txt`時只要在 terminal 下 `vim tst.txt`。
如果要建立一個新檔，叫做`new.txt`，也只要下 `vim new.txt`，只是離開記得存。
如果還沒想到要存什麼名字，只要下`vim`就好了，離開再命名就好了。

vim 有三種模式 normal , insert , visual。一開始進到 vim 時即是 normal 模式。

`<ESC>`進 normal mode ，
normal mode 下，`i`(注意是小寫)，可以讓游標在**原位**進入 insert mode，
normal mode 下，`v`，可以進入 visual mode。

看起來，normal mode 是一切 mode 的橋樑。

敏銳的人可以發現， normal mode 左下並沒有特別的東西。
insert mode 會出現 `-- INSERT --`， visual mode 則是 `-- VISUAL --`。

### - normal mode
normal 模式可以下指令，其中離開指令就是在 normal mode 下的。
要切換 normal mode 只要按`esc`鍵就好了，vim script會表示成`<ESC>`。
要下指令，只要在 normal mode 按`:`，再下指令。

進到 vim 之後先講一下離開吧。

> 要產生一個隨機字串，就是讓一個新手離開 vim

離開的指令是`q`，所以假設我們不知道現在是什麼模式，

只要按下`<ESC>:q`，就能離開。
不過你可能會遇到這種情況

> `E37: No write since last change (add ! to override)`

意思就是你對檔案有了改動， vim 不確定你是否要儲存再離開，所以詢問。
道理和用 Word 離開會跳出 msgbox 一樣。
如果沒有要儲存，照著提示，只要下`:q!`，即可。
若要儲存，只要下`:wq`。
到了這裡，有沒有發現一件事，所謂指令，好像有著某種組合關係。

> 沒錯， vim 的精隨就在於**組合**！

`w`是儲存的指令，`:wq`，就是儲存後離開。
直接下`:w`當然就是儲存啊，養成隨時儲存的習慣， vim 因為斷線掛掉可是很折騰的。

> 不要只會`:wq`啊，`:w`要舉一反三直接理解

前面提到，若沒取檔名，只要在離開使用`:wq filename`即可存成該檔並離開。
`filename` 這個參數主要是餵給 `w` 使用，所以單獨用`:w filename`也可以。

若 vim 在一開始就開檔了呢？這時此種用法就會變成另存新檔囉，很好理解吧。

`!`是強制的意思，`:q!`，解釋為強制離開。
有時是文檔的擁有者，但是沒有給自己加上 w 權限，
這時 vim 左下角就會出現`[readonly]`。
normal mode 下 `:wq`時就會出現

> `W10: Warning: Changing a readonly file`

這時也只要加個驚嘆號就可以了。（當然，不是文檔擁有者不管用）
那`:qw`可以執行嗎？很遺憾，所謂指令是有順序的，想想看，這合理嗎？
也是可以試試看，程序員鼓勵試錯精神。

> `:wq` 有快捷，他等價於`:x`，但我覺得要按`<ESC>`的話，
> 計入移動手的成本，其實也沒快到哪裡。

normal mode 已經說了個大概，更進階的之後會在 vim script section 中討論。

### - insert mode
### - visual mode
