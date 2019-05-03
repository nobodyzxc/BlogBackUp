---
title: latex-on-vim
date: 2019-03-21 18:27:00
categories:
---

<center>
</center>

<!-- more -->

```vim
Bundle 'lervag/vimtex'
let g:tex_flavor='latex'
let g:vimtex_view_method='zathura'
let g:vimtex_quickfix_mode=0
set conceallevel=1
let g:tex_conceal='abdmg'
```

```
"main.tex" 101L, 2278C
vimtex: Zathura requires xdotool for forward search!
vimtex: latexmk is not executable
vimtex: Compiler was not initialized!
vimtex: bibtex is not executable!
        bibtex completion is not available!
```

```bash
sudo pacman -S xdotool
sudo aurman -S latex-mk
sudo pacman -S zathura
sudo pacman -S zathura-pdf-poppler
```


<br><br>
