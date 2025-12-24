---
title: about me
date: 2019-07-08 02:35:21
---

## Property

Tags:
- Vimer
- Archer

一個習慣在矛盾中前進的人，
在理解與懷疑之間反覆校準自己的位置。

對自我要求高，也因此常在自信與懷疑之間來回擺盪。
對事情容易投入，但對人心的理解相對遲鈍。

在理解他人觀點後，
仍會保留屬於自己的判斷結構。
行為上具備調整彈性，但內在判斷並不輕易收斂。

待人不算熱絡，但並非冷漠；
更接近慢熱，或選擇性地靠近。

## Interest

### Programming languages & systems

大學後開始系統性接觸程式設計，逐漸把重心放在
「語言如何承載抽象與思考」這件事上。

我對程式語言原理、抽象機制與工具設計特別感興趣，
曾接觸過形式化驗證的入門概念，目前正往編譯原理與相關工具鏈延伸，
並以實作導向持續累積經驗。

學習路徑偏向廣泛探索，
區塊鏈與機器學習皆有實作與理解基礎，但仍以系統與語言相關議題為核心。

比起追逐熱門技術，
我更在意一個工具或系統背後的設計動機與長期價值。

### Music

長時間接觸樂器演奏，
卻始終覺得自己停留在直覺與模仿的層次，談不上成熟。

正因如此，才開始回頭補樂理，
嘗試從吉他與 Jazz 的脈絡切入，
理解和聲、進行與語彙背後的結構，
希望讓「會彈」逐漸轉化為「知道自己在彈什麼」。

### Cycling

公路車之於我，更像是生活的另一個出口。

透過長距離騎乘與旅行，
讓時間重新被身體感知，
也讓記憶在汗水與風景中變得清晰。

我習慣以紀錄的方式騎車，
用攝影留下畫面，讓片段得以停留。
關注器材與賽事，多半出於理解與欣賞，
而非性能實測或追逐配置。（好玩就好 XD）

## Objective

希望成為一個能夠將複雜問題拆解並清楚表達的人，
在面對新領域或新工具時，能快速建立理解框架並投入實作。

偏好從零開始理解系統，
若現成工具不足，會傾向自行補齊或重構。

在學習與創作上，
持續練習讓語言與文字更精確、結構更乾淨，
追求小而穩定、可長期使用的解法。

對於工具與知識，
特別重視其長期不變的核心原則，
例如 Vim 這類能隨時間累積價值的工具。

> 以不變應萬變

清楚知道自身在性格與溝通上的限制，
並持續在實作與經驗中修正。

## Skill

※ 幾年前的技能圖，請自行降噪閱讀。

目前在編譯器領域混口飯吃，
路線從 ASIC 到 GPU，一路踩坑至今。

> I’m leaving this here as a snapshot of an earlier version of myself.

> Interpret it with a grain of salt.

<div id="chart" style="width:100%;height:100%;">
<script type="module">

// Load the Observable runtime and inspector.
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@4/dist/runtime.js";

// Your notebook, compiled as an ES module.
import notebook from "/files/skill-img.js";

// Load the notebook, observing its cells with a default Inspector
// that simply renders the value of each cell into the provided DOM node.
new Runtime().module(notebook, name => {
  if (name === "chart") {
    return new Inspector(document.querySelector("#chart"));
  }
});

</script>

---

> Uncalculable life, not incalculable.
> I mean that the life is impossible to calculate.
