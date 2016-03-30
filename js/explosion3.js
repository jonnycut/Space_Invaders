/**
 * Created by UFO on 03.2016.
 */

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var particles = [];

function randomFloat (min, max) {
    return min + Math.random()*(max-min);
}

function Particle () {
    this.s = 1.0;
    this.x = 0;
    this.y = 0;
    this.a = 10;
    this.radius = 10;
    this.color = "";
    this.vX = 0;
    this.vY = 0;
    this.sSpeed = 0.5;

    this.update = function(ms) {
        // verkleinern des Particle
        this.s -= this.sSpeed * ms / 1000.0;

        if (this.s <= 0) {
            this.s = 0;
        }

        // Bewegungsrichtung des Particle
        this.x += this.vX * ms/1000.0;
        this.y += this.vY * ms/1000.0;
    };

    this.draw = function(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.scale(this.scale, this.scale);

        // zeichen des Particle
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI*2, true);
        ctx.closePath();

        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    };
}


function createExplosion(x, y, color, count) {
    var minSize = 5;
    var maxSize = 10;
    var count = count;
    var minSpeed = 60.0;
    var maxSpeed = 200.0;
    var minSSpeed = 1.0;
    var maxSSpeed = 4.0;
    var color = color;


    for (var i = 0; i < 360; i += Math.round(360/count)) {
        var particle = new Particle();

        particle.x = x;
        particle.y = y;

        particle.radius = randomFloat(minSize, maxSize);

        particle.color = color;

        particle.sSpeed = randomFloat(minSSpeed, maxSSpeed);

        var speed = randomFloat(minSpeed, maxSpeed);

        particle.vX = speed * Math.cos(i * Math.PI / 180.0);
        particle.vY = speed * Math.sin(i * Math.PI / 180.0);

        particles.push(particle);
    }
}

function update (frameDelay) {
    // draw a white background to clear canvas
    ctx.fillStyle = "#FFF";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // update and draw particles
    for (var i=0; i<particles.length; i++)
    {
        var particle = particles[i];

        particle.update(frameDelay);
        particle.draw(ctx);
    }
}

canvas.addEventListener('click',function(){

createExplosion(350, 200, "red", 5);
createExplosion(350, 200, "yellow", 15);

setInterval(function(){

    update(1000.0/60.0);
},1000.0/60.0);
});













