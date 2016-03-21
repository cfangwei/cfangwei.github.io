'use strict';

let _ = require('lodash');

const BirdBodySize = 15,
      degUnit =  Math.PI / 180,
      d60 = degUnit * 60;

export class Bird{
    constructor(size, x, y) {
        this.size = size;
        
        this.x = x;
        this.y = y;

        this.lenght = 30;

        this.angle = 0;
        this.angleChange = this.angleUp;
    }

    angleUp() {
        this.angle += 0.1;
        if( this.angle >= d60 ){
            this.angleChange = this.angleDown;
        }
    }

    angleDown() {
        this.angle -= 0.1;
        if( this.angle <= 0 ){
            this.angleChange = this.angleUp;
        }
    }

    angleChange () {}
    
    move() {
        
        this.angleChange();
    }

    render(ctx) {
        let wingx = Math.cos(this.angle) * this.lenght,
            wingy = Math.sin(this.angle) * this.lenght;
        
        // ctx.fillRect(this.x, this.y, BirdBodySize, BirdBodySize);
        // ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + wingx, this.y - wingy);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - wingx, this.y +- wingy);
        ctx.stroke();
    }
}


export class BirdWorld{
    constructor(width, height, BirdN, canvas) {
        this.width = width;
        this.height = height;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        this.birds = [];
        
        for(let i = 0; i < BirdN; ++i) {
            this.birds.push(new Bird(BirdBodySize, Math.random() * width,
                                   Math.random() * height));
        }
        
    }

    resize(width, height) {
        
    }

    render() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.birds.map((bird) => {
            bird.move();
            bird.render(this.ctx);
        });
    }
}


let canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let birdWorld = new BirdWorld(canvas.width, canvas.height, 10, canvas);

birdWorld.render();


let stop = false;
let tick = () => {
    if( stop ){
        return;
    }
    birdWorld.render();
    requestAnimationFrame(tick);
};

tick();


