---
title: Vim Node (Basic Configuration)
date: 2020-11-18 21:59:21
categories: Note
tags:
- vim
- linux
---

<center>
距離上一篇已經過了三年多，<br>
這五年多來的 Vim 之旅似乎還沒落幕。
</center>


<!-- more -->


<br><br>
## 基本配置篇

### 認識 vimrc

基本上一個空的 vim 設定應該是連行號都沒有的。
那如果要叫出行號，就必須使用指令 `:set nu`，
但每次都要打似乎太麻煩了，
這時，我們就可以寫個設定檔。

在類 Unix 環境下，家目錄下面，可以創立一個 `.vimrc` 檔案，然後寫一些設定進去。
而在 Windows 下，Cygwin 也是在加目錄，而 gvim 那些的設定檔可能就請參考 [這邊](https://stackoverflow.com/questions/9120500/vim-settings-file-on-windows)。

以下是某位學長的設定檔，系上工作站大家的帳號一開始都是從這個設定檔入門的。
有趣的小功能算不少，但最有用的就是用 tab 補全代碼吧 :)

```
set nocompatible
set secure

set backspace=2         " allow backspacing over everything in insert mode
set viminfo='20,\"50    " read/write a .viminfo file, don't store more
                        " than 50 lines of registers
set history=50          " keep 50 lines of command line history
set ruler               " show the cursor position all the time
"set dictionary=~/.dict  " my dictionary :p

"set expandtab           " expand tabs to spaces.
set wildchar=<TAB>      " such as <TAB> in shell
set smarttab
set tabstop=4
set shiftwidth=4

set nu
set t_Co=8              " number of colors
set t_Sf=[1;3%p1%dm   " set foreground color
set t_Sb=[1;4%p1%dm   " set background color
set showcmd             " show command
set showmode            " show current mode
set incsearch           " While typing a search pattern, show immediately
                        " where the so far typed pattern matches.
set hlsearch            " When there is a previous search pattern,
                        " highlight all its matches.
syntax on               " show parts of the text in another font or color

set fileencodings=utf-8,cp936,big5,latin1
set background=dark

autocmd FileType c,cpp,cc,java call PROG()
autocmd FileType make setlocal noexpandtab

colorscheme default

function PROG()
    set showmatch
    set nosmartindent
    set cindent comments=sr:/*,mb:*,el:*/,:// cino=>s,e0,n0,f0,{0,}0,^-1s,:0,=s,g0,h1s,p2,t0,+2,(2,)20,*30
    set cinoptions=t0
    imap <C-a>f <END><CR>for(;;) {<CR>}<LEFT>
                \<CR><UP><UP><UP><RIGHT><RIGHT><RIGHT><RIGHT><RIGHT>
    imap <C-a>w <END><CR>while( ) {<CR>}<LEFT>
                \<CR><UP><UP><UP><END><LEFT><LEFT>
    set formatoptions=tcqr
endfunction


highlight Comment    ctermfg=DarkCyan
highlight SpecialKey ctermfg=Yellow

map <F2> :update<CR>                    " using :update to replace :w
map <F3> :update<CR>:q<CR>
map <F4> :q!<CR>
map <F5> :bp<CR>
map <F6> :bn<CR>
" map <F8> :set hls!<BAR>set hls?<CR>     " toggle on/off highlightsearch
map <F8> :set paste!<BAR>set paste?<CR> " toggle on/off paste mode
set pastetoggle=<F8>
map <F9> :!make %:r <CR>

map <F7> :if exists("syntax_on") <BAR>  " press <F7> syntax on/off
        \   syntax off <bar><cr>
        \ else <BAR>
        \   syntax on <BAR>
        \ endif <CR>

map <F10> <ESC>:read !date<CR>


"smart mapping for tab completion
function InsertTabWrapper()
    let col = col('.') - 1
    if !col || getline('.')[col - 1] !~ '\k'
        return "\<tab>"
    else
        return "\<c-p>"
    endif
endfunction

inoremap <TAB> <C-R>=InsertTabWrapper()<CR>
```

後來，我為了比賽重新翻修，去蕪存菁：

```
source /etc/vimrc
set nu "num line
set tabstop=4
set shiftwidth=4
set cindent
set smarttab
set expandtab "set tab to space
set autoindent
syntax on
"hi comment ctermfg=cyan
hi comment ctermfg=blue
"prefer ^
"let comment color be blue. instead of dark blue
"super TAB
function InsertTabWrapper()
    let col = col('.') - 1
    if !col || getline('.')[col - 1] !~ '\k'
        return "\<tab>"
    else
        return "\<c-p>"
    endif
endfunction
inoremap <TAB> <C-R>=InsertTabWrapper()<CR>
"my rc
imap jk <ESC>
let mapleader = "\<Space>"
nmap <Leader>r :<C-P><CR>
nmap <Leader>x :x<CR>
nmap <Leader>w :w<CR>
nmap <Leader>q :q<CR>
nmap <Leader>n :n<CR>
nmap <Leader>N :N<CR>
nmap <Leader>jq :q!<CR>
nmap <Leader>/ :noh<CR>
nmap <Leader>; :
nmap <Leader>= mcHmhLmlgg=G`h`l`c
noremap H ^
noremap L $
set clipboard=unnamedplus
set hlsearch
```

### 認識 Vundle

學會了一些簡單的 vim 配置之後，就可以嘗試別人寫的套件。
vim 有很多套件管理器，像是 `vundle`, `vim-plug` 等。

我只用過 vundle，簡單來說他就是可以抓 GitHub 上別人寫好的套件來用。

詳情可以參考 [這篇](https://blog.gtwang.org/linux/vundle-vim-bundle-plugin-manager/)。

簡單來說就是先 clone vundle 到 .vim 下面的目錄，然後在 .vimrc 裡面加上一下設定。

接著在 vimrc 裡面新增想要的套件，接著再 `:PluginInstall` 即可。

之前的 tab 補全是學長簡單用 vim script 寫得，
想要進階一點可以改用 youcompleteme （但好像不太好裝）或是用簡單的 `ervandew/supertab`。

lisp 愛好者不能錯過 `luochen1990/rainbow`。
`majutsushi/tagbar` 也可以讓他變得更像 IDE，搭配 `scrooloose/nerdtree` 就更潮了。

再加上個 `vim-airline/vim-airline` 加上 powerline 字型直呼完美。

如果你是盤古之白的信仰者，還可以裝個 `hotoo/pangu.vim`。

`shougo/vimshell.vim` 也挺好玩的，當然，好玩的東西還有很多，待各位探索。

### 認識 SapceVim

SpaceVim 集各家大成，我一直到了第五年才入坑。
之前一直覺得自己用用 Vundle 就夠了，這樣自訂性也高，
但後來用得東西越來越雜，設定檔修修補補也越來越無心維護。

那有沒有設定更少，然後功能更強的方法？我遇到了 SpaceVim。

大概是在接觸 ale 後，覺得要 trace code 和 syntax check 上還是需要精進，
但是自己又懶得折騰，這時同學提到了 Language Server Protocol (LSP)。

他在代碼補全，trace code 和 syntax check 上都可以使用，而且幾乎每個語言都有實作可以接。

裝了 vim-lsp，但覺得禁不起太多次折騰。這時我發現了 SpaceVim 的 layer 有 lsp 可以用！

而且 SpaceVim 安裝簡單，只要一行： `curl -sLf https://spacevim.org/install.sh | bash`。

比較麻煩的可能就是要另外安裝字型吧，不過裝完後也就挺漂亮就是了。

功能很多，使用上不時會發現一些意想不到的快捷鍵 :)

不過我還是會把之前習慣的 binding 蓋上去就是了w
