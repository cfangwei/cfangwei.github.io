'use strict';

let _ = require('lodash');

import {stringRandom} from '../../../src/util/string.js';
import {isObject, randomFloat, randomInteger} from '../../../src/lib/util';

import {Char} from './char.js';

export class CharWorld{
    constructor(canvas, charN) {

        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.charN = charN;


        
        this.chars = [];
        _.times(charN, () => {
            this.chars.push(new Char(stringRandom(1),
                                     this.canvas.width, this.canvas.height,
                                     randomInteger(18, 22)));
        });

        
        
    }

    render() {
        this.chars.map((char) => {
            char.update(this.ctx);
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
