'use strict';


import {randomFloat, randomInteger} from '../../../src/lib/util.js';

let random = Math.random;

let _ = require('lodash');

let noop = () => {};

let pow = Math.pow, abs = Math.abs;

class Circle {
    constructor(x, y, cx, cy, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        
        this.vx = 0;
        this.vy = 0;

        this.cx = cx;
        this.cy = cy;
        
        this.moveDone = false;

        this.doneFn = null;
    }

    static vectorliy(dis) {
        return dis * 0.4;
    }

    render2d(ctx) {
        this.move2d();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.stroke();
    }

    move2d() {
        if( this.vx === 0 && this.vy === 0 ){
            return;
        }

        this.x += this.vx;
        this.y += this.vy;
        
        let dx = this.cx - this.x,
            dy = this.cy - this.y;
        
        if( Math.pow(dx, 2) + Math.pow(dy, 2) > 2000 ){
            this.vx *= -1;
            this.vy *= -1;
        }

        this.vx *= 0.97;
        this.vy *= 0.97;
        
        if( abs(this.vx) < 0.01 && abs(this.vy < 0.01) ){
            this.vx = 0;
            this.vy = 0;
            this.doneFn();
        }
    }

    calcV() {
        let dx = this.cx - this.x,
            dy = this.cy - this.y;
        
        this.vx = Circle.vectorliy(dx);
        this.vy = Circle.vectorliy(dy);
    }

    regDone(fn) {
        this.doneFn = fn;
    }
}

export class CircleLine {
    constructor(centerX, centerY, canvas, circleOffsetBase, radius, n = 5, color = '#fff') {
        this.centerX = centerX;
        this.centerY = centerY;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.n = n;
        this.color = color;
        this.circleOffsetBase = circleOffsetBase;
        this.radius = radius;
        
        this.circles = [];

        this.run = false;
        _.times(this.n, this.createCircle.bind(this));
    }
    
    clearContent() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    tick2D() {
        if( !this.run ){
            return;
        }
        this.render2DCircles();
        window.requestAnimationFrame(this.tick2D.bind(this));
    }

    move2D() {
        let n = this.n,
            self = this;
        this.circles.map((circle) => {
            circle.calcV();
            circle.regDone(() => {
                --n;
                console.log(n);
                if( n === 0 ){
                    self.run = false;
                }
            });
        });
        this.run = true;
        this.tick2D();
    }

    move3D() {
        
    }
    
    render2DCircles() {
        this.clearContent();
        
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = 1;
        
        this.circles.map((circle) => {
            circle.render2d(this.ctx);
        });
    }
    
    render3DCirecles() {
        
    }

    render3DCircle() {
        
    }
    
    createCircle() {
        let x = this.centerX + randomInteger(- this.circleOffsetBase, this.circleOffsetBase),
            y = this.centerY + randomInteger(- this.circleOffsetBase, this.circleOffsetBase);
        
        this.circles.push(new Circle(x, y, this.centerX, this.centerY, this.radius));
    }
    
    
    
}

