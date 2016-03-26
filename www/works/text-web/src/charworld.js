'use strict';

let _ = require('lodash');

import {stringRandom, charRandom} from '../../../src/util/string.js';
import {isObject, randomFloat, randomInteger} from '../../../src/lib/util';

import {Char} from './char.js';

export class CharWorld{
    constructor(canvas, charN) {

        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.charN = charN;

        this.mouseX = null;
        this.mouseY = null;
        
        this.chars = [];
        _.times(charN, () => {
            this.chars.push(new Char(charRandom(),
                                     this.canvas.width, this.canvas.height,
                                     16));
        });

        

        this.bindEvent();
    }


    bindEvent() {
        this.canvas.addEventListener('mousemove', (event) => {
            this.mouseX = event.clientX;
            this.mouseY = event.clientY;
        });

        this.canvas.addEventListener('mouseout', (event) => {
            this.mouseX = null;
            this.mouseY = null;
        });
    }

    render() {
        this.chars.map((char) => {
            char.update(this.ctx, this.mouseX, this.mouseY);
        });
    }

    tick() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = 'rgb(17, 17, 17)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height); 

        this.render();
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
