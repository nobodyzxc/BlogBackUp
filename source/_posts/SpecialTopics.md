---
title: My Special Topics on CS
date: 2018-08-02 17:54:19
categories: Thinking
tags:
- evm
- ethereum
- solidity
- static analysis
---

<center>

專題只剩下約半年，
開始定期寫紀錄以督促自己。

</center>

<!-- more -->

<br><br>

## (2018-10-01)

參加了 SOS 實驗室的 meeting，
簡述了一下之前看學長 code 的情形後，
就討論到要做 oyente 和實驗室工具的比較實驗。

之後花了好長的時間在討論 modifiable contract 的東西。
恩，其實蠻有趣的一個主題。
總之我的工作就是熟悉一下 oyente 這個工具吧。

## (2018-08-31)
教授建議我和學長見個面，
學長回信了，
開始約時間。

---

## (2018-08-29)
跟教授見了個面，
Prof: 你有什麼問題？
Me: 學長的 blalalala，怎麼會這樣呢？
Prof: 我怎麼會知道，你怎麼沒寫信問學長？
Me: 我覺得應該自己先了解
Prof: 別閉門造車，有些東西問問比較快
Me: 那我要做的（改進此工具）目標呢？也可以問嗎？
Prof: 可以，他也欠過我人情（喵喵喵？），趕快問。
Me: ....是，我應該寫信問
Prof: .....今天應該就可以寫了吧
Me: 好...
Me: ...就這樣？我可以走了？
Prof: 阿不然你還要問什麼？
Me: 好...（滾走
Prof: 我明天還要出國
Me: (逃

---

## (2018-08-25)
直接跟教授說沒進度 Orz
然後就拿到學長的 code 了（？）
開始讀 code 吧。

---

## (2018-08-15)
重新回顧了一下黃皮書 CALL 的部份，
然後對照了一下學長的演算法，
感覺上要實作出呼叫外部合約部份的分析，
需要的就是從 stack 取出合約的 address，
然後去 etherscan 把 contract code 爬下來，
對 call 的合約再做一次靜態分析，
不過由於是調用函數，所以由黃皮書來看，
此合約分析的參數可以從 Memory 取得。

學長之前跟我說這部份還不能做處理，
詳情可能要等學長 code 整理好，
才能進一步了解困難點在哪裡。

---

## (2018-08-08)

寫信給教授，說下週進度為看合約 call 外部合約的部份。

## (2018-08-05)

> 關於 process 在 bytecode 的進入點，要再[研究一下](https://ethereum.stackexchange.com/questions/7602/how-does-the-evm-find-the-entry-of-a-called-function)。

1. [How does the EVM find the entry of a called function?](https://ethereum.stackexchange.com/questions/7602/how-does-the-evm-find-the-entry-of-a-called-function)
   大意是說 EVM 不用找是哪一個 function call，
   **EVM 只要乖乖照著 compile 出來的 contract code 跑就好。**
   要跑哪一個 function，使用者會透過 msg call，使用 [ABI](https://ethereum.stackexchange.com/questions/234/what-is-an-abi-and-why-is-it-needed-to-interact-with-contracts)，
   而編譯器會將 contract code compile 成符合 ABI 的格式，
   一開始有個 goto，看 msg call 要 goto 到哪一個 function 執行。

2. [When does the fallback function get called?](https://ethereum.stackexchange.com/questions/12106/when-does-the-fallback-function-get-called)
   這篇對 solidity 的 fallback function 做更進一步的解說。
   除了你寫的 function，solidity compiler 會幫你生一段 fallback function，如果 handle ABI call 了奇怪的東東(不存在的 function 之類的 hash 之類的)，就會跑到這段來。這段 fallback function 還可以 disable 掉，換成 [STOP/INVALID OPCODE](https://ethereum.stackexchange.com/questions/13502/difference-between-stop-and-invalid-opcode) 或者拋成 Exception 之類比較簡單的東東的，具體的 fallback 實作就看 solidity 怎麼寫囉。

- [ABI spec](https://github.com/ethereum/wiki/wiki/Ethereum-Contract-ABI)，語言的 ABI 都是參考這份 spec 各自定的，不屬於 eth core protocol 的一部分。msg call < ABI > contract，語言本身要依照自己的 semantic 和 EVM bytecode 的 semantic 去訂定 ABI。
   
## (2018-08-04)

寄了信給學長，詢問了接續研究的意願及相關資料的提供。

## (2018-08-02)

目前暫定是會繼續學長做的方向，關於 smart contract 的 static analysis.

需要注意的方向，由於 contract 是 interative 的，和一般程式不太一樣。
關於 process 在 bytecode 的進入點，要再[研究一下](https://ethereum.stackexchange.com/questions/7602/how-does-the-evm-find-the-entry-of-a-called-function)。

而在 gas 估算方面，要與實際情況做比較，
要做出統計，True/False positive，之類的要做出來。

