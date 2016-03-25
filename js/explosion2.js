/**
 * Created by UFO on 03.2016.
 */

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var fHz = 1000 / 60;
var explosionsLager = [];


class Explosion {

    var particles = [];
    var isDone = false;

    createBoom(x, y) {
        var maxParticle = 12;
        var pSize = 5 + Math.random() * 20;
        var pSpeed = 60.0 + Math.random() * 400.0;
        var pScaleSpeed = 1 + Math.random() * 4;
        var pColor = "red";

        for (var winkel = 0; winkel < 360; winkel += Math.round(360 / maxParticle)) {

            var particle = new Particle;
            particle.parent = this;
            particle.x = x;
            particle.y = y;
            particle.a = pSize;
            particle.c = pColor;
            particle.s = pSpeed;
            particle.z = pScaleSpeed;
            particle.vx = pSpeed * Math.cos(winkel * Math.PI / 180);
            particle.vx = pSpeed * Math.sin(winkel * Math.PI / 180);

            this.particles.push(particle);
        }
    };

    removeParticle(particle) {
        this.particles.removeParticle(particle);    //????????????????????????????????????
    };

    updateParticle() {
        if (this.paricles.length <= 0) {
            this.doneParticle();
            return;
        }
        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].updateParticle()
        }
    };

    drawParticle() {
        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].drawParticle();
        }
    };

    doneParticle() {
        this.isDone = true;
    };
}
;


class Particle {
        var x = x;
        var y = y;
        var a = 10;
        var c = "red";
        var s = 0;
        var zs = 0.5;
        var z = 1.2;
        var vx = 0;
        var vx = 0;
        var parent = null;


    update(){
        var ms = fHz;

        this.z -= this.zs * ms / 1000.0;

        if(this.z <=0){
            this.z = 0;
            this.done();
            return;
        }

        this.x += this.vx * ms / 1000.0;
        this.y += thix.vy * ms / 1000.0;
    };

    done(){
        this.parent.removeParticle(this);
    };

    draw(){
        ctx.save();

        ctx.translate(this.x, this.y);
        ctx.scale(this.ss, this.ss);
        ctx.beginPath();
        ctx.fillRect(this.x,this.y,this.a,this.a,true);
        ctx.closePath();

        ctx.fillStyle = this.c;
        ctx.fill();

        ctx.restore();
    };
};

function removeExplosion(explosion) {
    return explosions.erase(explosion);
}

new Explosion().createBoom(350,200);