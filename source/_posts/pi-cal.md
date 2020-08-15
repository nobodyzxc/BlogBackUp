---
title: functional thursday ＃73
date: 2019-05-03 10:45:51
categories: Memoir
tags: [lambda]
mathjax: true
---

<center>
π-calculas 不負責任筆記
</center>

<!-- more -->

<br><br>

## Concurrency vs Parallelism

compile normal program into parallelism program? Hard!

make changes on program as little as possible!

- parallelism ⇒ multi-processor, multi-processes
- concurrency ⇒ single-processor, multi-processes

make write wrong program harder?

### Concurrent model
- CSP ⇒ process - process event
- π-calculas ⇒ channel - channel message passing

process algebra
> π-calculas is the most complex one, but useful

## π-calculas

### Send and receive are atomic operation

```haskell
SquareServer = c(x) . c<x^2> . SquareServer
-- SquareServer is recursive

P1 = c<3> . c(x) . ∅
-- a client want to get square of 3

P2 = c<4> . c(y) . ∅
-- a client want to get square of 4

main = SquareServer | P1
-- run SquareServer, P1 at the smae time.

let < > = send
let ( ) = receive
let  c  = channel
let  .  = end
let  ∅  = stop
```

### Error?

```haskell
SumServer = C(x) . C(y) . C(x + y) . SumServer
P1 = C<3> . C<5> . C(x) . ∅
P1 = C<4> . C<6> . C(x) . ∅

-- may cause race or deadlock
```

### Give every process unique channel!

```haskell
SumServer = νd . c<d> . d(x) . d(y) . d<x + y> . SumServer
P1 = c(d) . d<3> . d<5> . d(x) . ∅
P2 = c(d) . d<6> . d<4> . d(x) . ∅

SumServer | P2 | P1
-- no race or deadlock!
```

### More powerful server?

```haskell
SumServer = (νd . c<d> . d(x) . d(y) . d<x + y> . ∅) | SumServer
-- calculate and provide other service at the same time!
```

### Define such operator

```haskell
P = !Q = Q | P = Q | Q | Q | ...
```

### Math server

```haskell
-- ⊳ select
-- ⊲ choice

MathServer = νc . ms<c>

where
   c ⊳ { ADD → c(x) . c(y) . c<x + y> . ∅;
         NEG → c(x) . c(-x) . ∅} | MathServer

user = ms(c) . c ⊲ ADD . c<3> . c<4> . c(x) . ∅

```

### MathServer throw select operation? how?

```haskell
MathServer = νc . ms<c> . worker c | MathServer

worker c = c ⊳ {
     ADD → c(x) . c(y) . c<x + y> . worker c;
     NEG → c(x) . c(-x) . worker c;
     END → ∅} | MathServer

-- worker need to receive "c" ?! function call?

user = ms(c) . c ⊲ ADD . c<3> . c<4> . c(x) . ∅

```

### No function call! use a w(orker) channel to pass "c"

```haskell
MathServer = νc . ms<c> . w<c> | MathServer

worker = !(w(c) . c ⊳ {
           ADD → c(x) . c(y) . c<x + y> . w<c> . ∅ ;
           NEG → c(x) . c(-x) . w<c> . ∅;
           END → ∅})
```

### Dinning phylosophers in π-calculas

> omit

### Basic Rules

identity and association rule

```haskell
(P | Q) | R ≡ P (Q | R)
P | Q ≡ Q | P
P | ∅ ≡ P

P ≡ Q ⇒ R | P == R | Q
```

reduction rule

```haskell
proc = a<x> . P | a(y) . Q → P | Q [x / y]
-- should substitute y to x fisrt(?)
```

```haskell
w<a> . a<3> . P | w(z) . z(x) . b<x + 3>
→ a<3> . P | a(x) . b<x + 3>
```

axiom relating restriction and parallel

```haskell
(νx . P) | Q ≡ νx . (P | Q) if Q not contains x


(νa . w<a> . a<3> . P) | w(z) . z(x) . b<x + 3>
≡ νa(w <a> . a<3> . P | w(z) . z(x) . b<x + 3>)
→ νa(P | b<6>)
...
→ νa . ∅
→ ∅
```

## Type system in π-calculas

- process is untyped
- channel is typed

Γ ⊢ P

### Dual type

$c : (?Int . !Int . ∅)^{⊥} = !Int . ?Int . ∅$

### Type inference

$\frac{Γ, x:t, y:s ⊢ P}{Γ, x:?s . t ⊢ x(y) . P}$

$\frac{Γ ⊢ y:s \quad Γ, x:t ⊢ P}{Γ, x:!s . t ⊢ x \langle y . P}$

> note x:t not x:t, y:s

----

$\frac{Γ\_{1} ⊢ P \quad Γ\_{2} ⊢ Q}{Γ\_{1} ∘ Γ\_{2} ⊢ P | Q}$


----

if $x ∈ Γ\_{1}$ is $t$
then $x ∈ Γ\_{2}$ need to be $t^{⊥}$


> type preservation

Γ ⊢ e : τ ∧ e -> e' ⇒ Γ ⊢ e' : τ

Γ ⊢ e : τ
- e value
- ∃ e', e → e'

### linear logic

cut rule
