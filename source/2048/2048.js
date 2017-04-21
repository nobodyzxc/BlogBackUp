const size = 4 , bckWid = 100;
const dirc = [[0 , -1] , [-1 , 0] , [0 , 1] , [1 , 0]]; //L U R D
const lvClr = ["#eee4da" , "#ede0c8" , "#f2b179" , "#f59563" , "#f67c5f" , "#f65e3b" ,
"#edcf72" , "#edcc61" , "#f9f6f2" , "#f9f6f2" , "#f9f6f2" , "#66ff66" , "#b3ffb3"];

var map , bckNum = 0 , moved = false , pass = false , stopGame = true , score = 0;

var LRng = function(){
    var rtn = true;
    for(var i = 0 ; i < arguments.length ; i++){
        rtn &= (arguments[i] >= 0 && arguments[i] < size);
    }
    return rtn;
}

var rand = function(a , b){ return Math.floor((Math.random() * (b - a) + a)); };

function Bck(y , x , pt){
    bckNum += 1;
    this.lock = false , this.x = x , this.y = y , this.pt = pt;
    this.bck = document.createElement("div");
    this.bck.className = "bck";
    this.setPos = function(){
        this.bck.style.left = String(this.x * bckWid) + 'px';
        this.bck.style.top = String(this.y * bckWid) + 'px';
        this.bck.textContent = String(2 << this.pt);
        this.bck.style.backgroundColor = lvClr[this.pt];
    }

    this.peek = function(){
        var dryPeek = function(selfptr , dy , dx){
            if(LRng(selfptr.y + dy , selfptr.x + dx) && map[selfptr.y + dy][selfptr.x + dx] != 0){
                if(map[selfptr.y][selfptr.x].pt === map[selfptr.y + dy][selfptr.x + dx].pt) stopGame = false;
            }
        }
        dryPeek(this , 1 , 0) , dryPeek(this , 0 , 1);
    }

    this.move = function(d){

        var ny = this.y + dirc[d][0] , nx = this.x + dirc[d][1];

        var setSelfto = function(selfptr , y , x){
            map[y][x] = map[selfptr.y][selfptr.x];
            map[selfptr.y][selfptr.x] = 0;
            selfptr.y = y , selfptr.x = x;
            moved = true;
        }

        while(LRng(nx , ny)){
            if(map[ny][nx] === 0){
                setSelfto(this , ny , nx);
                ny += dirc[d][0] , nx += dirc[d][1];
                continue;
            }
            else if(map[ny][nx].lock === false && map[ny][nx].pt === this.pt){
                this.lock = true , this.pt += 1 , bckNum -= 1;
                map[ny][nx].remove();
                setSelfto(this , ny , nx);
            }
            break;
        }

        this.setPos();
        if(this.pt === 10 && pass === false) alert("2048!") , pass = true;
    }

    this.remove = function(slefptr){
        document.getElementById("map").removeChild(this.bck);
        map[this.y][this.x] = 0;
    }

    this.setPos();
    document.getElementById("map").appendChild(this.bck);
}

function addBck(pt){
    var x , y;
    if(bckNum >= 16) return;
    do{ x = rand(0 , size) , y = rand(0 , size); }while(map[y][x] != 0);
    map[y][x] = new Bck(y , x , pt);
}


function forMap(ybeg , yit , xbeg , xit , fn){
    for(var y = ybeg ; LRng(y) ; y += yit)
        for(var x = xbeg ; LRng(x) ; fn(y , x) , x += xit);
}


function initMap(){

    var MapDiv = document.getElementById("map");
    while(MapDiv.firstChild){
        MapDiv.removeChild(MapDiv.firstChild);
    }
    map = [] , bckNum = 0 , score = 0 , moved = false , pass = false , stopGame = true;

    forMap(0 , 1 , 0 , 1 , function(y , x){ if(x === 0){ map[y] = []; } map[y].push(0); });
    addBck(0) , addBck(rand(0 , 2));
}

function checkGameOver(){
    if(bckNum < 16) return false;
    stopGame = true;
    forMap(0 , 1 , 0 , 1 , function(y , x){ if(map[y][x] != 0) map[y][x].peek(); });
    return stopGame;
}

document.addEventListener("DOMContentLoaded", function(event) {

    var MapDiv = document.createElement("div");
    MapDiv.id = "map";
    document.getElementById("posts").appendChild(MapDiv);
    document.getElementsByClassName("main-inner")[0].style.margin = "0px 324.5px 324.5px";
    document.getElementsByClassName("main-inner")[0].style.height = "100px";
    document.getElementById("main").style.height = "300px";

    document.getElementsByClassName("post-title")[0].style.margin = "0px";
    var stylesheet = document.createElement("link");
    stylesheet.setAttribute("href", "2048.css");
    stylesheet.setAttribute("rel" , "stylesheet");
    document.getElementsByTagName("head")[0].appendChild(stylesheet);

    var googleFontCss = document.createElement("link");
    googleFontCss.setAttribute("href", "https://fonts.googleapis.com/css?family=Gloria+Hallelujah");
        googleFontCss.setAttribute("rel" , "stylesheet");
        document.getElementsByTagName("head")[0].appendChild(googleFontCss);

        var reset = document.createElement("button");
        reset.id = "reset";
        reset.style.display = "inline"
        document.getElementById("posts").appendChild(reset);
        document.getElementById("reset").addEventListener("click", function(){
            initMap();
        });

        initMap();
});

window.addEventListener('keydown', function(event) {

    var moveUnit = function(dir){ return function(y , x){ if(map[y][x] != 0) map[y][x].move(dir); }; }

    switch (event.keyCode) {
        case 37: // Left
            forMap(0 , 1 , 0 , 1 , moveUnit(0));
            break;

        case 38: // Up
            forMap(0 , 1 , 0 , 1 , moveUnit(1));
            break;

        case 39: // Right
            forMap(0 , 1 , size - 1 , -1 , moveUnit(2));
            break;

        case 40: // Down
            forMap(size - 1 , -1 , 0 , 1 , moveUnit(3));
            break;
    }
    if(moved === true){ addBck(rand(0 , 2)) ,  moved = false; }
    forMap(0 , 1 , 0 , 1 , function(y , x){ if(map[y][x] != 0) map[y][x].lock = false; });
    if(pass === false && checkGameOver()){
        forMap(0 , 1 , 0 , 1 , function(y , x){ if(map[y][x] != 0){ score += (2 << map[y][x].pt); } });
        pass = true , setTimeout(function() { alert("GameOver! score: " + String(score)); },10);
    }
} , false);



//返回角度
function GetSlideAngle(dx, dy) {
    returnMath.atan2(dy, dx) * 180 / Math.PI;
}

//根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
function GetSlideDirection(startX, startY, endX, endY) {
    var dy = startY - endY;
    var dx = endX - startX;
    varresult = 0;

    //如果滑动距离太短
    if(Math.abs(dx) < 2 && Math.abs(dy) < 2) {
        returnresult;
    }

    varangle = GetSlideAngle(dx, dy);
    if(angle >= -45 && angle < 45) {
        result = 4;
    }else if (angle >= 45 && angle < 135) {
        result = 1;
    }else if (angle >= -135 && angle < -45) {
        result = 2;
    }
    else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
        result = 3;
    }

    returnresult;
}

//滑动处理
var startX, startY;
document.addEventListener('touchstart',function (ev) {
    startX = ev.touches[0].pageX;
    startY = ev.touches[0].pageY;
}, false);

document.addEventListener('touchend',function (ev) {

    var moveUnit = function(dir){ return function(y , x){ if(map[y][x] != 0) map[y][x].move(dir); }; }

    var endX, endY;
    endX = ev.changedTouches[0].pageX;
    endY = ev.changedTouches[0].pageY;
    var direction = GetSlideDirection(startX, startY, endX, endY);
    switch(direction) {
        case 0:
            alert("没滑动");
            break;
        case 1:
            forMap(0 , 1 , 0 , 1 , moveUnit(1));
            break;
        case 2:
            forMap(size - 1 , -1 , 0 , 1 , moveUnit(3));
            break;
        case 3:
            forMap(0 , 1 , 0 , 1 , moveUnit(0));
            alert("!");
            break;
        case 4:
            forMap(0 , 1 , size - 1 , -1 , moveUnit(2));
            break;
        default:
    }

    if(moved === true){ addBck(rand(0 , 2)) ,  moved = false; }
    forMap(0 , 1 , 0 , 1 , function(y , x){ if(map[y][x] != 0) map[y][x].lock = false; });
    if(pass === false && checkGameOver()){
        forMap(0 , 1 , 0 , 1 , function(y , x){ if(map[y][x] != 0){ score += (2 << map[y][x].pt); } });
        pass = true , setTimeout(function() { alert("GameOver! score: " + String(score)); },10);
    }

}, false);
