---
title: Vim Note （上）
date: 2017-01-22 23:32:56
categories: Note
---
<center>
結識 vim 一年多了，一切的一切算得上機緣巧遇。
想來不禁百感交集，意味悠遠。
這篇文章會不定期更新，隨著我的 vim skill。
這段旅途的終點，大概就是我不用 vim 的那天吧！
（可能是入 emacs 教，或是奔向 IDE 了吧～)
Chrome 有 Vimium ， Firefox 有 VimFx 加入我大 Vim 教吧。
</center>
<!-- more -->
<br><br>
## 基本操作篇
要編輯一個存在的文檔`tst.txt`時只要在 terminal 下 `vim tst.txt`。
如果要建立一個新檔，叫做`new.txt`，也只要下 `vim new.txt`，只是離開記得存。
如果還沒想到要存什麼名字，只要下`vim`就好了，離開再命名就好了。

vim 有三種模式 normal , insert , visual。一開始進到 vim 時即是 normal 模式。

`<ESC>`進 normal mode ，
normal mode 下，`i`（注意是小寫），可以讓游標在**原位**進入 insert mode，
normal mode 下，`v`，可以進入 visual mode。

看起來，normal mode 是一切 mode 的橋樑。

敏銳的人可以發現， normal mode 左下並沒有特別的東西。
insert mode 會出現 `-- INSERT --`， visual mode 則是 `-- VISUAL --`。

### - normal mode
normal 模式主要有兩種功能，快速移動游標、簡易文檔操作和下指令。
其中離開指令就是在 normal mode 下的。
要切換 normal mode 只要按`esc`鍵就好了，vim script 會表示成`<ESC>`。
要下指令，只要在 normal mode 按`:`，再下指令。

  1. 移動

    要移動最簡單的就是按方向鍵，但是 vim 習慣上會使用 `jkhl` ， 分別對應上下左右。
    （方向鍵在所有模式是通用的）

    不想一格格移動的話可以先鍵入一個數字再移動，比如 `15j` 是向下移動十五行。
    在很多操作下都有搭配數字的用法，有興趣不妨試一下。

    要把游標移動到行首，可以直接按數字 `0`。
    要把游標移動到行尾，可以直接按符號 `$`(shift + 4)。
    要把游標移動到首行，可以直接按字母 `gg`。
    要把游標移動到行首，可以直接按字母 `G`(shift + g)。

    vim 上某些建議是不要鎖住 caps lock 鍵，要大寫盡量用 shift 鍵。

  2. 文檔操作

    * copy   : 整行 copy 按 `yy`，或是按`v`進入 visual mode 選取再按 `y`。
    * paste  : 按`p`。
    * delete : 用法跟 copy 很像，字母`d`和`x`，try 一下吧，帶有剪下的功能。
    * search : 按下 `/` ， 鍵入搜尋字串然後`enter`，`n`下一筆，`N`上一筆。
    * replace: `:%s/ 目標字串 / 取代成字串 /g`，`g`是對每行的目標字串替換，
沒加只會取代每行第一個。 （亦可進入 visual 進行取代，就不用使用`%`)
        （關於 vim regex 請走[這](http://vimregex.com/)）

  3. 指令

    進到 vim 之後先講一下離開吧。
    有句有名的話是這樣說的。

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

    像是要把該行往下 shift 一行，就可以使用 `ddp`。

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
    > 還有個快捷是`ZZ`。

normal mode 已經說了個大概，更進階的之後會在 vimrc section 中討論。

### - insert mode

主要就是打字，沒什麼好說的，有幾種指令可以由 normal mode 進入 insert mode。

  * `i` : 由游標位置進入。
  * `I` : 插入該行第一個字元位置。
  * `a` : 游標位置往後一位插入。
  * `A` : 插入行尾。
  * `o` : 插入下一行。
  * `O` : 插入上一行。
  * `s` : 消除一字元並進入。
  * `S` : 清除該行。

### - visual mode

  一鍵縮排很實用，選起來再按 `=` 即可。
  所以要全文縮排就可以使用 `ggvG=` 或是 `gg=G`。

  還有值得一提的是 column 模式。
  按`v`進入 visual mode，往下選取需要的行。
  `ctrl-v`進入 column 模式。

  然後可以做啥咧？按`I`進入 insert mode，鍵入幾個字。
  `esc` 跳出。
  在每行插入剛剛打的字母。

參考資料：[vim cheat sheet](https://www.fprintf.net/vimCheatSheet.html)
