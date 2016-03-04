'use strict';

import {px, arrayRandom, numInterpolate} from './util.js';

const ringColor = "255,255,255";

export class Ring {
    constructor(ringOption, sunOption) {
        let div = document.createElement('div');
        div.className = 'ring';
        div.style.width = div.style.height = px(ringOption[0] * 2);
        div.style.left = px(sunOption.position[0] - ringOption[0]);
        div.style.top = px(sunOption.position[1] - ringOption[0]);
        div.style.opacity = ringOption[1];
        div.style.border = '1px solid rgb(' + ringColor + ')';
        
        this.ele = div;
    }
}
