---
title: COSCUP'19
date: 2019-08-14 06:12:46
categories:
---

<center>
先來排個議程，或許可以把心得/筆記直接寫在本文。
排的結果依舊是...
</center>

<!-- more -->

<br><br>

# 起手吐槽

依舊是滿滿 PL 加一點 Block Chain... 說好的 AI 呢？

# COSCUP DAY1

## 入場 開幕 & LINE Open Up
IB101 08:30 - 9:50 漢語

200 speaker, 2k participants.

Haskell Line API 等你開源 //

- [line-simple-beacon](https://github.com/line/line-simple-beacon)
- [line-liff-starter](https://github.com/line/line-liff-starter)
- [line-things-starter](https://github.com/line/line-things-starter), about IoT
- [line Armeria](https://github.com/line/armeria), help you to build line service quickly

## 給 Web 工程師的 Rust 上手指南
IB301 10:00 - 10:20 漢語

Rust 吉祥物 -- 螃蟹。
picked up by Mozilla.
想填補系統級編程空白而發展 Rust -- fast, safe, concurrent。

facebook libra - about currency, safty, transaction, wrote in Rust.
> 議員(Denver Riggleman): [Why Rust?](https://www.zhihu.com/question/330065739/answer/753859054)

- Yew framewrok (rs -> web asm)

- iter callback like Ruby
- type signature like Python

- mcaro 寫 HTML -- `html!{...}`
- side effect function with `!`
- last expression in function as return value, like Ruby


## 認識零知識證明
IB502 10:30 - 10:55 漢語

What is ZKPs 以阿里巴巴為例。

zk-SNARK
- zk - zero-knowledge
- S - Succinct
- N - Non-Interactive (consider network traffic)
- AR - Arguments (should be large to prevet bf attack)
- K - Knowledge

Alice has P(x)
Bob has secret point s
Alice cal P(s) for Bob

The S:

Homomorphic Hidings
- for most x, E(x) is hard to find x
- different outputs for differnent inputs
- E(x + y) can be computed for E(x) and E(y)

if x + y = 7
A publishes E(x), E(y)
B computes E(x + y) by E(x) and E(y)
B computes if E(x + y) == E(7)

KCA 規範對方的行為
- alpha-pair
  A have (a, b), (a, alpha \* a)
  B have (a', b') => (gama \* a', gama \* b' = gama \* alpha \* a = alpha \* a')

[補充](https://medium.com/taipei-ethereum-meetup/%E6%B7%B1%E5%85%A5%E7%9E%AD%E8%A7%A3-zk-snarks-7a0187f399f1)

QAD 問題轉換及簡化

The N:

CRS - public place for A to place things

- SNARKs
   - pros: proof size, verification time
- STARKs
   - pros: proof time
   - cons: proof size
- Bulletproofs（門羅幣使用）
   - cons: proof time, verification time


## EWASM VM - 次世代的 Ethereum Virtual Machine
IB502 11:30 - 11:55 漢語

EVM recap

- stack-based
- 256 bit stack items
- high level instructions
   - SSTORE, SLOAD
   - SHA3
   - CALL, CREATE contract
- too far away from actual machine architecture
- less language support (Vyper, Solidity)

How about wasm (web assembly)?

- has locals(~= reg or mem)
- only access top 3 items v.s. EVM's 16 (property here!!)
- support 32/64 bits
- No high level instructions

ewasm

- ewasm is subset of wasm
- not support floating point number
- **LIMITED** imports and exports (wasm section)
- inject byecode metering and has runtime metering

Ethereum Environment Interface

```
ewasm module <= EEI => blockchain
```

call some function by outer runtime environment

ewasm 透過 EEI 將一些 operation 交給外部的人

system contract

- compiled into **wasm bytecode**
- examples
   - Byzantium precompiles
      - sha256, rpiemd160
   - Sentinel (verification and metering)

Sentinel contract

ewasm bytecode  => Sentinel => deployed on chain

- before contract deployment
- reject non-ewasm bytecode (e.g. floating point)
- insert metering statements

EVM-C

開一個 EVM spec, 不同的 ethereum client 實作共用一個 Wasm VM

C => C langauge API

wasm engine

```
         ewasm bytecode
               |
               v
            (parse)
               |
               v
         ewasm module
               |
               v
          (validate)
               |
               v
     validated ewasm module
               |
               v
  (instantiate) e.g. aloc mem
               |
               v
            deploy
```

EVM issue

- storage model
- ewasm = EVM 1.0 mirrored in wasm
   - storage model is not compatible with rent

- performance
- ewasm(64) BN128mul not better than EVMone(256) becuase bit operation
   - solution: precompile

- price metering
- basic block count
- super block
- upper bound

speaker is from [buidl.secondstate.io](buidl.secondstate.io)

## 關於生命週期的一點事兒 (miss)
IB301 11:30 - 11:50 漢語

## Serverless Web Service in Rust (miss)
IB301 11:50 - 12:30 漢語

## 『基礎建設』 建置 Tor 的匿名 .onion 網站，並使用 Kubernetes 架構 (miss)
E2-102 12:05 - 12:35 漢語

## Functional, Declarative and Modular System Environment <br>with Nix and NixOS
IB503 13:20 - 13:50 漢語

GNU related Project [GNU Guix](https://en.wikipedia.org/wiki/GNU_Guix)

九月份 functional thursday 會有 Nix 相關主題。

speaker(@zetavg) touched the nixos from 35th chaos communication congress

[presentation](https://bit.ly/nix-2019)

Software Deployment Problems
> The purely functional software deployment model by Nix author

Nix:

- Nix is package manager
```
#purelyFunctional #immutable #declartive #lazy #garbageCollator
```

Nix Store:

- pkg should not depend on global system stuff
  ruby <- /usr/lib/libssl.so (x)
  ruby <- nix-libssl-pkg (v)

Nix Lang:

- produce derivation
- take package as variable in the Nix Lang
- there exists dependencies between the variables

Nix OS:

- pkg, kernel, config... are built by Nix
  whole system in the Nix Store

Nix Env:

- can switch generations after installation stages

Nix Shell:

- a nix tool for Developer

More:

- cachix: Nix binary cache(precompile binary)
- Hydra: nix build farm
- NixOps: declaratively deploy infrastructures

9/5 f4 at Mozilla 信義區辦公室
Nix Pills [https://nixos.org/nixos/nix-pills](https://nixos.org/nixos/nix-pills)


## Build a Minimalist Partially C99-compliant Compiler <br>for Real-world Targets (miss)
IB201 13:20 - 13:45 漢語

## Cuju - 虛擬機容錯功能實作
IB201 13:50 - 14:35 漢語

Too hard to take note.

[project page](https://cuju-ft.github.io/cuju-web/home.html)

效能等級和 VM Ware 差不多？！

## 用剖析表達文法 PEG 實作一套程式語言 parser
IB301 14:30 - 15:10 漢語

understanding computation: from simple machines to impossible programs
> pl parser, regex parser with treetop, which is a PEG parser

PEG, 2004, Bryan Ford - parsing Expression Grammars: A Recognition-Based Syntatic Foundation
> a replacement to chomsky language, by removing the ambiguity in grammer

the ambiguity is useful in modeling natural language, but not in precise and unambiguous programming language

basic rule:
- replace "|" in CFG with "/"

operators
- `""`
- `[]`
- `.`
- `(e1 e2 ..)`
- `e? e+ e*`
- `&e`
- `!e`
- `e1 e2`
- `e1/e2` note the priority, different from CFG

PEG dangling else
"if" COND "then" S1 "else" S2 / "if" COND "then" S1
> match the else first will solve the problem (CFG can't)


PEG is equivalent to Top Down programming language (TDPL)

PEG is not a lang but a parse impl spec.

PEG
> new, powerful than CFG, fast to parse small lang

## 用 Pandoc 撰寫學術文章
IB503 15:30 - 16:00 漢語

是中文流利的外國人呢。
清大語言所的博士候選人（
學過 Python, Haskell（？！

| | 文書處理器 | Latex |
|:--: | :--: | :--: |
| 上手 | 易 | 難 |
| 排版 | 易跑 | 專門 |
| 文件 | 短 | 長 |
| 模式 | 編寫編排 | 寫排分工 |

why open source?
- open format
   - easy to export, share
- fee, no license
- customization

> 文科:只有肥宅才會用 LATEX 吧！（戰起來！！
> 沒，其實本貓也是文組的（


以 markdown 取代 latex
- markdown is not program, formated text
- can be compiled
- source is human readable

markdown dialect:
- pandoc markdown
- commonmark
- github-flavoured markdown

what is PANDOC?
- 轉換神器
- 柏克萊哲學系教授 john macfalane 所創
- support latex, markdown
- pdf docx html
- reveal.js support ppt by markdown

YAML metadata blocks
參考文獻可使用 bib(la)tex
corss-referencing
inline latex

biblography with pandoc (by pandoc-citeproc filter)
cross-reference (by pandoc-crossref filter)

pros:
- open source
- raw text
- git
   - version control
   - collaboration
- bugless

cons:
- learning time consuming
- need latex sometimes
- command line interface

[https://pandoc.org/getting-started.html](https://pandoc.org/getting-started.html)
[https://pandocorg/MANUAL.html](https://pandocorg/MANUAL.html)

## 17 直播從 0 到 1 之狼人殺 & 5 years Rust & 回顧 (miss)
IB101 16:10 - 16:40 漢語

# COSCUP DAY2

因為昨天施工挖斷電纜，所以換場地。

## 本日摘要 & 自己玩量子電腦程式
IB101(TR313) 09:00 - 09:50 漢語

講者是第一屆總召（Google AI Quantum）。
現行計算稱為古典計算(classical computing)。

量子程式語言：IBM Qasm, M$ Qsharp

量子電腦應用場景：
- 量子模擬
   （氮固化，肥料製造用了世界 2% 電力，研究微生物為何消耗極少能量產生。）
- 優化
   求函數極低點，或許可用於計算能量消耗。
- 質因數分解
   "How to factor 2048 bits rsa integers in 8 hours using 2 million noisy Qubits"
   量子電腦破解 RSA 加密（古典電腦需要宇宙時間）

電子電腦需要 10mK（常溫 300K）環境下運作，所以需要放在冰箱。

現在發展的現況為幾十 Qbits。
Cirq -- Google Python framwork for Quantum computation

N Gate (Not Gate)
H Gate 薛丁格的貓

如果前面放進一個 H Gate = (00, 11)

the quantum parity problem
classical -> quantum
O(N) -> O(1)
輸入輸出前各 apply 一排 H gate，最後觀察最後結果。

transportation of 1 quantum bit
qbit A 由於觀測後會塌陷，所以要拿 qbit B 之前，先將 qbit C 與 qbit B 糾纏，
然後用 B 與 A 糾纏後，將其結果拿給 C 運算即可得到 A 當初的態。

Q: 能解什麼問題？對目前 framwork 的看法，需不需要開發新語言？
A: 解的問題還在發展，美國正在培養相關人才，需要大量相關人才。量子運算與古典運算是互補的。

> 重點是那個 H bit，模擬薛丁格的貓，他是一切算法的起手式。

## 懶惰鬼的函數式爬蟲
IB101(TR313) 10:00 - 10:50 漢語

- functional/Haskell
- blockchain/Tezos
- general json crawler

第三方服務共同特色
- 大多提供 JSON API

Tezos 三大特色：
- liquid proof-of-stack
動態決定驗證者/區塊創建者，由 token 持有者共同維護
- formal verification
保證系統安全性
- on chain government
由投票機制更改 protocol（第 999 和 2019 block 的 JSON 可能長得不一樣）

Backing Soda
A Haskell crawler for Tezos

> 講者：有實際寫過 DSL 或知道 DSL 的請舉手
> 我：寫 DSL（compiler or interpreter）太難了吧？！
>     我只有寫過 GPL（


Haskell 起手式：定義好資料結構
Formal program synthesis: deriving(Show, Read, Eq, ...)

平行化：
```haskell
main = a `par` b `pseq` print (a + b)
   where a = fib 42
         b = fac 42
```

crawler
- 存原始檔案
   - 不要相信第三方
   - 減少第三方壓力
   - 後續批次處理

```haskell
data TzBlock = TB { level :: Int }

class Crawler a where
   weed :: a
   nextStep :: a -> a

instance Crawler TzBlock where
   seed = TB 0
   nextStep tb = TB { level = level tb + 1 }
```

分析：JSON 對應 SQL 的 datatype

資料庫選擇：
- Haskell property
   - type strong and ADT
   - easy to provide universal data store interface
- lib
   - haskell-persistent
   - haskell-groundhog

General Database
- 可選擇
- 放棄特有功能：e.g. postgres array tyep
Specific Database
- 比較好的效率

## 加強 Android 隱私的工具和技巧 (miss)
IB201(TR309) 10:50 - 11:20 漢語

---
> 跑去吃飯，結果遇到在台大讀書的同學啊啊啊啊啊啊
---

## Instruction Scheduling in LLVM
IB306(TR412-2) 11:40 - 12:25 漢語

- instro to instruction scheduling
- LLVM scheduler
- pipeline modeling
- scheduler customization

instruction scheduling

as a means of optimization

```
load x5 x8 @a   // 3 cycle time
add x5 x5 x5    // 4th cycle time
load x6 x8 @b
mul x5 x5 x6
```
> build dependency graph and sort from root, acc time length from first inst
scheduling with reverse order (from large acc number to smallest)

instruction scheduling occuring on:
```
instruction selection (DAG)
           |
           | scheduleDAGSDNodes
           v
          M-I
           |
           | scheduleDAGMILive
           v
   registor allocation
           |
           | schedulePOSTRATDList
           v
          M-I
           |
           v
          ...
```

Data Dependency Graph
- output depedency (if inst depend on same reg, they can not swap)
- anti dependency
- boundary not participate scheduling

target description as a language to write pipeline

Customize Scheduling for Target
- define scheduling policy
   implement overrideSchedPolicy
- define scheduling strategy
   derive MachineSchedStrategy (GenericScheduler)
- add DAG mutations
   implement ScheduleDAGMutation::apply

reference:
- Engineering a Compiler（阿阿阿阿 這本我有啊）
- LLVM Developers' Meeting: "writing Great Machine Schedulers"

## 從 C++11 規格和 Template Meta-Programming 的角度<br>欣賞 Boost 對 atomic 和 memory order 的支援
E2-102(TR510) 12:40 - 13:10 漢語

what is memory order
- recorder
- out-of-order

compiler 會做 scheduling，所以 order 和 source code 可能會不一樣。
C++11 支援 memory order 可以給予開發者控制 order 的餘地。

- synchronization operations
在不同 thread 之間同步
- atomic operation

講者聲音有點小聲，然後講題於我有點陌生（

## 在 21 世紀做自動微分？你需要 Zygote.jl！
IB501(TR413-1) 13:10 - 14:00 漢語

Wengert list
- a list of expression/instruction
- transform the expression with derivative definintion

how automatic differentiation work
- get the Wengert List of the expression
- transform each instruction in the Wengert list
- apply chain rule

forward mode (適合 outputs >> inputs)
- dual number
reverse mode (適合 inputs >> outputs) (mostly DL situation)
- tracker


## 野生的 Meta Programming 出現了 (miss)
IB301(TR310-1) 14:20 - 15:00 漢語

## Julia 語言設計與 JIT 編譯器
IB501(TR413-1) 14:10 - 15:00 漢語

outline:
- type system
- mulitple dispatch
- generic program
- meta programming
- relection and introspection
- JIT compiler

```

                   Any
                    ^
                    |
                 subtype
                    |
                    |  
instance <-- is-a --+--typeof--> Datatype
                    |
                 subtype
                    |
                    v
                  Union {}


```
type system
- dynamic, similar to symbolic programming,
  but can get staic component by some signature
- set-theoretic type

mulitple dispatch
- 非獨有特色，其他語言也有
- like overloading in Cpp

generic programming
- parametric types and parametric method
- Similar to multiple dispatch with parametric polymorphism
- All types are first-class: can be dispatched and declared

meta programming
- macro
- generated function (julia 獨有)

```
@generated function foo(x)
    Core.println(x) # x as a type
    return :(x * x) # but return as a value(?)
end

> foo(5)
Int64
25

> foo("5")
String
"55"
```

Function(name) <> Method(type signature, related to impl)
so, there exist function table and method table

function => generic function consisted of many methods

JIT => lookup compiled method (method cache),
if not exists, it will do specialize, compilation

meta programming interface
- AST
   - access
   - modify
- Julia IR
   - access
   - modify
- LLVM IR
   - access
   - modify
- Machine code
   - access
   - modify(indirect)

julia 是 hackable 的 compiler，
可以抽換掉一些中間的 compilation procedure，
跟上次 flolac'18 講的 racket 黑魔法有點像。



[presentation](https://yuehhua.github.io/slides/julia-language-design-jit-compiler)


## High-Level GPU Programming with Julia
IB501(TR413-1) 15:10 - 16:00 漢語

for CUDA becuase the support for AMD is not enough

GPU for graphic drawing
- utilize the parallel structure
- lots of threads running at the same time

for GPU programming, most PL still inline cuda C

why julia
- high-lv PL with low-lv performance
- provide first class array impl
- good compiler design

pkgs:
- CUDAnative.jl
- CUDAdrv.jl
- CuArrays.jl
- GPUArrays.jl


## lighting talk & close
IB101(TR313) 16:05 - 17:05


