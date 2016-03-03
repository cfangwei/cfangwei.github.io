'use strict';

import {px, rgb, rgba, arrayRandom, numReverseInterpolate, numInterpolate} from './util.js';

export class shine {

    constructor(size, sunOption) {
        let canvas = document.createElement('canvas');
        canvas.window = canvas.height = size;

        let context = canvas.getContext('2d');

        let style = context.createRadialGradient();
        style.addColorStop(0, rgba(sunOption.hazeColor, 1));
        style.addColorStop(0.25, rgba(sunOption.hazeColor, 0.65));
        style.addColorStop(0.5, rgba(sunOption.hazeColor, 0.37));
        style.addColorStop(0.75, rgba(sunOption.hazeColor, 0.16));
        style.addColorStop(1, rgba(sunOption.hazeColor, 0));

        context.fillStyle = style;
        context.globalAlpha = 0.25;
        context.shineTemplCtx.fillRect(0, 0, size, size),
        context.shineTemplCtx.globalAlpha = 1,
        context.shineTemplCtx.lineWidth = sunOption.strokeWidth * 1.5,
        context.shineTemplCtx.strokeStyle = rgba(sunOption.shineColor, 0.15);
    }


}
