---
title: COSCUP'19
date: 2019-08-14 06:12:46
categories:
---

<center>
先來排個議程，或許可以把心得直接寫在本文。
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
想填補系統級編成空白而發展 Rust -- fast, safe, concurrent。

facebook libra - about currency, safty, transaction, wrote in Rust. 議員上 GitHub 軼事。

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

### S
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

### N
CRS - public place for A to place things
tonix

- SNARKs
   - pros: proof size, verification time
- STARKs
   - pros: proof time
   - cons: proof size
- Bulletproofs（門羅幣使用)
   - cons: proof time, verification time


## EWASM VM - 次世代的 Ethereum Virtual Machine
IB502 11:30 - 11:55 漢語

### EVM recap
- stack-based
- 256 bit stack items
- high level instructions
   - SSTORE, SLOAD
   - SHA3
   - CALL, CREATE contract
- too far away from acuatl machine architecture
- less language support (Vyper, Solidity)

### How about wasm (web assembly)?
- has locals(~= reg or mem)
- only access top 3 items v.s. EVM's 16 (property here!!)
- support 32/64 bits
- No high level instructions

### ewasm
- ewasm is subset of wasm
- not support floating point number
- **LIMITED** imports and exports (wasm section)
- inject byecode metering and has runtime metering

### Ethereum Environment Interface

```
ewasm module <= EEI => blockchain
```

call some function by outer runtime environment

ewasm 透過 EEI 將一些 operation 交給外部的人

### system contract

- compiled into **wasm bytecode**
- examples
   - Byzantium precompiles
      - sha256, rpiemd160
   - Sentinel (verification and metering)

### Sentinel contract

ewasm bytecode  => Sentinel => deployed on chain

- before contract deployment
- reject non-ewasm bytecode (e.g. floating point)
- insert metering statements

### EVM-C

開一個 EVM spec, 不同的 ethereum client 實作共用一個 Wasm VM

C => C langauge API

### wasm engine

ewasm bytecode
=> parse =>
ewasm module
=> validate =>
validated ewasm module
=> instantiate (e.g. aloc mem) =>
deploy

### EVM issue
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

## Persistent, Isolated and Declarative System Environment with Nix and NixOS
IB503 13:20 - 13:50 漢語

GNU related Project [GNU Guix](https://en.wikipedia.org/wiki/GNU_Guix)

九月份 functional thursday 會有 Nix 相關主題。

speaker(@zetavg) touched the nixos from 35th chaos communication congress

[presentation](https://bit.ly/nix-2019)

Software Deployment Problems
> The purely functional software deployment model by Nix author

### Nix

Nix is package manager
```
#purelyFunctional #immutable #declartive #lazy #garbageCollator
```

### Nix Store

pkg should not depend on global system stuff
ruby <- /usr/lib/libssl.so (x)
ruby <- nix-libssl-pkg (v)

### Nix Lang

produce derivation
take package as variable in the Nix Lang
there exists dependencies between the variables

### Nix OS

pkg, kernel, config... are built by Nix
whole system in the Nix Store

### Nix Env

can switch generations after installation stages

### Nix Shell

a nix tool for Developer

### More

cachix: Nix binary cache(precompile binary)
Hydra: nix build farm
NixOps: declaratively deploy infrastructures

9/5 f4 at Mozilla 信義區辦公室
Nix Pills [https://nixos.org/nixos/nix-pills](https://nixos.org/nixos/nix-pills)


## Build a Minimalist Partially C99-compliant Compiler for Real-world Targets (miss)
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
- need latex somethins
- command line interface

[https://pandoc.org/getting-started.html](https://pandoc.org/getting-started.html)
[https://pandocorg/MANUAL.html](https://pandocorg/MANUAL.html)

## 17 直播從 0 到 1 之狼人殺 & 5 years Rust & 回顧 (miss)
IB101 16:10 - 16:40 漢語

# COSCUP DAY2

## 本日摘要 & 自己玩量子電腦程式
IB101 09:00 - 09:50 漢語

## 函數力爬蟲決定孩子未來區塊力
IB101 10:00 - 10:50 漢語

## 加強 Android 隱私的工具和技巧
IB201 10:50 - 11:20 漢語

## Instruction Scheduling in LLVM
IB306 11:40 - 12:25 漢語

## 從 C++11 規格和 Template Meta-Programming 的角度欣賞 Boost 對 atomic 和 memory order 的支援
E2-102 12:40 - 13:10 漢語

## 在 21 世紀做自動微分？你需要 Zygote.jl！
IB501 13:10 - 14:00 漢語

## 野生的 Meta Programming 出現了 (dup)
IB301 14:20 - 15:00 漢語

## Julia 語言設計與 JIT 編譯器 (dup)
IB501 14:10 - 15:00 漢語

## High-Level GPU Programming with Julia
IB501 15:10 - 16:00 英語

## lighting talk & close
IB101 16:05 - 17:05
