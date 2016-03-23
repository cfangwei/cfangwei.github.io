'use strict';

import {stringRandom} from '../../../src/util/string.js';
import {isObject, randomFloat, randomInteger} from '../../../src/lib/util';

let _ = require('lodash');

let random = Math.random;

require('./style.scss');

export class CodeLine {
    constructor(wx, wy, len, color, size, v) {
        this.text = stringRandom(len);
        this.wx = wx;
        this.wy = wy,
        this.len = len;
        this.color = color;
        this.size = size;
        this.v = v;

        this.height = this.size * 1.1 * len;

        this.x = random() * wx;
        this.y = random() * wy;
    }

    
    setWorldSize(width, height) {
        
    }

    render(ctx){
        ctx.font = `${this.size}px _sans`;
        ctx.fillStyle = this.color;
        ctx.textBaseline = 'top';

        let cy = this.y;
        this.text.split('').map((t, i) => {
            ctx.fillText(t, this.x, cy + i * this.size * 1.1); 
        });
        
    }

    move() {
        this.y = this.y + this.v;
        if( this.y > this.wy ){
            this.change();
        }

    }

    change() {
        this.y = 0 - this.height;
        this.x = random() * this.wx;
    }
}



export class CodeWall{
    constructor(canvas, codelineN) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        this.codeLines = [];
        this.run = false;
        
        _.times(codelineN, () => {
            this.codeLines.push(new CodeLine(this.canvas.width,
                                             this.canvas.height, randomInteger(5, 30), 'green',
                                             randomInteger(20, 30), randomInteger(2, 5)));
        });
        
        
    }

    tick() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = '#333';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height); 
        this.codeLines.map((codeLine) => {
            codeLine.move();
            codeLine.render(this.ctx);
        });
        requestAnimationFrame(this.tick.bind(this));
    }

    start() {
        if( this.run ){
            return;
        } else {
            this.run = true;
            this.tick();
        }
    }

    stop() {
        
    }

    resume() {
        
    }
}


let canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let codeWall = new CodeWall(canvas, 200);
codeWall.start();
