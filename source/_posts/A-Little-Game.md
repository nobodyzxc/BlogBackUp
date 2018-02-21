---
title: A Little Game
date: 2018-02-21 21:35:51
categories:
---

<center>
這是一年多前，在知乎看到的[小遊戲](http://www.therottingcartridge.com/games/programming/)。
那時候玩到感覺就是這遊戲真不簡單，蘊含了很多東西在裡面。
這幾天因為朋友說無聊，所以我又翻出來玩（結果他沒玩），
感覺得到的東西又不一樣了。
感覺從中得到了些東西，所以想探討一下。
</center>

<!-- more -->

## [傳送門](http://www.therottingcartridge.com/games/programming/)
   ^ 戳他

## 玩法介紹

<s>自己摸索吧，這樣最有趣，因為我也是這樣玩的</s>

白色盤面上的工具要用光，而你的任務是利用白色盤面上所有的工具造出左上角的 Goal。
其中下面黑色區域則是可選區，你可以拿或不拿其中的工具來完成你的目標。
開始用滑鼠拖曳（或點擊）元件，組合出需求吧。

## 初見

剛接觸到這遊戲，是因為看到了在推廣 FP 的貼文。
其實那則貼文有兩個遊戲，而此次要提的是我覺得比較好玩的那款。
玩完之後馬上推給了同學呢 w

在這遊戲中，看到了 Currying 的概念，
接收了一個部件，一個半完成的工具也是一個工具。
而最有趣的是他有 Higher Order Function 的思想

> 一個產生輸出的工具，亦可拿工具當輸入，甚至回傳工具。

還有偷換概念的部份，
他會將原本比較實際的東西漸漸抽象為程式碼，
到最後竟然有寫 Code 的感覺。

## 再見

第二次碰的時候，
將上次沒玩完（老實說我很好奇為啥那時沒玩完）， 通通跑過了一遍。
順便拿家人當實驗品 w
在變換的過程中，我發現了 Lambda 的存在。
之前旁聽 Haskell 的時候，還對他不熟悉，
到現在看過了一點 Lambda Calculus 相關的定義後，
這次驚奇的發現在抽象的過程中，竟然跑出了 Lambda Expression，
然後最後變成 JS 的 Arrow Function。

拿給家人玩時，發現普遍會發生一個問題，
那就是大家會觀察不到工具的功能。
可能是有 FP 經驗，所以我玩起來都知道其中那些東西的象徵意義，
或是我玩遊戲比較有 sence，我去注意細節，所以玩起來特別有感覺。
可是其他人玩大多都是憑感覺，有些接口也會弄不清楚可不可以接上。
這邊就是我覺得他不足的地方了。
雖說形狀已經有稍微強調，可是不夠明顯。或許可以用顏色表示。

還有一些關卡過於簡單，而且因為關卡順序不是很恰當，
所以感覺會讓人失去興趣，感到無聊。

其實這次還發現了一個特點，
那就是強制要求要用光白色盤面的規則，
除了要讓你照規則走，發現一些 FP 的特性，
他也可以闡發一個概念，就是如何使用原本就有的東西，巧妙的修改，
而不是重新造輪子（雖然有時會比較快），
但是使用原有的函式構造新的函式是 FP 一個重要的思想啊。

來總括一下此遊戲設計的所有元素吧。

點出比較重要的幾關吧。
- Lv1
   提了 atom，如星星，一個基本的資料型態，應該可算 Symbol。
   還有就是 function，可以 input 然後 return 的。
   （建議動畫可以做好點，不然普通人會把 input x return x 當成沒有事情發生）

- Lv2
   function can take function as input.

- Lv3
   function can return const , not always variable.
   and they are all functions.

- Lv4
   figure out the black region.

- Lv5
   function can return more.

- Lv6
   function can split the expressoin part.

- Lv7, 8
   HOF

- Lv10
   tool -> lambda expr

- Lv11
   boolean type

- Lv12, 13
   boolean expr(function), true and false

- Lv 22
   if expression (PP 的會說是 ternary operator)

嘛，還有 List , Map 之類的，懶的說了。

我很喜歡他偷換概念的部份，不過不要換太快，會令初學者措手不及。
