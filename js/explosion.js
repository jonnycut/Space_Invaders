/**
 * Created by UFO on 03.2016.
 */

var boomvar = {
    canvas: document.getElementById('canvasExp'),
    ctx: document.getElementById('canvasExp').getContext('2d'),
    particles: [],
    intTime: null
}

function randomFloat(min, max) {
    return min + Math.random() * (max - min);
}

//Ein einzelner Particle
function Particle() {
    this.s = 1.0;
    this.x = 0;
    this.y = 0;
    this.a = 10;
    this.radius = 10;
    this.color = "";
    this.vX = 0;
    this.vY = 0;
    this.sSpeed = 0.5;

    this.update = function (ms) {
        // verkleinern des Particle
        this.s -= this.sSpeed * ms / 1000.0;
        if (this.s <= 0) {
            this.s = 0;
        }

        // Bewegungsrichtung des Particle
        this.x += this.vX * ms / 1000.0;
        this.y += this.vY * ms / 1000.0;
    };

    this.draw = function (ctx) {
        boomvar.ctx.save();
        boomvar.ctx.translate(this.x, this.y);
        boomvar.ctx.scale(this.s, this.s);

        // zeichen des Particle
        boomvar.ctx.beginPath();
        boomvar.ctx.arc(0, 0, this.radius, 0, Math.PI * 2, true);
        boomvar.ctx.closePath();

        boomvar.ctx.fillStyle = this.color;
        boomvar.ctx.fill();
        boomvar.ctx.restore();
    };
}

//Erstellt eine Explosion
function createExplosion(x, y, color, count) {
    var minSize = 5;
    var maxSize = 10;
    var count = count;
    var minSpeed = 60.0;
    var maxSpeed = 200.0;
    var minSSpeed = 1.0;
    var maxSSpeed = 4.0;
    var color = color;


    for (let i = 0; i < 360; i += Math.round(360 / count)) {
        let particle = new Particle();

        particle.x = x;
        particle.y = y;

        particle.radius = randomFloat(minSize, maxSize);
        particle.color = color;
        particle.sSpeed = randomFloat(minSSpeed, maxSSpeed);
        let speed = randomFloat(minSpeed, maxSpeed);
        particle.vX = speed * Math.cos(i * Math.PI / 180.0);
        particle.vY = speed * Math.sin(i * Math.PI / 180.0);

        boomvar.particles.push(particle);
    }
}

//zeichnet die Explosion
function update(frameDelay) {

    boomvar.canvas.width = boomvar.canvas.width;

    // update und zeichne particles
    for (let i = 0; i < boomvar.particles.length; i++) {
        let particle = boomvar.particles[i];

        particle.update(frameDelay);
        particle.draw(boomvar.ctx);
    }
}

//Führt beim Aufruf 2 Explosionen aus
function doExplosion(x,y,color1,color2){
    boomvar.particles.clear;
    clearInterval(boomvar.intTime);
    console.log("Explosion")
    createExplosion(x, y, color1, 15);
    createExplosion(x, y, color2, 25);

    var fd = 1000.0 / 60.0;
    boomvar.intTime = setInterval(function () {
        update(fd);
    }, fd);
}
















