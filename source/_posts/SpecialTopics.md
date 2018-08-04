---
title: My Special Topics on CS
date: 2018-08-02 17:54:19
categories: Thinking
tags:
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

## (2018-08-05)

> 關於 process 在 bytecode 的進入點，要再[研究一下](https://ethereum.stackexchange.com/questions/7602/how-does-the-evm-find-the-entry-of-a-called-function)。

1. [How does the EVM find the entry of a called function?](https://ethereum.stackexchange.com/questions/7602/how-does-the-evm-find-the-entry-of-a-called-function)
   大意是說 EVM 不用找是哪一個 Function Call，
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
