'use strict';

import {isObject, randomFloat, randomInteger} from '../../../src/lib/util';

let random = Math.random;

export class Char{
    constructor(char, ww, wh, size, reactDis = 150) {
        this.char = char;
        
        this.vx = random() * 2 - 2;
        this.vy = random() * 2 - 2;

        this.reactDis = reactDis;
        
        this.colorBase = randomInteger(0, 15);
        this.hsla = 'hsla(' + ((360 / 15) * this.colorBase) + ', 100%, 50%, 1)';
        
        this.ww = ww;
        this.wh = wh;

        this.x = random() * ww;
        this.y = random() * wh;

        this.size = size;
        this.radius = size * 3;

        
    }

    reset(worldWidth, worldHeight) {
        this.ww = worldWidth;
        this.wh = worldHeight;
    }

    move(x, y) {

        if(x && y){
            let cx = x - this.x,
                cy = y - this.y;
            
            let dis = cx * cx + cy * cy;
            
            if( dis < this.reactDis * this.reactDis){
                this.x += cx * 0.1 * random();
                this.y += cy * 0.1 * random();

                this.vx += (random() * 2 - 1) * 0.1;
                this.vy += (random() * 2 - 1) * 0.1;
            }    
        }
        
        
        
        this.x += this.vx;
        this.y += this.vy;

        if (this.x > this.ww) {
            this.x = this.ww;
            this.vx = - this.vx;
        }

        if(this.y > this.wh){
            this.y = this.wh;
            this.vy = - this.vy;
        }

        if(this.x < 0){
            this.x = 0;
            this.vx = - this.vx;
        }

        if(this.y < 0){
            this.y = 0;
            this.vy = - this.vy;
        }



    }
    
    render(ctx) {
        let grd = ctx.createRadialGradient(this.x, this.y,
                                           0,
                                           this.x, this.y,
                                           this.radius);
        grd.addColorStop(0, this.hsla);
        grd.addColorStop(1, 'rgba(0,0,0,0)');


        ctx.textBaseline = 'top';
        ctx.font = `${this.size}px Arial`;
        
        ctx.shadowColor = this.hsla;
        ctx.shadowOffsetX = 0; 
        ctx.shadowOffsetY = 0; 
        ctx.shadowBlur = 7;

        ctx.beginPath();
        
        ctx.fillStyle = grd;
        
        ctx.fillText(this.char, this.x, this.y);
        ctx.fill();        
    }

    update(ctx, mx, my) {
        this.move(mx, my);
        this.render(ctx);
    }
}
