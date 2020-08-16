---
title: Ruby Note
date: 2017-04-27 03:03:03
categories: Note
tags:
- ruby
- oop
---

<center>
<a href="https://www.codecademy.com">Codecademy</a> 之 Ruby 速記。<br>
原來 Ruby 和 DSL 很有淵源啊（喃喃）。<br>
剛學沒多久教授就提到了，Ruby 主要是 SmallTalk + Lisp 佐一點 C。<br>
On the path to enlightenment.<br>
wait to refer:<br>
  <a href="http://guides.ruby.tw/ruby/index.html">Ruby Guides</a> done!<br>
  <a href="https://www.ruby-lang.org/zh_tw/documentation/">Lots of docs</a>

</center>


<!-- more -->


<br><br>
<script src="/files/ruby-syntax-patch.js"></script>
<link href="/files/scheme-syntax-patch.css" rel="stylesheet" type="text/css">
## Basic
跟 Python 一樣是動態、腳本語言，所謂變數只是 name binding，
(Philosophy 可是很不同呢～)

用法跟 Python 也一樣， assignment 即宣告。
every thing is object。

basic special operator
``` ruby
2 ** 4 # 16
[1 , 2 , 3] <=> [3 , 1] # cmp recursively
```

## Comment
``` ruby
# single line comment

=begin
multiple line comment
=end

```

## Functions

`!`語法糖，將 Method 返回結果回存 Object。
`.`，function chainning 在 OO 可以玩得很溜。

IO
``` ruby
gets.chomp
# chomp 去除前後空白字元，包括 \n \t 一類

puts "#{var} with new line"

print "#{var} without new line"
```

array object's methods
``` ruby
arr = [1 , 4 , 2 , 5 , 3]
arr.sort!
arr.sort! { |a , b| -(a <=> b) } # lambda is great!
```


string object's methods
``` ruby
# 不用加括弧啊
"string".to_sym # symbol will explain later
"string".intern # "string" => :symbol
"string".length
"string".reverse
"string".upcase
"string".downcase
"string".capitalize
"string".include? "des to search" # 回傳 bool，很有 lisp style 的 ?
"string".gsub(/replace/ , "new string")
"string".gsub!(/replace/ , "new string") # 直接取代，我只是要強調 ! 的位置
"string".split # split string to array of string
```

define a function
``` ruby
def functionName(argA , argB)
    # do something
end

# 由於靈活的語法，可以 omit ()
def add x , y
    x + y      # omit return will take last exp as return value
end
```

## Control Flow
基本的東西，稍微記一下。

``` ruby
if 1 == 1
    # do something
elsif 'a' == 'b' # 注意 keyword
    # do something
else
    # do something
end

# 有點微妙，因為有 end ，所以不用管縮排，儘管看起來跟 python 有點像。
# 但 if statement 後沒有 : 或 { 表示開頭（他拿 \n 做辨認？)。
# 不，如果寫成 one line 還是要加 ;
if true; puts "true" end
# 可是有更潮的 one line if （後面）


# if not , syntax sugar

unless what
    # do something
else
    # do something
end

# 這個語法糖，我也是醉了， do something if what
statement unless exp
statement if exp
# Ruby 之禪 discuss later
```

## Loop

``` ruby
while exp
    # do something
end

# the syntax sugar of 'while not'
until exp
    # do something
end

# 1 2 3 4
for i in 1...5
    print "#{i} "
end

# 1 2 3 4 5
for i in 1..5
    print "#{i} "
end

loop do
    # do something
    next if while # same as 'continue' in C's
    break if what
end

loop { # do something } # inf loop

number = 10
number.times{ print "Do you need some Wow?" } # wow...(doge

# Array 會提及物間迭代器用法 - each
```

關於 loop 的流程控制

``` ruby
{         # block of loop

# redo jump here to restart it , so amazing...


redo if doRedo
break if doBreak
next if doNext

return if doReturn # return func (not loop)

# next jump here wait to start a new iteration

}
# break jump to here
```

## Array

``` ruby
array = [1 , 2 , 3 , 4]
array = [1..4] # not the same !!
# 這是 array 塞一個 range 物件，做迭代會迭出一個物件
array = (1..4).to_a # this !

array.each do |var|
    print "#{var}"
end

(1..4).each do |var| # 直接用 range 物件迭代就一樣了
    print "#{var}"   # 體會一下
end
# iteration
array.each { |var| print "#{var}" } # lambda in haskell ?
```

## Hash

``` ruby
hashTb = { "one" => 1 , "two" => 2 , "three" => 3 }

# we can take symbol as key , too!
symTb = { :one => 1 , :two => 2 , :three => 3 }

symTbInRuby1pt9 = { one: 1 , two: 2 , three: 3 }
# 冒號要跟緊 symbol，不然不會過

puts hashTb["one"]

# create empty hash
aHash = Hash.new
aHash["A"] = "a"

# iteration
hashTb.each{ |key , value| puts "#{key} , #{value}" }

# special iterations
hashTb.each_key { |key| puts k }
hashTb.each_value { |value| puts value }

hashTb.each do |key , value|
    puts "#{key} , #{value}"
end

# if acess no exist key will get nil (fp? wwwwww)
# you can set default "nil" to other value
my_hash = Hash.new("no such key , sorry")

# select 用法，wow 有 database 的感覺呢。
# 等等，他就是 FP 的 filter 嘛...
puts symTb.select{ |k , v| v % 2 == 1 }
```

## Symbol
這個資料型態也很潮，
跟字串不一樣，相同的字面值只佔一個空間。
（因為這個特性，所以做 hash 比較優秀嗎？)
``` ruby
puts "string".object_id
# 12886316620
puts "string".object_id
# 12886316480

puts :symbol.object_id
# 801628
puts :symbol.object_id
# 801628

sym = :my_symbol # : 後面要連起來

s_sym = sym.to_s # 轉成 string
```

## Symbol vs String in Hash from [Codecademy](https://www.codecademy.com)
``` ruby
require 'benchmark'

string_AZ = Hash[("a".."z").to_a.zip((1..26).to_a)]
symbol_AZ = Hash[(:a..:z).to_a.zip((1..26).to_a)]

string_time = Benchmark.realtime do
  100_000.times { string_AZ["r"] }
end

symbol_time = Benchmark.realtime do
  100_000.times { symbol_AZ[:r] }
end

puts "String time: #{string_time} seconds."
puts "Symbol time: #{symbol_time} seconds."
```

## Zen of Ruby (Improvement of Syntax)
one line 系列，不用 end。
``` ruby
puts "She will accept me" if she_love_me

puts "She will reject me" unless she_love_me
```

swich case in c , select case in vb , case when in ruby!
非常之靈活。
注意 then and else(without then)。
``` ruby
# 基本用法，像 C
case lang
    when "java" then puts "so long..."  # add then if whole command in one line
    when "cpp"
        puts "so powerful..."           # or omit then with a new line
    when "ruby"
        puts "so fun!"
    else puts "I like the else!"
end

case lang
    when "chinese" , "english"          # 逗號
        puts "I can"
    else
        puts "I can't"
end

case num
    when 1..10 then puts "1 to 10"      # GNU extension 也有
    when 11..20 then puts "2 to 20"
end

case                                    # 如果 case 沒給，甚至可以像 VB 用 expr
    when false then puts "false"
    when 1 + 1 == 2 then puts "true"
end
```

magic operator! (for me)
``` ruby
contain = nil
puts contain
contain ||= "not nil"  # re assignment if nil
puts contain
contain ||= "re assignment" # won't re assignment because it's not nil
puts contain
```

zen of iterations
``` ruby
object of num
5.times{ |n| somthing.. }

object of list , map or other
obj.each{ |a , ... | somthing... }

object which can enum (num , char ...)
5.upto(6){ |x| puts x }
'a'.upto('z'){ |x| puts x }
```

check if obj will response the method or not
``` ruby
obj.respond_to?(:func) # take care , it take a functino name(symbol) as param
```

pushy ( `<<` operator )
``` ruby
[1 , 2 , 3 , 4].push(5)
# equal to
[1 , 2 , 3 , 4] << 5

"asdf " + "asdf"
# equal to
"asdf " << "asdf"
```

string interpolation
``` ruby
puts "list to string #{[1 , 2 , 3 , 4, 5]}" # eq to to_s function
```

ternary operator
``` ruby
true ? 1 : 2 # like c
```

## Implicit Return
Lisp 的感覺，當在 let 執行多個 expression 會回傳最後一個 expression。
Ruby 是將 function 看成 let 回傳最後一個 statement。

## Blocks , Procs , and Lambdas
前面看了這麼多東西，應該可以察覺 lambda 的概念在哪了吧，
沒錯，就是 **block** !（然而這不是 Ruby 真正的 lambda ，他還有個 lambda obj)
`{ |x| x * 2 }` 和
`\x -> x * 2` in Haskell 和
`lambda x : x * 2` in Python 和
`(lambda (x) (* x 2))` in Scheme 和
`function(x) { return x * 2 }` in JavaScript 都是 lambda。
不知不覺也學了好多 lambda 呢，不過我在思考可不可以直接拿來 apply 這件事。
Haskell 和 Scheme 不用說，Python 可，<s>JavaScript 和 Ruby 目前不會用。</s>
``` Ruby
lambda{ |x| puts x }.call(8)         # Ruby
```
``` JavaScript
(function(x){ console.log(x); })(8) // JavaScript
```

High Order Function
``` ruby
# collect 就是 FP 中常用的 map
[1 , 2 , 3].collect { |n| n % 2 == 0 }
[1 , 2 , 3].map { |n| n % 2 == 0 } # 也有 map 這個 function
```

-----

yield => 傳入的 lambda function 代名詞（變數名）。
一般我們 FP 在定義 High Order Function 時都要為 take 的 function 取變數名。
但 Ruby 在只有傳入一個 function 時，可以直接拿 yield 做關鍵字來 take function。
``` ruby
# 我做一個簡單的 map
def myMap li
    rtn = []
    li.each{ |e| rtn << yield(e) }
    rtn # Implicit return
end

puts "#{myMap [1 , 2 , 3 , 4] { |x| x ** 2 }}"
# 藉由 ruby 強大的 DSL 能力，括號少很多
```

-----

Proc To DRY
感覺可以用 JavaScript 的 lambda fn 和其 name binding 體會一下差異
``` ruby
# ruby 要將 lambda(Proc) 綁到變數上，注意 P 大寫
mul = Proc.new { |a , b| a * b } # create a block and => new proc object
                                 # proc obj 比 block obj 成熟
                                 # 且可以用 call method 重複呼叫
                                 # block 是一次性的
puts mul.call 1 , 2
# 因為是物件導向 Proc 物件要當 Function 用要用 call
```
```JavaScript
mul = function(x , y){ return x * y }
// create lambda and bind it to a new name
console.log(mul(1 , 2));
// 剛好相反，因為物件都是 Function 模擬的 w
```

-----

Proc to Block
可以體會到，把 Block 綁到 Proc 是常用的手段，
但要 Proc 如何用在 High Order Function 呢？
前面我們學到 Block 使用是在 function 後加 Block 然後使用 yield 關鍵字。
``` ruby
用前面的 myMap 再加一個 double 為例子。
double = Proc.new { |x| x * 2 }
puts myMap([1 , 2 , 3] , &double) # & 號 做的就是把 Proc => Block
# equal to
puts myMap([1 , 2 , 3]) { |x| x * 2 }
# but
puts myMap([1 , 2 , 3] , { |x| x * 2 }) # error
puts myMap([1 , 2 , 3]) &double         # error
```

-----

Proc 應用在 map 上。
``` ruby
num_s = [1 , 2 , 3].map(&:to_s)
# 注意冒號，要用 symbol 轉 proc 來 call
# （其實我在想是不是 obj method 的關係）
```

-----

補：Codecademy 上沒有講，但我覺得很奇怪的一點－難道我只能用 yield 嗎？
FP 上都可以把 function 傳進來用變數表示，Ruby 要怎麼做？
``` ruby
# 這樣做（重寫 myMap)
def myMap li , &fn # 記得傳進來要當 proc or lambda 物件來看了
    rtn = []
    li.each{ |e| rtn << fn.call(e) } # 所以要用 call method
    rtn # Implicit return
end

double = Proc.new{ |e| e * 2 }

#以下兩種都可以過
puts "#{myMap([1 , 2 , 3 , 4] , &double}"
puts "#{myMap([1 , 2 , 3 , 4]){ |e| e * 2 }}"
```
所以看起來 yield 的優勢是將它當成 function 看。
而這種方式則是當作 object 看。

-----

真正要介紹 Ruby 的 lambda 了，由於是 OO 語言，所以 lambda 是 obj。
用法基本和 proc 相似。
``` ruby
proc_double = Proc.new { |x| x * 2 }
lambda_double = lambda { |x| x * 2 }
```

difference between lambda and Proc

1. lambda 會檢查 param 數量，Proc 若沒吃夠直接當 nil
2. lambda 會返回控制權， Proc 回直接執行
（對 2. 我有一套自己的解釋法但不知對不對，詳見例）


``` ruby
def ProcTst
    proc_s = Proc.new{ return "inner Proc" }
                                    # 我視 proc.call 為直接像 macro 炸開
    proc_s.call                     # 所以該行替換成 return "inner Proc"
                                    # 所以就直接 return 了
    return "ProcTst"                # 不走這行
end

puts ProcTst # ==> "inner ProcTst"

def LbdaTst
    lbda_s = lambda { return "inner Lbda" }
                                    # lambda 直接再進一個 stack
    lambda.call                     # 所以該行回傳結果是 "inner Lbda"
    return "LbdaTst"                # 然後 return "LbdaTst"
end

puts LbdaTst # ==> "LbdaTst"
```

應該只有我會這麼亂想吧...
``` ruby
def ReturnTst
    yield                           # 所以該行回傳結果是 "inner Lbda"
    return "ReturnTst"                # 然後 return "LbdaTst"
end

puts ReturnTst{ return "rtn of block" }
puts ReturnTst &Proc.new{ return "rtn of Proc" }
puts ReturnTst &lambda{ return "rtn of lambda" }

# => 結果都是 unexpect return
```


-----
結語，要用一次性且只有一個的 function 用 block + yield 就好
然後一次性多個 就傳 lambda or Proc object 加上 & 吧。

## OOP

Capitalize your class name
``` ruby
class Dog                # => 強制大寫，不然不給過，立意良善
end

doge = Dog.new "lion"    # create a instance
```
-----

constructor - initialize
他的建構子不是拿 class 的名字
不過說實在的，我覺得 initialize 有點冗長...
``` ruby
class Dog
    def initialize name
        @name = name     # 詳見下例
    end
end
```
-----

variable type - global , class , instance
``` ruby
$animal_num = 0          # 全域變數，帶 $ 字頭
class Dog
    @@dog_count = 0      # 屬於 class 的 var，就是 static 啦，帶 @@ 字頭
    def initialize name
        @name = name     # 帶 @代表成員變數，哼哼不用煩惱變數就是爽
        @@dog_count += 1
    end
end
```
-----

function belongs class -> self.fn or ClassName.fn
``` ruby
class Dog
    @@dog_count = 0      # 屬於 class 的 var，就是 static 啦，帶 @@ 字頭
    def initialize name
        @name = name     # 帶 @代表成員變數，哼哼不用煩惱變數就是爽
    end

                         # class function 就是 static 的 function 啦

    def self.get_dog_num; @@dog_count end

                         # 意會一下用 ; 而不用換行（想一想為啥 end 前不用呢）
=begin 或者可以寫成

    def Dog.get_dog_num
        @@dog_count
    end

=end

end
```

-----

inheritance with `<`

``` ruby
class Animal
    def initialize sound
        @sound = sound
    end

    def howling
        puts @sound
    end
end

class Dog < Animal
    @@dog_count = 0      # 屬於 class 的 var，就是 static 啦，帶 @@ 字頭
    def initialize name
        @name = name     # 帶 @代表成員變數，哼哼不用煩惱變數就是爽
    end

    def self.get_dog_num      # 就是 static 的 function 啦
        @@dog_count
    end
end

doge = Dog.new "lion"
doge.howling             # 糟糕，doge 叫不出來，怎麼辦
```
-----

需要 overriide ，因為 doge 叫不出來。
``` ruby
class Dog < Animal
    @@dog_count = 0      # 屬於 class 的 var，就是 static 啦，帶 @@ 字頭
    def initialize name
        @name = name     # 帶 @代表成員變數，哼哼不用煩惱變數就是爽

#       @sound = "Wolf!" # 除了 overriide，也可以將 sound 直接改掉
    end

    def self.get_dog_num      # 就是 static 的 function 啦
        @@dog_count
    end

    def howling          # overriide howling
        puts "Wolf!"
    end
end

doge = Dog.new "lion"
doge.howling             # doge 叫出來了
```

-----
super => 調用 parent 的 **同名 function**（不只是 initialize 喔）
``` ruby
class Dog < Animal
    @@dog_count = 0      # 屬於 class 的 var，就是 static 啦，帶 @@ 字頭
    def initialize name
        @name = name     # 帶 @代表成員變數，哼哼不用煩惱變數就是爽
        super "Wolf!"    # 剛剛的直接取代不漂亮，直接調用 Animal 的 initialize
    end

    def self.get_dog_num      # 就是 static 的 function 啦
        @@dog_count
    end
end

doge = Dog.new "lion"
doge.howling             # doge 叫出來了
```
-----

Ruby 不支援多重繼承，因為 **so ugly**，他用 mixin(mod + class)!
-----

-----

public , private , protect
class var , instance var 預設都是 private
class function , instance function 預設都是 public
protect 就是繼承者可用嘛，不多說。
``` ruby
class Dog < Animal
    @@dog_count = 0      # 屬於 class 的 var，就是 static 啦，帶 @@ 字頭

    public

    def initialize name; @name = name; super "Wolf!" end
    def self.get_dog_num; @@dog_count end

    private

    def any_fn_you_want_to_be_private; end
end

# or

class Dog < Animal
    @@dog_count = 0      # 屬於 class 的 var，就是 static 啦，帶 @@ 字頭

    def initialize name; @name = name; super "Wolf!" end
    def self.get_dog_num; @@dog_count end
    def any_fn_you_want_to_be_public; end
    def any_fn_you_want_to_be_private; end

    public :any_fn_you_want_to_be_public     # 注意是用 symbol
    private :any_fn_you_want_to_be_private

    # 對 class fn 做 public , private 比較特別
    # 要使用 private_class_method 這個關鍵字
    # 在此略過不討論
end
```
-----

attr\_reader , attr\_writer , attr\_accessor
我們常常在 OOP 使用 get 和 set ，但實在太冗了，
Ruby 給我們自動製造 function 的方法。用起來和 public 變數一樣。

``` ruby
class Dog
    attr_reader :age              # 為 age 做 get 的 function
    attr_writer :food             # 抱歉，江郎才盡了
    attr_accessor :name           # get and set both
    # 注意後面是加 symbol

    def initialize name , age , food
        @name = name
        @age = age
        @food = food
    end
end

doge = Dog.new "lion" , 3 , "null"
puts doge.name
doge.name = "frog"
puts "#{doge.name} : #{doge.age}"
doge.food = "meat"
```

## Module
module Name => 一樣 Capitalized
module 只能有 Const（大寫的 name)
namespace 呼叫 （和 C++ 一樣可以用 `::`)
require ModuleName （就是 import in python 啦）
``` ruby

require "date" # 可以使用 Date module 的東西，注意小寫及 string

module Rectangle
    Edge = 4   # 廢話
    def Rectangle.area wid , len
        len * wid
    end

    def Rectangle.perimeter wid , len
        (len + wid) * 2
    end

    def shape
        "Rectangle"
    end
end

puts Rectangle::Edge
puts Rectangle.area 5 , 10
```

-----

include module in class
mixin -> imitating multiple inheritance
``` ruby
class Paper # Ummm...
    include Rectangle
    def initialize len , wid
        @len = len
        @wid = wid
    end
end

puts m.shape   # Rectangle
```

但我在想 Rectangle 的 area 如果寫成 instance fn 的話
給 Paper inheritance ，area 怎麼直接用到 Paper 的 wid & len 呢...

-----

extend -> as class fn
拿 parent 的 **instance fn** 當自己的 **class fn**
``` ruby
module Rectangle
    Edge = 4   # 廢話
    def area wid , len      # 注意 area , class fn => instance fn
        len * wid
    end

    def shape
        "Rectangle"
    end
end

module Square  # class 也可以用 extend 喔，效果一樣
    extend Rectangle
end

puts Square.area 5 , 5 # 就是這樣
```
-----
結語，其實我覺得還是有許多問題的，不過這真的是 OOP 面的問題。

## 寫在後面

Ruby 還有一些比較特別的東西，記在最後面。

-----

單件方法 (singleton method)

就是 instance create 後，可以直接重新 def instName.func。
據說是從 prototype-based 來的。(JavaScript 就是 prototype-based)

-----

恩，有點 WTF 的東西...
感覺整個 obj\_new 是個 lambda...
v 是 obj\_new closure 裡的 name binding。

``` ruby
def obj_new
    v = 0
    get = lambda{ v }
    set = lambda{ |x| v = x }
    return get , set
end

obj_r , obj_w = obj_new

puts obj_r.call
obj_w.call 5
puts obj_r.call
```
恕我用癟腳的 Scheme 模擬一下。
最近剛好在教 FP 模擬 OOP :)
```scheme
(define obj-new
  (lambda (v)
    (list
      (lambda () v)
      (lambda (x) (set! v x))
      )
    )
  )

(define obj (obj-new 0))
(define obj-r (car obj))
(define obj-w (cadr obj)) ; 沒有 pattern matching 真麻煩

(display (obj-r)) (newline)
(obj-w 5)
(display (obj-r)) (newline)
```

其實如果不要照 Ruby 的範例，我 scheme 是比較想寫成

```scheme
(define obj-new
  (lambda (v)
    (lambda (sym . param)
      (cond
        ((equal? sym 'get) v)
        ((equal? sym 'set) (set! v (car param)))
        (else 'func-not-def)
        )
      )
    )
  )
(define obj (obj-new 0))
(display (obj 'get)) (newline)
(obj 'set 5)
(display (obj 'get)) (newline)
```

-----

例外處理

對應 C++ ， Java 的 throw , catch ，Ruby 有著 begin , rescue 。

``` ruby
def get_file_first_line
    err_try = 0
    print "> "
    fname = gets.chomp
    begin
        file = open(fname)
        rtn = file.gets
    rescue
        if err_try < 3
            print "> "
            fname = gets.chomp
            err_try += 1
            retry               # jump to begin
        end
    ensure                      # do ensure block no matter what
        puts "Ensure close file"
        file&.close             # &. -> safer func call
    end
    rtn
end

puts ">> #{get_file_first_line}"
```

-----

inspect func -- 自定義直接呼叫物件的回傳值。

``` ruby
class Org
    def inspect
        "It's a Object"
    end
end

obj = Org.new
obj           # return "It's a Org" in irb
```
-----
