---
title: 生活中的 function，以金拱門套餐為例
date: 2017-11-04 19:55:12
categories:
---

<center>
今天到金拱門點了晚餐，
平時都很順利的，今天卻碰到了些小狀況。
</center>

<!-- more -->

### 櫃台前

> 我：我要選 D 餐
> 店員：請先選主餐

恩，這是從來沒遇到過的問題。

第一次遇到店員叫我先點主餐。

今天就來討論一下，為什麼我先選套餐再選主餐。

> 因為價目表最左邊就是先寫套餐，全文完。( X )

### 抽象成函數

其實抽象一點來看，所謂的套餐組合，就是一種 function。

你可以選擇喜歡的搭配，然後會得到一個價錢。
比如說 D 餐，一塊炸雞加上一杯飲料，再搭一個主餐，其價錢格是 65 加上主餐的錢。

這個 function 我們可以寫成什麼呢？

回傳值是我們想知道的價錢，而參數是飲料及主餐的類型。
而只要飲料是在預定地範圍內，套餐價格是不會上漲的。

所以我們在 C 可以寫成

```C
Price D_combo(Drink drink , Main main) {
    return 65 + main.price;
}
```

你在決定要 D 套餐時，就必須先決定好 drink 和 main，
把 drink 和 main 塞入 D_combo 這組合中，
一氣呵成，計算出價格。

飲料點了可樂和而主餐是漢堡。

```Cpp
Drink myDrink = cola;
Main myMain = hamburger;
D_combo(myDrink , myMain);
```

你會得到 D_combo 的 return 為

> 65 + myMain.price = 65 + hamburger.price

漢堡是 69 元，所以是 134 元。

恩，標準的 [PP](https://zh.wikipedia.org/zh-tw/%E8%BF%87%E7%A8%8B%E5%BC%8F%E7%BC%96%E7%A8%8B)。
那我們來找一下 [FP](https://zh.wikipedia.org/zh-tw/%E5%87%BD%E6%95%B8%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80) 的感覺。

### 從 FP 的觀點

現在 D_combo 是個套餐的 function，在 lambda 可以寫成

> λ drink main . 65 + price(main)

不要被 λ 嚇到，它的作用就只是說明這段描述是個 function。

> λ 和 . 之間有 drink 和 main，這是參數， 飲料和主餐。
> 而 . 之後的敘述是函數的定義，
> price 是個 function，可以得知主餐的價格。

在我們現在點了杯可樂後。

> ( λ drink main . 65 + price(main))(cola)

因為 drink 在定義中沒有出現，沒有東西可以替換，同時把 drink 從參數消掉。

我們可以得到

> λ main . 65 + price(main)

它脫去飲料的參數，可是還差一個主餐。
他還是個 function，我們依舊不知道價錢是多少。

這個 function 的意義是一杯有可樂的 D 套餐，
已經和方才 function 的定義已經不一樣了，
有了這個 function，剩下只要決定套餐是什麼就好了。

可以觀察到原本的 function 拿到一個參數 後，回傳的是另一個 function。

意思就是說 D 套餐 決定了可樂後，
成為了另一種意義上的新套餐組合。

現在快計算出價錢了，只要再決定主餐就好了。

我盯著價目表，思考了一下，還是決定點漢堡。

我們再做一次替換。

> (λ main . 65 + price(main))(hamburger)

然後可以得到，

> λ  . 65 + price(hamburger)

沒有參數的 λ 直接求值 (eval) ，所以是  65 + price(hamburger)
漢堡價錢是 69，price(hamburger) = 69 ，所以得到 134。

太好了，我的晚餐決定好了，付錢吧。

### 更多的 FP？

這種一步一步接近答案的思維，就是遞歸。這在 FP 中非常重要。

而我腦子動不快，所以沒辦法一次到位，所以會選擇這種方式。
C 的 function 一次到位，前提是你要把參數都決定好。

而 λ 的 function 如果參數不完全則會產生新的 function，可以慢慢等你~
這種讓 function 不滿足，打成一段一段，
分次分別傳回 function 的行為就叫 currying。

而 currying 過後函數算是一種 Higher Order Function，return function 的 function，
其實 Higher Order Function 不只如此，你也可以把 Function 當作參數傳進來。
最常見的例子可能是 Sorting 了，而這又是另一件事了。

總之，今天就是思維受到了亂流，被強迫用另一種方式點。
不過最後還是成功的點了餐。

歐，對了，雖說先點主餐和飲料，最後店員還是不小心把餐點到 E 去了。
照我的模式點的話，多好啊 （逃。

附上最近看到的 Lambda Calculus 教學：
   [http://zhuanlan.zhihu.com/p/30510749](http://zhuanlan.zhihu.com/p/30510749)
   翻譯腔很重，必要時對照原文。
   [http://liujiacai.net/blog/2014/10/12/lambda-calculus-introduction/](http://liujiacai.net/blog/2014/10/12/lambda-calculus-introduction/)
   這篇真的不錯，整個部落格看起來也很棒。
