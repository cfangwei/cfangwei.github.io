'use strict';

import {px, arrayRandom, canvasCircle, numInterpolate, rgba} from './util.js';
import {meteorColor} from './data.js';


export class Sun {
    constructor(sunOption) {
        let dpr = window.devicePixelRatio,
            n = sunOption.r * 2 + 20,
            canvas = document.createElement('canvas');
        
        canvas.width = canvas.height = n * dpr;
        canvas.style.width = canvas.style.height = px(n);
        canvas.style.left = px(sunOption.position[0] - n / 2);
        canvas.style.top = px(sunOption.position[1] - n / 2);
        
        let context = canvas.getContext('2d');
        context.scale(dpr, dpr);
        
        let style = context.createLinearGradient(0, 0, n, n);
        style.addColorStop(0.1, rgba(meteorColor[0], 0.65)),
        style.addColorStop(0.9, rgba(meteorColor[1], 0.65)),
        canvasCircle(context, [n / 2, n / 2], sunOption.r),
        context.lineWidth = sunOption.strokeWidth,
        context.strokeStyle = style,
        context.stroke();

        this.ele = canvas;
    }
}
