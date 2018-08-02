---
title: Discuss About FP and Big Data
date: 2017-06-25 16:27:35
categories: A-ha
---

<center>
PL 課程上的一句話，
"FP 是將 function 帶入 data，因為這種特性，所以 FP 有時會用在 Big Data 上。"
起初不甚明瞭，和老爸討論後好像了解了什麼...
</center>

<!-- more -->

### FP 與 Big Data?
如同前言般，只聞教授談到，傳統 PL 是將 data 傳入 function，
而 FP 是將 function 帶到 data 中，由於此種特性，才有辦法處理 Big data 那種等級的 data。

聽起來還蠻合理的，因為相較於 data，此時的 function 反而比較小，這樣做的話確實是。
但是細想哪裡又怪怪的，不是都是在 memory 中嗎，而仔細想想，不是都一樣要堆 stack 嗎？
優勢究竟在哪裡？data 一樣要 load 進 memory，FP 究竟差在哪裡？

### Big data 和 資料庫

回到家後，無意間和老爸提起這個話題，他雖然沒碰 FP，但是他卻提了一個有意思的層面 -- 資料庫。

他的切入點是檔案型資料庫和伺服器型的資料庫。

他說檔案型資料庫相較於伺服器型，在多個 request 下效率相對較差。
因為大家都在開檔要資料，而要的是**完整的資料**，拿到資料後再各自去做處理，
處理方式比如 select（恩 sql 用語，在 FP 裡就是 filter 吧！)，什麼的動作都在 local 做。

而伺服器型就是向 server 端送 sql 語句，而傳回來的就是 server 處理好的資料，

發現了嗎？這兩者的差異就在於一來一回的資料量，由於檔案型是 local 處理，所以要的是整份資料，負擔較大，
而伺服器型中 local 拿到的就只有處理好的資料，這**運費**就差很多了。

所以他在想 FP 是不是用類似想法去處理 Big Data 的。

A-ha，豁然開朗，這麼一想，確實，FP 的 function call 是可以展開化簡的，由於這種特性，
甚至可以簡化成一道 function call 傳到 server 端去，一次處理，
和一般 PL 對每一個 function call 都要進 stack ，回傳然後才再傳到下一個 function 大大不同。

我說了之後，他又提到了 Shell 的 pipe，沒錯，pipe 也是從 FP 那邊來的。

雖然只是個猜想，可能和現實有部分偏差，但我還是很佩服他的直覺，
果然薑是老的辣啊 XD，這就是老手的直覺嗎？！
