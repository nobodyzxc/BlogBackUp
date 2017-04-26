---
title: JavaScript-Note
date: 2017-03-25 19:57:50
tags:
---

<center>
該改變一下心態了，面對 JavaScript 的心態。
以前都僅僅將他當做寫動畫的語言，
但上了 PL 後，教授說他是包著 C 皮的 Lisp 後，便覺得該改觀了。
從 FP 的角度下去看，它似乎更有趣了。
其實漸漸地也發現 JavaScript 應用也多了起來，
好比有人寫其他語言 interpreter，在後端的 node 很強大等等。難怪 GitHub 這麼多人用。
其實它也提供了一個很好的 GUI 環境，如此便不用再折騰 GUI 的庫。
</center>

<!-- more -->

## Basic JavaScript

### Basic
動態語言，一切函數及資料型態都只是個 name binding，骨子裡真的是 Lisp。
但是變數還是需要宣告，使用 `var`此關鍵字。
弱型態，所以有張神奇的相加表。

### Functions

##### some functions for browser o node.js
|Function    |Prototype                         | Note                                 |
|:-----------|:---------------------------------|:-------------------------------------|
|confirm     |(string)                          |跳出確認訊息                          |
|prompt      |(string)                          |要求輸入                              |
|console.log |(...)                             |output to console                     |

#### define your own function
方法不只一種
```
var myfn = function(param){}

function myfun(param){}

// or just a lambda

function (param){  }
```
基本上區域和全域變數是用 `var` 關鍵字區分的，如果沒有 var 它會往上一層找。

### Control Flow N Loop
跟 C 系差不多，注意一下關鍵字用 `var` 就好。
值得一提的是迭代器。
```
var myobj = {
    myFunc : function(){ console.log('hello world'); } ,
    myVar : 'just a var'
};
for(var i in myObj){
    console.log(i);        // 迭代出屬性名
    console.log(myobj[i[); // 取用 val
}

// 所以迭代 Array 時
var ary = [1 , 2 , 3 , 4];

for(var i in ary){
    console.log(i);        // index
    console.log(ary[i]);   // the val of index i in ary
}

```

### Array N Object
Array 和 Python 一樣，是用 `[]` ， 不用 push，直接取用 index。
而 `{}` 是 Object，Object 的成員變數可以在宣告一個空物件後綁定。
可以用 `.` 來取用 Object member，也可以用 `[name]`，
混淆了 Python Map 和 Object 的界線。

```JavaScript
var myObj = {};

// var myObj = new Object(); // not preferrable

myObj.func = function(){ console.log('hello world'); };
myObj.myVar = 'just a var';

// Or
var myVar = {
    func : function(param){ this.myVar = param ; console.log(this.myVar); } ,
    // use this to point to itself
    myVar : 'just a var'
};

```

### OOP
寫個物件來記最快。
```javascript
// 建立物件可以寫 function （建構子） , 或寫 class
function Animal(age){
    this.age = age;
}

function Person(age , name){

    this.age = age;
    this.name = name;

    // static say = function (word) { console.log(word); }; , not allowed.
    // static should in class syntax !

    this.getOlder = function () { this.age += 1; };

    var wish = 'become someboey'; // private
    this.sayWish = function (){ console.log(wish); };
    var sleep = function () { /* just sleep */ };     // private method
}

Person.prototype = Animal.prototype; // inheritance
//Person.prototype = new Animal();     // also
//Person.prototype = Object.create(Animal.prototype); // most correct ? wtf
// 到底是哪一種，好像都可以...


var nobodyzxc = new Person(20 , "zxc");
console.log(nobodyzxc.age);
nobodyzxc.getOlder();

nobodyzxc.hasOwnProperty('say');     // build-in func to check if have this property
console.log(typeof(nobodyzxc.age)); // see what type of wish

Person.prototype.sayAge = function () { console.log("I'm " , this.age); };
// add a new property to class Person
nobodyzxc.sayAge();

```


## jQuery Library

### How we Start
```javascript
$(document).ready(function(){
    // jQuery magic
});
```
### Selector


### Functions & Event
|Function    |Prototype                         | Note                                 |
|:-----------|:---------------------------------|:-------------------------------------|
|addClass    |('classname')                     | 為選取的 DOM 物件加入 class|
|removeClass |('classname')                     | 為選取的 DOM 物件移除 class|
|css         |('attrname' , 'attrval')          | 對該 DOM 之 css 做操作|
|animate     |( properties [, duration ] [...] )| `$('div').animate(`<br>`{top:'+=10px'},500);`|
|effect      |('wow-effectname' [, ...])        | blackbox , wait to study , <br>wow = { 'expolde' , 'bounce' , 'slide' }|
|selectable  |()                                | prepare a css class <br>`.ui-selected` for it|
|sortable    |()                                | sort lists|
|accordion   |()                                | id 配好 (ex: menu) , 接下來 div:h3,p 擺好，產生 UI|

### Events
|Event           |Prototype                          | Note                                  |
|:---------------|:----------------------------------|:--------------------------------------|
|on              | ('event' , 'selector' , function) | 適用於檔案 load 之初尚未創建之 element|
|click           | (function)                        | 物件被點擊之事件|
|dblclick        | (function)                        | 物件被雙擊之事件|
|hover           | (function , function)             | (hoverIn , hoverOut) <br>滑鼠經過該物件之事件|
|focus           | (function)                        | 物件取得焦點 |
|keydown         | (function)                        | 鍵盤被敲擊之事件|

### 即將入 ReactJS 的坑
