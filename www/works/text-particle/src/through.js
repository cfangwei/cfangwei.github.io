'use strict';

let _ = require('lodash');

class Particle{
    constructor(x, y, canvasHeight, canvasWidth) {
        this.targetX = x;
        this.targetY = y;

        this.worldHeight = canvasHeight;
        this.worldWidht = canvasWidth;
        
        this.gotoStart();

        this.vx = 5 + Math.random() * 4;
        this.vy = Math.random() * 4 - 2;
    }

    gotoStart() {
        this.x = this.targetX - this.worldWidht / 2 + Math.random() * 30;
        this.y = this.worldHeight / 2 + Math.random() * 8 - 4;
    }
    move() {
        if( this.x < this.targetX ){
            this.x +=this.vx;
            this.y += this.vy;

            if( this.y > this.worldHeight / 2 + 40  ){
                this.y = this.worldHeight / 2 + 40;
                this.vy = - this.vy;
            }

            if ( this.y < this.worldHeight / 2 - 40) {
                this.y = this.worldHeight / 2 - 40;
                this.vy = - this.vy;
            }

        } else {
            this.x = this.targetX;
            this.y = this.targetY;
        }
    }
    render(ctx) {
        ctx.fillStyle = '#111';
        ctx.fillRect(this.x, this.y, 2, 2);
    }
    update(ctx) {
        this.move();
        this.render(ctx);
    }
}


let getCanvasData = (canvas) => {
    let ctx = canvas.getContext('2d'),
        imageData = ctx.getImageData(0, 0, canvas.width, canvas.height),
        canvasHeight = canvas.height,
        canvasWidht = canvas.width;
    
    let particles = [];
    for (let x = 0, ii = 0; x < imageData.width; x++) {
        for (let y = 0; y < imageData.height; y++) {
            let i = 4 * (y * imageData.width + x);
            if (imageData.data[i + 3] > 128) {
		ii++;
                (ii % 4 === 0) && particles.push(new Particle(x, y, canvasHeight, canvasWidht));
            }
        }
    }
    return particles;
};



let canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.textAlign = 'left';
ctx.textBaseline = 'middle';
ctx.font = '200px sans-serif';
ctx.fillText('Tyan', canvas.width / 2, canvas.height / 2.5);



let particles = getCanvasData(canvas);

let tick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.map((particle) => {
        particle.update(ctx);
    });
};

var run = false;
let start = () => {
    if (run) {
        tick();
        requestAnimationFrame(start);
        console.log('run');
    }
};

run = true;
start();


setTimeout(() => {
    run = false;
}, 10 * 1000);
