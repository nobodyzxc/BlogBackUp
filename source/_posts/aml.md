---
title: 玉山 NLP 應用挑戰賽
date: 2020-08-15 21:22:07
categories: Note
mathjax: true
---

<center>
暑假花了一點時間和同學做起來的 project，來場經驗分享吧！
</center>

<!-- more -->

<br><br>

學期末在 FB 上看到有人在人工智慧社團分享了這個比賽，感覺這個議題滿有趣的，剛好大學有修過一門 IR (Information Retrieval, 資訊檢索) 的課，他算是自然語言處理 (NLP) 的應用，所以也算剛好對 NLP 有一點點基本的認識，剛好手上有那時期末 project 做出來的 crawler 和 IR Model，我便拉著同學們一起入坑了。

所有的 code 都已經放在 [GitHub](https://github.com/BlackBoxOperator/GotchaTheNames) 上了，有興趣可以參考，
不過因為訓練資料是主辦單位提供，故不能釋出。
這部份可能要讀者自行爬取並標記。

接著就來介紹一下這個比賽吧！

## 競賽說明

> 以下說明來自 [玉山官網](https://tbrain.trendmicro.com.tw/Competitions/Details/11) 。

Gotcha！人人都可以是反洗錢大師！

洗錢是指將犯罪不法所得，以各種手段掩飾、隱匿而使犯罪所得在形式上合法化的行為。近年來因國際洗錢與資助恐怖活動事件頻傳，國內吸金、電信詐騙案件也層出不窮，使得政府與各產業皆致力於洗錢防制 (AML) 工作。

一般來說，顧客與金融機構往來時，銀行需即時確認顧客身份，透過自動化系統比對出顧客是否列於 AML 焦點人物名單中。若能透過 AI 的協助定期更新 AML 焦點人物名單，並搭配自動化比對，將可大幅降低銀行執行AML作業的人力與時間成本。

本次競賽將提供參賽者公開新聞資料連結與相對應的焦點人物名單，希望大家集思廣益，透過NLP演算法，精準找出 AML 相關新聞焦點人物，不僅能協助優化 AML 焦點人物名單的更新作業，更有機會獲得高額獎金！

| 項目     | 日期 |
| -------- | ----------------------- |
| 報名     | 06/01/2020 - 06/30/2020 |
| 測試賽   | 07/22/2020 |
| 正式賽   | 07/27/2020 - 07/30/2020 <br> 08/03/2020 - 08/06/2020 |
| 公布名次 | 08/12/2020 |
| 頒獎典禮 | 08/22/2020 |

簡單來說，這個比賽就是要判斷一篇文章是不是 AML 相關的新聞，
如果是的話，就要把裡面的焦點人物（通常是有犯罪事實的人物）抓出來，生成一個名單。

由於是學期末看到的比賽，比賽已經開始快一個月了，又因為學期末課業繁忙，估計學期結束才能開始。算一算 7/6 才可以開始做，距離測試賽估計只有兩個禮拜，之後離正式賽也只有一個禮拜可以調整模型。不過加上先前的經驗，我想大概夠了，一方面也不想佔用太多時間在比賽上，也就抱著玩玩的心態來嘗試一下、衝刺看看。

## 爬蟲 Crawling

有了先前的基礎，基本上只花了一個晚上就把資料都爬回來了。
爬蟲是相對容易，但是需要重複性勞動的工作，以下介紹我是怎麼爬新聞的。

### Basic crawling

新聞網站大部份是動態網頁，通常是由伺服器端從資料庫撈內文出來套在模板上，
然後回傳給 user，所以只要是同個網站的新聞，他們大多會遵照一定的排版。

#### pandas & the domains

第一步就先來看看有哪些網站的排版要抓，
我們先把主辦單位提供給我們的資料透過 pandas 讀進來，接著把所有 domain 讀出來。

```python
import re
import pandas as pd
from pprint import pprint
csv = pd.read_csv('tbrain_train_final_0610.csv')
webs = set(re.findall(r'(https?://)?([^/]+)', l)[0][1] for l in csv['hyperlink'])
pprint(webs)
```

可以得到這 39 個 domain：

```python
{'ccc.technews.tw',
 'domestic.judicial.gov.tw',
 'ec.ltn.com.tw',
 'ent.ltn.com.tw',
 'estate.ltn.com.tw',
 'finance.technews.tw',
 'hk.on.cc',
 'house.ettoday.net',
 'm.ctee.com.tw',
 'm.ltn.com.tw',
 'money.udn.com',
 'mops.twse.com.tw',
 'news.cnyes.com',
 'news.ebc.net.tw',
 'news.ltn.com.tw',
 'news.mingpao.com',
 'news.tvbs.com.tw',
 'ol.mingpao.com',
 'sina.com.hk',
 'technews.tw',
 'tw.news.yahoo.com',
 'udn.com',
 'www.bnext.com.tw',
 'www.businesstoday.com.tw',
 'www.chinatimes.com',
 'www.cna.com.tw',
 'www.coolloud.org.tw',
 'www.cw.com.tw',
 'www.ettoday.net',
 'www.fsc.gov.tw',
 'www.hbrtaiwan.com',
 'www.hk01.com',
 'www.managertoday.com.tw',
 'www.mirrormedia.mg',
 'www.nextmag.com.tw',
 'www.nownews.com',
 'www.setn.com',
 'www.storm.mg',
 'www.wealth.com.tw'}
```

#### beautiful soup 4 & the selector

有了 domain 之後就是重複性的工作了。
從各個 domain 中各挑一篇新聞出來查看他的內文位置，然後寫好 selector 用 bs4 抓出來。

舉個例子：http://finance.technews.tw/2019/09/06/palo-alto-networks-intends-to-acquire-zingbox/

按下 f12 後可以看到，此網頁的 article tag 可以涵蓋所有內文，
之後我再把他 p tag 的內容抓出來就好。


![](https://i.imgur.com/2Jibg8j.png)

把 39 個 domain 抓出來大概長這樣：
```python
fetch_table = {
        # previous
        'www.chinatimes.com':          ['div', {'class': 'article-body'}],
        'news.tvbs.com.tw':            ['div', {'id':'news_detail_div'}],
        'home.appledaily.com.tw':      ['div', {'class': 'ncbox_cont'}],

        # current
        'news.cnyes.com':              ['div', {'itemprop': 'articleBody'}],
        'www.mirrormedia.mg':          ['article', {}],
        'domestic.judicial.gov.tw':    ['pre', {}],
        'www.coolloud.org.tw':         ['div', {'class':'field-items'}],
        'm.ctee.com.tw':               ['div', {'class': 'entry-main'}],
        'mops.twse.com.tw':            ['div', {'id': 'zoom'}],
        'www.hk01.com':                ['article', {}],
        'www.wealth.com.tw':           ['div', {'class': 'entry-main'}],
        'news.ebc.net.tw':             ['div', {'class': 'fncnews-content'}],
        'news.mingpao.com':            ['article', {}],
        'www.bnext.com.tw':            ['div', {'class': 'content'}],
        'news.ltn.com.tw':             ['div', {'itemprop': 'articleBody'}],
        'finance.technews.tw':         ['article', {}],
        'www.fsc.gov.tw':              ['div', {'id': 'maincontent'}],
        'www.cw.com.tw':               ['article', {}],
        'www.businesstoday.com.tw':    ['div', {'class': 'article'}],
        'sina.com.hk':                 ['section', {'id': 'content'}],
        'www.ettoday.net':             ['article', {}],
        'hk.on.cc':                    ['div', {'class': 'breakingNewsContent'}],
        'technews.tw':                 ['div', {'class': 'content'}],
        'money.udn.com':               ['div', {'id': 'article_body'}],
        'udn.com':
        ['div',                        {'class': 'article-content__paragraph'}],
        'tw.news.yahoo.com':           ['article', {}],
        'www.setn.com':                ['article', {}],
        'www.managertoday.com.tw':     ['body', {}],
        'www.cna.com.tw':              ['article', {}],
        'estate.ltn.com.tw':           ['div', {'itemprop': 'articleBody'}],
        'm.ltn.com.tw':                ['div', {'itemprop': 'articleBody'}],
        'ccc.technews.tw':             ['article', {}],
        'www.hbrtaiwan.com':           ['div', {'class': 'article'}],
        'ec.ltn.com.tw':               ['p', {}],
        'www.nownews.com':             ['div', {'class': 'newsContainer'}],
        'ol.mingpao.com':              ['div', {'class': 'article_wrap'}],
        'tw.nextmgz.com':              ['article', {}],
        'www.nextmag.com.tw':          ['article', {}],
        'ent.ltn.com.tw':              ['div', {'class': 'text'}],
        'www.storm.mg':                ['article', {}],
        'house.ettoday.net':           ['article', {}],
        }

def find_article_args_by(url):
    for domain in fetch_table:
        if domain in url:
            tag, attr = fetch_table[domain]
            return { 'name': tag, 'attrs': attr }
    print("cannot find domain pattern in", url)
```

以下使用 bs4 搭配上面我們抓到的資料，進行單篇資料爬取（要將上面的 code 加到下面的 code）

其實在實際狀況有滿多特殊例外需要處理，比如網站沒有回應，需要重新 get，
或者一些 general case (比如只取 p tag) 不適用，就要另外再撰寫規則。

```python
import re
import requests as rq
from functools import reduce
from bs4 import BeautifulSoup

add = lambda a, b: a + b
resc = lambda s: s.replace("\r", '').replace("", "").replace("\n", "")

url = 'http://finance.technews.tw/2019/12/22/tkec-road-to-reform/'
html = rq.get(url, timeout = 10).text
soup = BeautifulSoup(html, "html.parser")
articles = soup.findAll(**find_article_args_by(url))
paragraphs = reduce(add, [a.findChildren("p") for a in articles])
paragraphs += reduce(add, [a.find_all(r'^h[1-6]$') for a in articles])
content = resc(' '.join([s for s in [p.get_text().strip() for p in paragraphs]]))
print(content)
```

抓到的文章為：
```
台灣 3C 通路龍頭燦坤，一個月之內，董事長、總經理、財務長、發言人接連離職，由老臣陳彥君迅速接任董座，他能否勵精圖治，成功改革老燦坤？  對所有零售通路、電商業而言，11 月是最忙碌的 1 個月，業者
無不打起精神為雙 11 備戰。但是，面對實體、虛擬通路競爭對手兩路夾殺的 3C 通路龍頭燦坤實業，似乎花更多力氣在打一場「內戰」。 先是上任不到 8 個月的總經理李佳峰在 11 月 18 日清晨「因個人規畫」辭
職，今年 5 月甫上任的發言人蔡依玲也同時離開；12 月 12 日，上任一年多的董事長何宗原，以及 2018 年底上任的財務長徐霄菀雙雙離職。一個月之間，上至董事長、下至發言人全面大搬風，燦坤一次折損 4 位專業經理人。 何宗原曾任台灣嬌生業務總監、中國嬌生消費品產品副總裁，2018 年在燦坤創辦人吳燦坤的妻子蔡淑惠引薦下，以專業經理人身分接下燦坤董事長。 何宗原延攬了曾在台灣萊雅、台灣寶僑家品財務部門任職的徐霄菀，以及小米前台灣總經理李佳峰進入燦坤。今年 9 月，燦坤轉投資事業金鑛咖啡、燦星旅遊因虧損擴大裁員，燦坤以何宗原、李佳峰兩人名義共同發布內部信，要「以二次創業的心態共同迎接挑戰」穩定軍心，兩人甚至在 9 月舉辦活動親自向品牌商介紹燦坤的轉型計畫，但隨著兩人先後離職，內部改革似乎戛然而止。 4 位專業經理人接連離去，所為哪樁？也許，財報透露了些許端倪。 燦坤今年前 3 季穩住 3C 通路
龍頭地位，但營收、獲利皆較 2018 年同期衰退，尤其稅後淨利更較 2018 年同期大減 27%；反觀 3C 通路老二全國電子，今年前 3 季營收卻逆勢成長 5%。因此，市場傳言何宗原離去的主因恐與「業績無起色」有關
。 不過，市場也有另外一派說法指出，何的離去可能與李佳峰有關；業界人士指出，李佳峰進入燦坤後的改革計畫獲得董事會授權，但在財務執行方面，卻未取得何宗原、徐霄菀支持，導致無資金奧援的李佳峰選擇掛冠求去，董事會頗為不滿。 但也有接近燦坤的人士指出，身兼燦坤、燦星網通及燦星旅遊董事長的何宗原，花了相當多心力在轉投資金鑛咖啡、燦坤集團旗下負責研發智慧家電的燦坤先端智能，似乎「很少時間花在燦坤」。 根據閩燦坤財報，先端智能 2018 年虧損達 1,216 萬人民幣，而金鑛咖啡將轉型成咖啡豆原物料供應商；燦星旅遊也持續關閉實體店面，顯然都是需要費心的事業體，這些都成了何宗原請辭導火線。 接近燦坤的人士也對記者表示，「燦星旅遊的問題尤其嚴重」，以線上旅遊產品起家，轉往實體店舖經營的燦星旅遊，自 2015 年起總共虧損 3.73 億元；從 2018 年何接任董事長以後，帳上現金從 2018 年第三季的 3.43 億
元到今年第三季只剩下 1 億元。 旅遊業者指出，燦星雖然試圖反攻實體店，但最後功敗垂成，其他旅行社逐漸走向精緻化路線經營時，燦星沒有追上這股潮流，該業者表示：「業界對他們的觀感，就是成本壓得非常
低，品質也不好。」 只是，就在眾人還未反應過來時，12 月 13 日，燦坤火速召開董事會，選出老臣陳彥君新任燦坤董事長。 陳彥君十多年前就在燦坤任職，曾任發言人、財務長、風控長及財務總經理，雖曾短暫到特力和樂擔任副董事長，最後又回到燦坤體系，擔任燦星網通、燦星旅遊董事長，頗受吳燦坤夫婦信任。 （作者：王子承；全文未完，完整內容請見《今周刊》） 科技新知，時時更新 30 天內走了 4 個高階經理人，燦坤改革之路恐遇逆風？ 高層求去，財報透端倪？ 延伸閱讀：
```

### Advenced crawling

#### wayback machine & the missing pages (404)

對於一些 404 的網頁，我們可以想辦法把他找回來，
比方說 wayback machine 就是一個不錯的選擇。

我是用別人寫好的這個 [waybackpack](https://github.com/jsvine/waybackpack)，也是 python 寫的小工具，
他只依賴 requests 這個額外的套件。

裝起來也很簡單：

```shell
pip install waybackpack
```

使用範例就大概是這樣：
```shell
waybackpack -d wayback https://udn.com/news/story/7321/3845624
```

`-d` 是資料夾，他會自動創一個你指定名字的資料夾，然後把資料存進去。

```
waybackpack -d wayback https://udn.com/news/story/7321/3845624
waybackpack -d wayback https://udn.com/news/story/7321/3833161
```

```
$ tree -ifF wayback | grep -v '/$'

wayback
wayback/20190524225425/udn.com/news/story/7321/3833161
wayback/20190608120835/udn.com/news/story/7321/3845624
wayback/20190609133509/udn.com/news/story/7321/3845624
wayback/20190827225620/udn.com/news/story/7321/3845624

20 directories, 4 files
```

之後就是開個檔，然後一樣餵給剛剛寫的 crawler 即可。
（把 `requests.get(url)` 改成 `open(path)`，然後 `.text` 改 `.read()`）

如果連 wayback machine 都沒有，那就手動丟搜尋引擎吧！
或許有人轉載，還留著一些資料。

#### requests-html & the dynamic pages (ajax)

此次比賽給的網頁似乎沒有此種頁面，但這邊還是提一下。

有時候動態生成不是由伺服端做，而是在客戶端使用 ajax 請求內文，然後套進框架。
這時候就要使用瀏覽器 js 引擎去渲染，而在 python 就必須使用額外的工具來做。

例如自由時報娛樂版是採動態生成內文，
這部份可以使用 [requests-html](https://github.com/oldani/requests-html) 這個 library。

只用方法不難，只要照著他的 `README.md` 就可以了，在此就不贅述了。

## 模型雛型 Naive Model

根據要求，我們不難設想到這個模型大概可以分成兩個部份。

1. classifier 用來辨別是否為 AML 新聞。
2. extractor 用來提取目標人名。

以下就來介紹一下我們一開始是怎麼實作這兩個工具的。

### Document Classification

要把文件分兩類，首先就必須想到何謂分類。
一般來說，分到同一類的東西，他們彼此的相似度會比較高，
所以應用這個概念，我們只要能算出文章的相似度就可以達到分類的目標。

那該怎麼判斷兩篇文章的相似度呢？

我們先來探討一下詞和文章的關係。

那考慮把所有新聞出現過的詞想做一個集合，或者把他想成一個向量的形式。

比如這裡有三句話，我們把他當成三篇文章，為一個 corpus，並且已經做好斷詞。

1. 太平洋/有/颱風/生成/，/請/民眾/關注/天氣/，/嚴防/大雨/。
2. 天氣/預報/：/氣流/影響/，/天氣/仍舊/不穩/，/留意/瞬間/大雨/。
3. 台灣/座落/於/西/太平洋/。

斷詞在實做上我們是使用 [jieba](https://github.com/fxsjy/jieba) 的 `search_mode`。

```python
import jieba
text = '台灣座落於西太平洋。'

print(jieba.lcut_for_search(text))       # 搜尋引擎模式
# ['台灣', '座落', '於', '太平', '太平洋', '西太平洋', '。']

print(jieba.lcut(text, cut_all = True))  # 全模式
# ['台', '灣', '座落', '於', '西太平洋', '太平', '太平洋', '', '']

print(jieba.lcut(text, cut_all = False)) # 精確模式（如沒指定 cut_all 則為默認）
# ['台灣', '座落', '於', '西太平洋', '。']
```

把停用詞 (stopword) 等一些常用的詞去掉，例如 `請`，`於`, `仍舊`, `瞬間` 一類的詞，所有詞可以表示成一個 vector。

```python
[太平洋, 颱風, 生成, 民眾, 關注, 天氣, 嚴防, 大雨, 預報, 氣流, 影響, 不穩, 留意, 台灣, 座落]
```

不難想到，一個詞如果在一篇文章中出現多次，那這個詞和這篇文章的關聯度就會越高，這個就是 TF (term frequency) 的概念，一般可以簡單計算為 `該詞出現在該文章的次數`。一篇文章的 TF vector 可以當成一種特徵值。以下為三篇文章的 TF vector。

```python
[太平洋, 颱風, 生成, 民眾, 關注, 天氣, 嚴防, 大雨, 預報, 氣流, 影響, 不穩, 留意, 台灣, 座落]
[  1,     1,   1,    1,    1,   1,   1,   1,   0,   0,    0,   0,   0,   0,    0]
[  0,     0,   0,    0,    0,   2,   0,   1,   1,   1,    1,   1,   1,   0,    0]
[  1,     0,   0,    0,    0,   0,   0,   0,   0,   0,    0,   0,   0,   1,    1]
```

用 TF 的直覺大概就是如果兩篇文章擁有相同的詞越多，那相似度可能就越高。

我們可以用 cosine similarity 來計算三篇文章的相似度：

$$\cos (t,e)= {t e \over \|t\| \| e\|} = \frac{ \sum_{i=1}^{n}{t_i e_i} }{ \sqrt{\sum_{i=1}^{n}{(t_i)^2} } \sqrt{\sum_{i=1}^{n}{(e_i)^2} } }$$

```python
from sklearn.metrics.pairwise import cosine_similarity
vec_a = [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0]
vec_b = [0, 0, 0, 0, 0, 2, 0, 1, 1, 1, 1, 1, 1, 0, 0]
vec_c = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1]
print(cosine_similarity([vec_a, vec_b, vec_c], [vec_a, vec_b, vec_c]))
```

```python
# a          b          c
[[1.         0.3354102  0.20412415]  # a
 [0.3354102  1.         0.        ]  # b
 [0.20412415 0.         1.        ]] # c
```

而更進一步考慮，一個詞他在只出現在某幾篇新聞中（比如 "洗錢"）和一個詞幾乎每篇都有（比如 "記者"），那前者的重要性和獨特性應該會比後者高。這就是 IDF（inverse document frequency，逆向文件頻率）的概念，一般可以簡單計算為 `出現該詞的文章數 / 所有的文章數目`。

```python
[太平洋, 颱風, 生成, 民眾, 關注, 天氣, 嚴防, 大雨, 預報, 氣流, 影響, 不穩, 留意, 台灣, 座落]
[2/3,   1/3, 1/3,  1/3, 1/3, 2/3,  1/3, 2/3, 1/3, 1/3,  1/3, 1/3, 1/3, 1/3,  1/3]
```

IDF 可以表達出一個詞的特徵值，我們把他與 TF 相乘，便可得到更有意義的特徵值。

```python
[太平洋, 颱風, 生成, 民眾, 關注, 天氣, 嚴防, 大雨, 預報, 氣流, 影響, 不穩, 留意, 台灣, 座落]
[  2/3, 1/3, 1/3,  1/3, 1/3, 2/3, 1/3,  2/3,   0,    0,   0,   0,   0,   0,    0]
[    0,   0,   0,    0,   0, 4/3,   0,  2/3, 1/3,  1/3, 1/3, 1/3, 1/3,   0,    0]
[  2/3,   0,   0,    0,   0,   0,   0,    0,   0,    0,   0,   0,   0, 1/3,  1/3]
```

我們一樣計算 cosine similarity 可得：

```python
# a          b          c
[[1.         0.5820855  0.39605902]  # a
 [0.5820855  1.         0.        ]  # b
 [0.39605902 0.         1.        ]] # c
```

可以觀察到， sim(a, b) 比 sim(a, c) 又大一些了。
總體的相似度也又大些。


#### BM25 + w2v + IR model as classifier

IR model 大概就是以上面提到提到的概念，做出的一個搜尋引擎。
給定一段文字，他能幫你按照關聯度排序，把關聯度高的文章排到前面。

而我們之前所作的 model 使用的特徵值是 [bm25](https://kknews.cc/zh-tw/news/z2gkr4g.html)，加上 [word2vector](https://kknews.cc/zh-tw/code/nkjvlm2.html) (word2vector 是一種 word embedding 的實作，透過 unsupervised learning 產出，透過類神經網路，藉由鄰近詞算出一個詞的特徵值），最後再做個 Relevance Feedback (精準點來說，是 [盲式反饋](https://zh.wikipedia.org/wiki/%E5%85%B3%E8%81%94%E5%8F%8D%E9%A6%88) ) 來完成 IR 任務。

那如何用這個 model 當作 classifier 呢？
可以把主辦單位給的三百多篇 AML 新聞接起來，直接和要預測的文章算相似度，
這邊可能就要抓一個相似度的 threshold 來判斷是或不是。

或者我們採取了一個比較簡單的作法，直接利用 IR model，取前三百篇，看這三百篇裡面，主辦單位標記的 AML 文章 recall 是多少。一樣也要取個 threshold。這邊我們大概就用三百篇和其他非 AML 相關新聞的 recall 下去抓，其實已經有不錯的分類能力了，不過還是有些新聞，例如大樂透開獎會歸進 AML 新聞。

```
[ x   0 / 300 = 0.000000 score =   0.00 ] Query29: 【2019理財大事5】跌破...
[ x  11 / 300 = 0.036667 score =   5.58 ] Query30: 公開資訊觀測站...
[ v 223 / 300 = 0.743333 score = 195.94 ] Query31: 涉貪圖利 東檢聲押前台...
[ x   0 / 300 = 0.000000 score =   0.00 ] Query32: 昂山素姬明出席國際法 ...
[ x   0 / 300 = 0.000000 score =   0.00 ] Query33: 繼思想改造集中營之後 ...
[ x   0 / 300 = 0.000000 score =   0.00 ] Query34: 山頂纜車機件故障暫停 ...
[ v 251 / 300 = 0.836667 score = 215.47 ] Query35: 直銷妹誆「1年帶你住帝...
[ v 262 / 300 = 0.873333 score = 224.46 ] Query36: 潤寅詐貸案延燒 上市公...
[ v 206 / 300 = 0.686667 score = 179.18 ] Query37: 花蓮縣3議員涉收賄 貪 ...
[ x   0 / 300 = 0.000000 score =   0.00 ] Query38: 週三晚起東北季風增強 ...
[ x   0 / 300 = 0.000000 score =   0.00 ] Query39: 「灰天鵝」拉警報 | An...
[ x   1 / 300 = 0.003333 score =   0.61 ] Query40: 柯媽爆料：柯文哲絕對 ...
[ x   0 / 300 = 0.000000 score =   0.00 ] Query41: 媒體：特朗普涉嫌威脅 ...
[ x   0 / 300 = 0.000000 score =   0.00 ] Query42: 國銀海外投資豐收 8月O...
```

### Named Entity Recognition

人名提取是本次比賽的重點。
在 NLP 中 Named Entity Recognition 可以識別出特殊的名詞，例如人物、組織和地點等。

#### NN model (ckip) + rule based as extractor (NER)

而在去年九月，中研院的 ckip 開源了一套新的斷詞系統 [ckiptagger](https://github.com/ckiplab/ckiptagger)，與舊的不同處在於這一套是用深度學習的方法，利用 BiLSTM 訓練出來的模型。他一樣利用 pre-training 的 word embedding，然後搭配 BiLSTM 訓練出一套斷詞系統。而後透過斷詞出來的結果再加上詞向量訓練出詞性標注。

而最後最重要的 NER 也是由 BiLSTM 訓練而成，需要拿前面的詞向量 + 斷詞結果 + 詞性標注當作輸入。有了這一整套系統，我們就有基本的中文 NER 可以用了。這套斷詞系統相當精確，也有許多類別，地點、組織等都會標記出來，我們只要取用人物的部份即可。

不過人物的部份，他會連一些簡稱（張嫌、陳婦）都標記出來，
所以我們這邊會做一個簡單的 filter 去過濾這些結果。

ckiptagger 的版本需求：

- python>=3.6
- tensorflow>=1.13.1,<2 / tensorflow-gpu>=1.13.1,<2 (one of them)
- gdown (optional, for downloading model files from google drive)

記得要先載他 train 好的 model 才可以使用，
你可以用上面的 gdown 或者直接從載點下載，詳情請參照 [ckiptagger](https://github.com/ckiplab/ckiptagger)。

我們這邊使用的配置如下：
```python
ckiptagger==0.1.1
tensorflow-gpu==1.15
```

一個簡單的範例片段：
```python
from ckiptagger import WS, POS, NER
ckipt_data = 'ckip' # ckip pre-training path
doc = '重判12年又加保3億，法官怕中電前董周麗真逃亡。'
ws = WS(ckipt_data)
pos = POS(ckipt_data)
ner = NER(ckipt_data)
word_s = ws([doc],
            sentence_segmentation=True,
            segment_delimiter_set={
                '?', '？', '!', '！', '。',
                ',','，', ';', ':', '、'})
word_p = pos(word_s)
word_n = ner(word_s, word_p)
namelist = set([e[3] for e in word_n[0] if e[2] == 'PERSON'])

print(namelist) # {'周麗真'}
```

至此，一個不太精確的標記系統已經完成了，
此比賽模型也已經有了一個雛型。
接下來就講講如何把他接上 API，提供服務給外界使用。


## 服務建置 Service

主辦單位提供了 Azure 雲端給我們使用，
主要有用的東西除了一個 Ubuntu 可以使用外，還有 K80 的 GPU 及一個 IP。

不過原則上還是自己配的環境好用些。

### flask

主辦單位提供了一個簡易的 flask 模板給我們使用。
裡面有強調一點，回傳的 encoding 必須為 UTF-8，
只要在 `app.run` 前更改一下 flask 的 config 即可：
```python
app.config['JSON_AS_ASCII'] = False
```

API call 分作兩個部份 health check 和 inference，
health check 主要在確認 service availability，而 inference 主要是負責答案的判定。

health check:
```python
@app.route('/healthcheck', methods=['POST'])
def healthcheck():
    """ API for health check """
    data = request.get_json(force=True)
    print(data)
    t = datetime.datetime.now()
    ts = str(int(t.utcnow().timestamp()))
    server_uuid = generate_server_uuid(CAPTAIN_EMAIL+ts)
    server_timestamp = t.strftime("%Y-%m-%d %H:%M:%S")
    return jsonify({
       'esun_uuid': data['esun_uuid'],
       'server_uuid': server_uuid,
       'captain_email': CAPTAIN_EMAIL,
       'server_timestamp': server_timestamp
    })
```


inference:
```python
answer_cache = {}
@app.route('/inference', methods=['POST'])
def inference():
    """ API that return your model predictions when E.SUN calls this API """
    data = request.get_json(force=True)
    esun_timestamp = data['esun_timestamp'] #自行取用
    server_timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    ts = str(int(datetime.datetime.now().utcnow().timestamp()))
    server_uuid = generate_server_uuid(CAPTAIN_EMAIL+ts)

    answer_template = lambda ans: jsonify({
            'esun_timestamp': data['esun_timestamp'],
            'server_uuid': server_uuid,
            'answer': ans,
            'server_timestamp': server_timestamp,
            'esun_uuid': data['esun_uuid']
            })

    if data['esun_uuid'] in cache_answer:
        if cache_answer[data['esun_uuid']] != None:
            return answer_template(cache_answer[data['esun_uuid']])
        else:
            while cache_answer[data['esun_uuid']] == None:
                sleep(4)
            return answer_template(cache_answer[data['esun_uuid']])
    else:
        cache_answer[data['esun_uuid']] = None
        try:
            log(data['news'])
            answer = predict(data['news'])
            log(answer)
        except:
            log('model error')
            raise ValueError('Model error.')

        cache_answer[data['esun_uuid']] = answer

        return answer_template(answer)
```


從上面的 code 可以發現，我們在 inference 做了 cache，
原因是一個 inference 時間上限為五秒，逾時就會重新發 request 過來，次數上限為三次。

為了避免逾時而重複 inference，所以我們做了 cache。
不過 inference 通常滿快的，一兩秒內就可以算完了。

### static IP

Azure 不開放 80 和 443 以外的 port，所以原則上把服務開在其中一個 port 即可。

那如果手上有比較好的顯卡，覺得 K80 跑得太慢，但該電腦又沒有固定 IP 的話怎麼辦呢？

這時可以使用 ssh port forwarding 的功能，forwarding 分作兩種，正向代理和反向代理。正向代理是將伺服器端的 port forwarding 到我們的電腦上，所以我們可以把伺服器端的服務拿到我們客戶端的 port 來用。反過來想，今天我們是要把我們客戶端提供的服務放到伺服器上，所以用的是反向代理，假設我們把 flask 開在 8080 port 上，那只要 forwarding 到伺服器的 80 port 上，那外面的人只要用 http protocol 瀏覽伺服器的 IP 位置即可。

值得注意的一點是，`/etc/ssh/sshd_config` 裡面的 `AllowTcpForwarding` 必須是 `yes`，才可以 forwarding。
剛改完記得要重啟 ssh server。

```
systemctl restart sshd.service
```

然後因為 ssh 容易掉，我這邊使用 autossh 讓他自動重連就穩多了。

```
autossh -M 20000 -i ~/.ssh/id_rsa -NfR  :80:localhost:8080 user@azure
```

原則上有靜態 IP，有 ssh 的 server 都可以使用 forwading，
像這次比賽基本上都是由家中 NAS 提供服務。

### slack

前置作業都完成後，只要把 web hook 掛給官方提供的 slack bot 即可。之後比賽他就會去戳你給的 IP address 了。

![](https://i.imgur.com/0cjPF0C.png)

到這邊，已經可以開始拿做好的東西打一場比賽了。
接下來讓我們繼續把 model 調得更好！

## 基本模型 Basic Model

### Logistic Regression, SVM and XGBoost

前面提到的 classifier 作法相對簡單，而準確度有待加強。
直接拿所有 AML 文章相似度排名取 threshold 分類還是太粗糙。

這裡我們使用 sklearn 裡面一些比較正式一點的分類器，
用剛剛做出來的 bm25 + w2v feature 表示一篇文章拿來做分類。
詳細教學可以參考 [這篇文章](https://zhuanlan.zhihu.com/p/50657430)。

我們嘗試了三種分類器：LogisticRegression（羅吉斯回歸），SVC （SVM 分類器）還有 XGBoost。

```python
clf = LogisticRegression(C=1.0,solver='lbfgs',multi_class='multinomial')
clf.fit(xtrain_tfv, ytrain)
predictions = clf.predict_proba(xvalid_tfv)


clf = SVC(C=1.0, probability=True) # since we need probabilities
clf.fit(xtrain_svd_scl, ytrain)
predictions = clf.predict_proba(xvalid_svd_scl)


clf = xgb.XGBClassifier(max_depth=7, n_estimators=200, colsample_bytree=0.8,
                        subsample=0.8, nthread=10, learning_rate=0.1)
clf.fit(xtrain_tfv.tocsc(), ytrain)
predictions = clf.predict_proba(xvalid_tfv.tocsc())

```

這裡 classifier 的準確率來到了 88% 到 90% ，而大樂透類的新聞也被準確歸類了。

#### BM25 + XGBoost as classifier

經由測試，XGBoost 的效果是最好的，於是我們就把 classifier 換成 XGBoost。

#### NN model (ckip) + XGBoost + rule based as extractor (NER)

另外，因為比賽要求是要有 AML 犯罪相關事實的嫌疑人，所以原先採取的把所有人名都噴出來的作法或許可以再細緻化。這裡我們將一個人名前後五個 token 的 BM25 分數加起來丟給 XGBoost 去分類，接著再丟給一開始的 rule based 來優話我們的目標人名提取器。

### Neural Network

在資訊檢索的課程中，教授有提到 BERT 這個神器，但我們在之前的 project 並沒有嘗試。
相較於 IR Task 那種大量文本的處理，BERT 比較適合小文本的任務，
這次的比賽就是一個非常好的發揮空間，所以我們在此次比賽也開始了對 BERT 的初次嘗試。

因為先前傳統機器學習方法如 BM25, TF 之類的是用 one-hot encoding 的方法，存在特徵稀疏的問題，word embedding 相應而生。他將一個詞映射到一個低維稠密的語義空間，使相似詞可以共享上下文資訊，提升泛化能力。。深度學習在近幾年來快速發展，像是前面提到的 word2vector 還有後面開源的 ckip 斷詞工具都有利用到 word embedding。這類工具主要架構大多是用 unsupervised learning 訓練每一個詞的 word embedding，這其實就是在做一個特徵提取的動作，
接著再確定想要的任務，例如 ckip 的斷詞或是詞性標記、NER 等，使用先前訓練出來的 embedding 作為表達式，再做一次 supervised learning 讓他更加確定需要的上下文關係，來建立最終的 Model。

根據這種模式，近幾年來發展出了像是 ELMo、OpenAI 的 GPT、Google 的 BERT 及一堆他的變形、其他像是 CMU 的 XLNet 等。訓練 word embedding 從一開始的 RNN 到 LSTM 最後到 Attention，更多原理細節可以參考 [這一篇介紹](https://www.jishuwen.com/d/2M6u/zh-tw)。

我們在測試賽之前嘗試使用 BERT 建立一個新的 classifier，準確度有大幅的提昇。

#### NN model (BERT) as classifier

BERT 的使用也相當容易，python 有一個集 NLP 大成的套件庫叫做 `transformers`，
裡面不僅有 BERT， 也有 XLNet 等 model 。

要下載 BERT 的 pre-training 相當容易，只要把填好 pre-training 的名稱，
他跑下去發現沒有的話，就會自己去載了。

至於有哪些 pre-training，除了上網 Google 外，基本上可以來 [hugface 的網站](https://huggingface.co/models) 上面找，
因為此次是中文的比賽，所以我們使用了最基本款 `bert-base-chinese` 即可。

基本上 BERT 的使用細節都可以透過這篇 [教學文](https://leemeng.tw/attack_on_bert_transfer_learning_in_nlp.html) 學到，裡面也有範例程式碼，學習起來算是相當的容易。

BERT 提供了四大下游任務（就是四個 supervised 的 NN Model），我們可以根據我們的需求，
選用適合的任務模型來使用。關於更詳細的四大任務介紹可以參考這篇 [知乎專欄](https://zhuanlan.zhihu.com/p/102208639)

- BertForSequenceClassification：下圖的 (a) 和 (b)，只差在一個 `[SEP]`，可以用作分類。
- BertForMultipleChoice：根據問題，可以從多個選項中選擇一個最佳的答案。
- BertForQuestionAnswering：下圖 (c)，用作閱讀理解，可以根據問題標出文章中的答案。
- BertForTokenClassification：下圖 (d)，可以為每個 token 做分類，適用於 NER 任務等標記。

![BERT 四大任務](https://pic2.zhimg.com/80/v2-c101ddc3b2f4dbd3dc20999f900c71ba_720w.jpg)

根據需求，我們使用了 BertForSequenceClassification 做了對單個篇新聞的分類（AML & non-AML），但受限於 BERT 512 的 token size 限制，我們取了文章最後的 510 個 token 丟進 model 。

在 valid data 上的分類準確度從剛才的 90% 直接來到了 99% 。

一個比較基本可以用的 AML 犯罪名單提取系統已經差不多了。
時間也來到了測試賽。


> 測試賽開始：
> 測試賽僅僅提供測試 server 的穩定度，
> 並沒有提供題目正確答案和分數。

## 進階模型 Advenced Model

藉由 BERT，我們的 Model 來到了一個嶄新的境界，
想必剛剛各位也有留意到，BERT 也有提供 NER 的任務訓練，
而 ckip 的 NER 是用在廣泛用途的，那何不用 BERT 自己也 train 一個呢？

### Make our NER

根據主辦單位的標記資料，每一篇 AML 文章都有對應的人名集合。

要把資料輸進 BERT 做 NER 還需要把每個 token 做標記。
這邊我們根據 [IOB format](https://en.wikipedia.org/wiki/Inside%E2%80%93outside%E2%80%93beginning_(tagging))，只要把目標人名用 `B-PER`, `I-PER` 標起來即可。

首先我們先用 BERT 載入 `bert-base-chinese`，使用他的 tokenizer 為每篇 AML 新聞做 tokenization。

接著根據幫匹配的人名標上標記，其餘的標上 `O` 即可。

只要寫個小小的 script 轉換完資料，
接著使用 BertForTokenClassification 就可以開始愉快的 train NER 囉！

#### NN model (BERT) as extractor (NER)

蠻出乎意料之外的一點是，可能是僅僅標記 AML 目標人物的關係，
NER 出來的結果似乎就有了簡單的分類能力，可以避開一些非 AML 相關的人名。
所以我們使用 BERT NER 抓出來的結果就不丟進 XGBoost 做分類過濾了。

到這裡，基本的模型已經構建完畢，這就是我們進行正式賽的 Model。

> 正式賽分作兩週，共八天。
> 正式賽第一周開始：
> 我們在這週的排名第一天在第四，
> 之後又掉到了五和六。

### Extend The DataSet

#### Reuse The IR Model

第一周結束的假日，我們用之前的 IR model 將主辦單位標記的三百多篇 AML 新聞當作 query，檢索回相關新聞，並標記了一千五百篇 AML 相關新聞加入 corpus。

> 正式賽第二周開始：
> 我們成功爬回了四而隔天又掉回了五，
> 加入一千五百篇的資料似乎有一點提昇。
> 不過 model 似乎還要再加強一下，
> 所以我們決定嘗試其他的 Model。

### Try other NN Model

我們又嘗試了其他 Model，像是 XLNet, RoBERTa, Albert 等，
不過效果似乎並沒有很大的提昇，不知道是不是用法錯誤（比如 XLNet 的 Mask 是 `<sep>` 而不是 `[SEP]`），
只有 RoBERTa 在 classifier 的表現上的結果有好一些。

#### NN model (RoBERTa) as classifier

最後，經由測試，我們將前幾天的 query 當作 valid set，
RoBERTa 的準確度從 96% 上到 97%，RoBERTa 的 classifier 似乎有變好，
於是我們將 classifier 換成 RoBERTa。

> 由於主辦單位不小心把第七天的 query 送成前一天的，故第七天沒有列入計算。
> 可能是 RoBERTa 的表現加上 1500 的標記資料生效了，最後一天我們的成績跑進了第三名。
> 至此，整個賽程結束。
> 因為我本身的研究領域不是 NLP，加上時間因素，能有這樣的成績已經是相當幸運了。
> 三個禮拜衝刺也到了一段落了 :)

## 其他 Others

除了先前的嘗試，其實我們也有想到一些增強 model 的方法，
不過礙於時間關係，我們沒來得及做這些嘗試。

### evoluationary computation

我們在嘗試前面的 Model 時，有嘗試用演化計算來調整參數。
不過後來 Model 都轉移到 NN 上，我們在傳統機器學習方法上就沒再做更多嘗試了。
其實演化計算的應用很廣，或許可以應用在現在 Model 的參數微調上。

### other models

其實我們覺得我們 XLNet 以及其他 model 的使用可能不是很正確，所以效果才沒有上來。
礙於時間因素及現有其他 model 的網路資源較為缺乏，我們沒來得及做更多嘗試。

或許存在著更棒的 model 也說不定。


### improve the pre-training model

拿將新聞 corpus 繼續做 pre-training 的 unsupervised learning，
應該可以加強 pre-training domain specific 的能力，效果也可能因此提昇。

### expand the data

NER 的部份，也可以將一千五百篇的人名做標記，如此 NER 的效果可能會提昇一些。

### data augmentation

跟圖片一樣，NLP 的分類也可以使用 augmentation，這似乎也是一個研究的方向。

[一個中文數據增強的實現](https://github.com/zhanlaoban/EDA_NLP_for_Chinese)。
