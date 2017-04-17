---
title: PHP Note
date: 2017-03-26 04:01:35
categories: Note
---

<center>
這個世界上最好的語言，我學了很多次，但每次都是有需要才研究一下，感覺用完就生疏了，
在學完 OOP ，以及學了一些語言後，對這方面有些概觀，回來重新開始，
許多東西好像就合理了起來，但這次也只是複習基本語法罷了，期許能記得更牢。
</center>

<!-- more -->
## Basic
跟 Python 一樣是動態語言，所謂變數只是 name binding，
用法跟 Python 也一樣，要用之前先 assign 一個值。
變數前跟著一個 `$`，跟 Shell Script 不一樣的是 assign 的時候也要跟著 `$`。
但是學到 OO 的部分，事情有了些變化，const 的東西不用加 `$`，或許是不把它當變數看的緣故。
物件內的變數宣告，方法和 Python 蠻像的，但好像蠻強調 `public` 封裝。
子函數習慣上也是用 `$this` 來設定 member variable。
尚未探究子函數內是否有像 Cpp 用 scope 直接使用 member variable，但學到的是用 `$this`，
所以可以用的可能性不大。但子函式又不像 Python 會把 self 傳進去。
一般使用`.`作為字串 connect 的 operator，所以 object 呼叫底下的東西會用`->`。
object 底下的變數不用再加錢號。 ex: `$nobodyzxc->name` 而不是 `$nobodyzxc->$name`。
static 或 const 的東西可以用 `ClassName::Attr`呼叫，和 Cpp 一樣。

## Functions
簡單的 operator 略過。
PHP 想當然爾，對文本的操作應是相當強的，
但我也只學到 `strlen()` , `strpos()` , `str_replace()`，其他要用再查。
html 轉碼、正則等之前用過幾次用用也忘了。
自定義 function 寫法。
```php
function func_name($var){
    $rtn = blalala($var);
    return $rtn;
}
```

在函數裡宣告的變數基本上都是區域變數，如要用全域，加上`global`關鍵字。

## Control Flow
基本的東西，稍微記一下。
```php
if(exp){
}
elseif(exp){ // well , take care the key word
}
else{
}

switch(what){
    case cs0:
        break;
    case cs1:
        break;
    case cs2:
        break;
    default:
        break;
}

switch (what): // syntax sugar , pythonic ?
    case cs0:
        break;
    case cs1:
        break;
    case cs2:
        break;
    default:
        break;
endswitch;
```

## Loop
基本上和 C 系差不多，但有迭代器的用法 (Array 時再說），注意一下。
```php
for($i = 0 ; $i < 10 ; $i++){
    echo $i;
}

while(exp){}

while(exp): // syntax sugar
endwhile;

do{}while(0);
```

## Array
物件化，沒有用符號下去載，直接拿一個物件名，注意 new。
```php
$myArray = new Array(1 , 2 , 3);
array_push($myArray , 4);
unset($myArray , 3);       // remove element 4
unset($myArray);           // remove whole aray

foreach($myArray as $e){   // iterator
    echo $e.'<br>';
}

$twoDimAry = new Array(Array() , Array());

$myAryMap = new Array('keyOne' => 1 ,
                    'keyTwo'   => 2 ,
                    'keyThree' => 3);

foreach($myAryMap as $key => $val){ // array map iterator
    echo $key.' => '.$val;
}
```

## OOP
寫個物件來記最快。
```php
class Animal{
    public $age;
}

class Person extends Animal {

    public $name;

    static public function say($word){
        echo $word.'<br>';
    }

    const die_age = 30; // we don't need $

    public function __construct($age){
        $this->age = $age;
    }
    public function getOlder(){
        $this->age += 1;
    }

}

$nobodyzxc = new Person(20);
echo $nobodyzxc->age;
$nobodyzxc->getOlder();
Person::say("there , there");
```
