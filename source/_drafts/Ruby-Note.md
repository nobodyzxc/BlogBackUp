---
title: Ruby Note
tags:
---

<center>
Codecademy 之 Ruby 速記。
</center>

<!-- more -->

## Basic
跟 Python 一樣是動態、腳本語言，所謂變數只是 name binding，
用法跟 Python 也一樣， assign 值即宣告。
every thing is object。

special operator
```ruby
2 ** 4 # 16
[1 , 2 , 3] <=> [3 , 1] # cmp recursively
```

## comment
```ruby
# single line comment

=begin
multiple line comment
=end
```

## Functions

`!`語法糖，將 Method 返回結果回存變數。
`.`，貌似很喜歡 function chainning。

IO
```ruby
gets.chomp
# chomp 去除前後空白字元，包括 \n \t 一類

puts "#{var} with new line"

print "#{var} without new line"
```

array object's methods
```ruby
arr = [1 , 4 , 2 , 5 , 3]
arr.sort!
arr.sort! { |a , b| -(a <=> b } # lambda is great!
```


string object's methods
```ruby
# 不用加括弧啊
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

utility

在函數裡宣告的變數基本上都是區域變數，如要用全域，加上`global`關鍵字。 ??

define a function
```ruby
def functionName(argA , argB)
    # do something
end
```

## Control Flow
基本的東西，稍微記一下。

```ruby
if 1 == 1
    # do something
elsif 'a' == 'b' # 注意 keyword
    # do something
else
    # do something
end

# 有點微妙，因為有 end ，所以不用管縮排，儘管看起來跟 python 有點像。
# 但 if statement 後沒有 : 或 { 表示開頭。

# if not , syntax sugar

unless what
    # do something
else
    # do something
end

# 這個語法糖，我也是醉了， do something if what
statement unless exp
statement if exp

```

## Loop

```ruby
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
number.times{ print "Do you need some Wow?" }
# so Wow (doge
```

## Array

```ruby
array = [1 , 2 , 3 , 4]
array = [1..4] # the same

array.each do |var|
    print "#{var}"
end

array.each { |var| print "#{var}" } # lambda in haskell ?
```

## Hash

```ruby
hashTb = {
    "one" => 1 , "two" => 2 , "three" => 3
}

puts hashTb["one"]

# create empty hash
aHash = Hash.new
aHash["A"] = "a"

# iteration
hashTb.each{ |key , value| puts "#{key} , #{value}" }
```

## OOP
