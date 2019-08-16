---
title: Scheme Note
date: 2017-03-29 00:12:04
categories: Note
---

<center>
SICP 魔法之啟程。中間會加入上課內容。
稍稍動了一下 syntax hightlight 的 css。
</center>
<link href="/files/scheme-syntax-patch.css" rel="stylesheet" type="text/css">
<!-- more -->

## Let's lambda
```scheme
; easy lambda exp
(lambda (x y) (* x y))
```
## Curry and Compose
```scheme
; lambda
(define (curry f) (lambda (x) (lambda (y) (f x y))))
; compose
(define compose (lambda (f g) (lambda (x) (f (g x)))))
```
## and of if define ... Key word !
not ready yet
## my miniScheme
{% codeblock mini-scheme lang:scheme /files/mini-scheme.ss %}
code snippet
{% endcodeblock %}

## midterm
前面簡答題廢話寫太多，導致兩題沒寫完 QQ。
用 filter 簡簡單單就可以解決的東西啊...

```scheme
; BST tree
(define (curry f) (lambda (x) (lambda (y) (f x y))))
(define (bstTree xs)
  (if (null? xs) '()
    (let ((node (car xs))
          (branch (cdr xs)))
      (cons node (list
                   (bstTree (filter ((curry > ) node) branch))
                   (bstTree (filter ((curry <=) node) branch))
                   ))
      )))

; search BST tree
(define (exist? n tree)
  (cond [(null? tree) #f]
        [(= n (car tree)) #t]
        [(< (car tree) n) (exist? n (caddr tree))]
        [else (exist? n (cadr tree))]
        )
  )

(exist? 7 (bstTree '(1 4 2 7 3 7 3 8 46)))
```
