---
title: Scheme Note
date: 2017-03-29 00:12:04
tags:
---

<center>
SICP 魔法之啟程。中間會加入上課內容。
syntax highlight 還要折騰...
</center>

<!-- more -->

## Let's lambda
```lisp
; easy lambda exp
(lambda (x y) (* x y))
```
## Curry and Compose
```lisp
; lambda
(define (curry f) (lambda (x) (lambda (y) (f x y))))
; compose
(define compose (lambda (f g) (lambda (x) (f (g x)))))
```
## and of if define ... Key word !
not ready yet
## my miniScheme
not ready yet

## midterm
前面簡答題廢話寫太多，導致兩題沒寫完 QQ。
用 filter 簡簡單單就可以解決的東西啊...
我是喜歡 FP 的啊！

{% codeblock lang:lisp %}
; BST tree
(define (curry f) (lambda (x) (lambda (y) (f x y))))
(define (bstTree xs)
  (if (null? xs) '()
    (let ((node (car xs))
          (left (cdr xs)))
      (cons node (list
                   (bstTree (filter ((curry >) node) left))
                   (bstTree (filter ((curry <=) node) left))
                   ))
      )))

; search BST tree
(define (exist? n bt)
  (cond [(null? bt) #f]
        [(= n (car bt)) #t]
        [(< (car bt) n) (exist? n (caddr bt))]
        [else (exist? n (cadr bt))]
        )
  )

(exist? 7 (bstTree '(1 4 2 7 3 7 3 8 46)))
{% endcodeblock %}
