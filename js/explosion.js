/**
 * Created by dfleuren on 24.03.2016.
 */
'use strict'

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var lager = [];


//----------------------------------------------------------------------------

function removeP(){
    console.log("lösche")
    for(var l = lager.length-1, i = l; i >=0 ;i--){
        if(lager[i].life < 0){
            lager[i] = lager[lager.length - 1];
            lager.length--;
        }
    }
}

function particle(alienX, alienY) {
    var _this = this;
console.log("erstelle");
        this.x = alienX;
        this.y = alienY;
        this.umfang = 0.5 + Math.random() * 3;
        this.vx = -1.5 + Math.random() * 5;
        this.vy = -1.5 + Math.random() * 5;

        this.life = 5;

        //test
        this.x = this.x / 2;
        this.y = this.y / 2;

    this.update = function(){
        this.x += this.vx;
        this.y += this.vy;
        this.life--;
    }
}

function clear(){
    ctx.clearRect(0,0,700,400)
}


function zeichne(){
    ctx.fillStyle = "red";
    removeP();
console.log("zeichne")

    for(let i = 0; i < lager.length; i++){
        var p = lager[i];

        ctx.fillRect(p.x-1, p.y-1, p.umfang, p.umfang);
        p.update();
    }
}

function fuellen() {
    console.log("fülle");
    for (let i = 0; i < 20; i++) {
        lager[i] = new particle(700, 400);
    }
}

var t;
function update(){
    if(t != null){
        clearTimeout(t);
    }
    clear();
    zeichne();

    t = setTimeout(update, 33);
}
update();
fuellen(700,400);







