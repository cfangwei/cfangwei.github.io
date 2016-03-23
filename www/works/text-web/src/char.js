'use strict';

import {isObject, randomFloat, randomInteger} from '../../../src/lib/util';

let random = Math.random;

export class Char{
    constructor(char, ww, wh, size) {
        this.char = char;

        this.vx = random() * 7;
        this.vy = random() * 7;
        this.colorBase = randomInteger(0, 15);
        this.hsla = 'hsla(' + ((360 / 15) * this.colorBase) + ', 100%, 50%, 1)';
        
        this.ww = ww;
        this.wh = wh;

        this.x = random() * ww;
        this.y = random() * wh;

        this.size = size;
        this.radius = size * 1.2;
    }

    reset(worldWidth, worldHeight) {
        this.ww = worldWidth;
        this.wh = worldHeight;
    }
    
    render(ctx) {
        let grd = ctx.createRadialGradient(this.x, this.y,
                                           0,
                                           this.x, this.y,
                                           this.radius);
        grd.addColorStop(0, this.hsla);
        grd.addColorStop(1, 'rgba(0,0,0,0)');
        
        ctx.shadowColor = "white";
        ctx.shadowOffsetX = 0; 
        ctx.shadowOffsetY = 0; 
        ctx.shadowBlur = 7;

        ctx.beginPath();
        ctx.fillStyle = grd;

        ctx.textBaseline = 'top';

        ctx.fillText(this.char, this.x, this.y);
        ctx.fill();
        
    }
}
