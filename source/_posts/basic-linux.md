---
title: Cygwin Beginner Guide
date: 2017-05-30 22:41:52
categories:
---

<center>
本篇主要內容為在 Cygwin 下一些簡單的 BASH 用法。

</center>

<!-- more -->

事先聲明 Cygwin != Linux，它是 Windows 下一個模擬 Linux terminal 的介面。

關於 Cygwin 的[安裝](https://www.ubuntu-tw.org/modules/newbb/viewtopic.php?topic_id=47282)。

不過可以注意的是套件的部分只要多載一個 wget 就夠了，其他部分（如 vim 等）用 [apt-cyg](https://github.com/transcode-open/apt-cyg) 下載就好。
(apt-cyg 的使用置於文末）

當你開啟 Cygwin 時，先不要嫌它醜，這之後可以慢慢調。
（或是直接抓現成的[設定檔](https://github.com/nobodyzxc/MyConfFiles/blob/master/cygwin.bashrc.sh) 存到`~/.bashrc`）

## WHERE AM I ?

首先，你可以看到有個命令列。

```
userName@computerName ~
$
```

記住，你現在位置為家目錄，如果沒有特別改命令列的話，你可以發現命令列是以`~`表示家目錄。

你現在有的只有簡單命令列，你可以先下個`pwd`指令來確認自己現在在檔案系統中的位置。

不過你會發現這個位置有點奇怪，怎麼在 windows 的檔案總管中沒有見過，

這是因為 Cygwin 要模擬 linux 的檔案環境，

將你當初安裝的路徑選為根目錄 (root)，長出一套類似 linux 的檔案環境（樹狀）。
（而且 windows 的檔案分層是使用`\`，linux 則是使用`/`）
```
/                <- 根目錄 (root)，為 windows 下的某個資料夾
|
├── bin          <- 很多指令（程式）存放的位置
├── cygdrive
│   ├── c        <- 注意！這裡可以切到 C 槽
│   └── d        <- 注意！這裡可以切到 D 槽
├── dev          <- 對 linux 來說，這裡有很多硬體裝置有關的檔案
├── etc          <- Linux 開機（這裡就是開 Cygwin) 的一些設定檔
├── home
│   └── ~        <- 家目錄，你現在的位置
├── lib          <- 程式語言的一堆 library
├── sbin         <- 放著系統管理者常用的指令
├── tmp          <- 一般使用者暫存檔案的地方，重要的東西不要放這
├── usr          <- 跟系統息息相關的目錄
│   ├── bin
│   ├── etc
│   ├── include
│   ├── lib
│   └── tmp
└── var          <- 系統工作預設的工作目錄。
```

你現在的位置其實和 windows 還是有應對關係的，

你可以下個
`cygpath -w $HOME`來確認自己家目錄在 windows 的位置。
`cygpath -w $PWD `來確認自己當前  在 windows 的位置。

## 動身

知道了自己的位置後，接下來就是改變位置了，

想像一下，你現在是一個人，每個資料夾是個房間，你現在知道自己的位置，再來就是走來走去了。

你可以先下個`ls`指令，看一下現在的房間和哪幾間相連著。(ls 是 list 的縮寫）

沒意外的話是空空如也啊。

可以再下個`ls -a`，(a 是 all 的意思），把所有隱藏的房間（和物品 ->文件） show 出來。
(`ls -la` 可以詳列更多訊息，l 是 long list format 的意思）

你可以發現多了 `.` 和 `..` 這兩個房間。

`.`表示當前這間房間。至於為啥要有這種設計，你之後就會知道了。
`..`則是上一層房間。方才我們說過，linux 的檔案系統是以樹狀的結構存在。

接下了可以開始切換了，可以使用`cd dirname`切換路徑。
使用`cd ..`切到上一層。(cd 是 change directory 的縮寫）
沒有任何 output，只是命令列 (prompt) 稍稍改變了一下，這代表你成功切到上一層了。

> 沒有消息就是好消息。—— linux 的哲學

沒有 output 大多就是程序正常運行。

接著下`ls`，看到的目錄應該就是你的家目錄，注意一點的是，名字為什麼不是`~`呢？

因為`~`只是個縮寫啦。

關於回到家目錄，你可以用`cd ~` 或 `cd`。

> 對於路徑，[這裡](http://linux.vbird.org/linux_basic/0220filemanager.php#dir_pathway) 有更詳細的說明。

## 建立捷徑

linux 和 windows 的捷徑其實是不太一樣的，在 cygwin 中不可用 .lnk 的捷徑。

在家目錄如果想要建一個到桌面的捷徑，
你可以下 `ln -s /cygdrive/c/Users/$USER/Desktop/ ~/desktop`。

然後你在家目錄可以使用 `cd desktop` 移動到桌面了。

## 創建、刪除與移動

* 創建
當你要創建一個資料夾的時候使用 `mkdir dirname`。
當你要創建一個空文檔的時候使用 `touch filename`。
> 補充一點，檔案大致分為兩種類型 text 和 binary，
> [text](https://en.wikipedia.org/wiki/Text_file) 是存 ASCII 和 UTF-8 一類，一般用 vim 或記事本等編輯。
> [binary](https://en.wikipedia.org/wiki/Binary_file) 是 non-text file，例如可執行的二進制檔案。
> 不過 .py 檔是純文本也可執行，因為它是直譯的。
> 但是說到底，在電腦裡都是以二進制的方式儲存啦 :P

* 刪除
當你要移除一個檔案時 `rm filename`。
當你要移除一個*空*資料夾的時候 `rmdir dirname`。
當你要移除一個資料夾（空或非空都適用）和裡面的東西 `rm -r dirname`。
(-r flag 是 recursively 的意思）
> 注意！使用 rm 刪除資料就真的回不來了，它沒有資源回收垃圾桶。

* 移動（或更名）
當你要移動檔案（或資料夾）A 到資料夾 B 時 `mv a b`。
當你要重新命名檔案（或資料夾） A 為 B 時 `mv a b`。
> 看出來了嗎，若 B **資料夾**不存在，則會視為更名，存在則是移動。
> 要非常小心的一點是 B 如果是已存在的**檔案**時，B 會被 A 覆蓋，而 A 命名為 B。
> 還有一點要注意的是，Windows 下大小寫其實是不分的。
> （但你在 Cygwin 中打字還是要分大小寫）。

## 關於強大的 TAB 和 Arrow Keys , 快捷鍵等

* tab
假設你要切換到一個名字很長的資料夾時，
`cd aDirWithALongLongLongName`，你可能會打到瘋掉，
這時可以適時的使用 tab 鍵。
`cd aDirW` 打幾個字後敲一下 tab 鍵，他會盡可能挑出當前可能的選項幫你補上去。

* arrow keys
你方才輸過的指令可以用方向鍵上下來叫出來。

* 快捷鍵（有興趣請走[這](https://wiki.archlinux.org/index.php/Keyboard_shortcuts))
輸過的指令也可以按`ctrl-r`然後敲幾個字來叫出，
如果不是想要的那個，繼續按`ctrl-r`，選到後按`enter`。

## 指令幫助

每一道指令都是一支程式，在 linux 下你可以用以下方法得到使用說明。

* `man 指令名稱`
其實 man 就是一支程式，它會幫你去找其他指令的相關使用說明。

* `指令名稱 -h`
* `指令名稱 --help`
一般來說程式會內建一些使用說明，加個 flag 試試看吧。

## 資料流重導向

使用資料流也是一項很重要的技能。
簡單來說資料流可以分做 stdin , stdout , stderr。

* stdin 是檔案內容輸入至程式（指令）的一條流向。
（鍵盤輸入 -- linux 下裝置也有檔案，在 /dev 中，也是 stdin）

  當你寫好一支簡單的程式 (output.py)，他會要求輸入，然後輸出至螢幕。
  ```python
print(input())
  ```

  但你每次要輸一長串相同的東西很麻煩，
  這時候你可以寫在檔案 (input.txt) 裡面。
  ```
hello world! It's my first python script ......
  ```

  每次就不用執行`python output.py`再從鍵盤輸入同樣的東西了。
  寫好 input.txt 後只要下`python output.py < input.txt`，
  它就會幫你把 input.txt 的內容輸進 output.py。

* stdout 程式輸出至檔案的那條流向（螢幕在 linux 下也是檔案喔）。

  你現在下個 `ls` 的指令，它會輸出至螢幕，如果你要將它重導至檔案 (justLsOut.txt)，
  可以下個`ls > justLsOut.txt`。
  如果本來沒有 justLsOut.txt 檔案，它會創一個 justLsOut.txt，然後把內容塞進去。
  如果已經有 justLsOut.txt 的話，它會覆蓋掉 justLsOut.txt 的內容，然後塞 ls 的結果進去。

  但如果你不想要覆蓋掉原本內容呢？你也可以將 ls 的結果加在 justLsOut.txt 後面。
  使用 `ls >> justLsOut.txt` 就好了。`>>`是 append 的用法。

* stderr 是當有錯誤發生時，程式輸出至檔案的那條流向。
  不過一般是跟 stdout 一起輸到螢幕。
  如果你將 stdout 導到其他地方，螢幕剩下的就是 stderr 了。

> 更多如 `cat > file.txt << end` , `ls nonexsitfile.txt > out.txt 2&>1` 用法請走[這](https://www.csie.cyut.edu.tw/moodle23/dywang/linuxProgram/node14.html)
> 除此之外，你還可以學學 [pipe](https://www.csie.cyut.edu.tw/moodle23/dywang/linuxProgram/node15.html)


## 使用 apt-cyg 管理套件

cygwin 安裝的 setup.exe 基本上就是一個套件管理器，但是它是 GUI 的，而且還要點一堆選項，感覺很慢。

如果你追求速度又 prefer Text Mode 的話，你可以試試別人寫的 shell script － apt-cyg。

用起來感覺就像 apt-get 一樣。

apt-cyg 如何使用呢？首先先把 [apt-cyg 的 script](https://github.com/transcode-open/apt-cyg/blob/master/apt-cyg) 複製下來，

接著你有以下幾種方式（任選其一即可）把內容貼到檔案，放到家目錄。

1. 貼在記事本裡面，**不要用 word**，然後存到家目錄 (`cpath -w $HOME`) 中，假設存為 `script.txt`。
2. 下指令`cat > script.txt` 然後滑鼠右鍵貼上，按 enter，接著`ctrl-d`跳出。
> 你可以下`cat script.txt`看貼上有沒有成功，
  `cat`指令是將檔案內容輸出至螢幕（沒有參數時是將鍵盤輸入輸出）。
  接著可以用 `mv script.txt apt-cyg`。（別懷疑，我會將檔案叫做 script.txt 只是要你練習 mv）<br>
3. 有裝 wget 的話，在家目錄使用
   > `wget https://raw.githubusercontent.com/transcode-open/apt-cyg/master/apt-cyg`
     （你可以 cat 一下 apt-cyg 看看有沒有下載成功）

再來 `chmod a+x apt-cyg`。
（讓這個腳本擁有執行權限，有興趣看看關於 linux [檔案權限](http://linux.vbird.org/linux_basic/0210filepermission.php) 的內容）

接著 `./apt-cyg install vim`。你就有 vim 可以用了。（我的 vim 入門可以走[這](/2017/01/22/vim-0/#more))
（和 Windows 不一樣的是，當前目錄可執行的檔案要執行一定要加 `./`)

你可以將 `apt-cyg` 移到 `/bin` （根目錄底下的 bin 目錄），
這樣就能在任何地方呼叫它而不用使用`./`了。

`mv apt-cyg /bin`。（對這方面有興趣可以看看`$PATH`的[介紹](https://www.phpini.com/linux/set-path-var)）

然後如果對有帶`$`號的變數有興趣的話，可以看看[環境變數](http://linux.vbird.org/linux_basic/0320bash.php#variable_environ)。

> 其實如果檔案沒有執行權限，可以使用`bash file.sh` 來執行一個 shell 腳本。
> 道理和 python 一樣。

## 其他有用套件

`tmux` -- 一項強大的終端切割螢幕工具。使用 `apt-cyg install tmux` 取得。
在沒有設定檔的情形下`ctrl-b`是 prefix 鍵。 使用`ctrl-b ?`開始玩玩看吧。
也可以使用我調校過的[設定檔](https://github.com/nobodyzxc/MyConfFiles/blob/master/tmux.conf) (prefix 是 `ctrl-a`)，將設定檔存為 `~/.tmux.conf`。

## 結束

你玩完 Cygwin 後，可以不用按右上角的`X`，你可以打個 `exit` 或按`ctrl-d`來結束它。
