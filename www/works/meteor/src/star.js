'use strict';

import {px, rgb,  arrayRandom, numReverseInterpolate, numInterpolate} from './util.js';

import {cssPrefix, meteorOption, meteorColor} from './data.js';

// TODO


export class Star {
    constructor(starOption, skyOption) {
        this.ele = document.createElement('div');
        this.ele.className = 'star';
        this.ele.style.width = this.ele.style.height = px(skyOption.r * 2);
        this.ele.style.left = px(starOption.position[0] - skyOption.r);
        this.ele.style.top = px(starOption.position[1] - skyOption.r);
        this.ele.style.border = skyOption.strokeWidth + 'px solid ' + skyOption.strokeColor;
        this.ele.style.opacity = starOption.opacity;
        this.ele.style[cssPrefix + 'animation-name'] = arrayRandom(['star1', 'star2']);
        this.ele.style[cssPrefix + 'animation-duration'] = numInterpolate(2e3, 1e4, Math.random()) + 'ms';
        this.ele.style[cssPrefix + 'animation-delay'] = numInterpolate(0, 1e3, Math.random()) + 'ms';
    }
}


export class SmallStar {
    constructor(m, g, y, b, w) {
        let o = numReverseInterpolate(0, meteorOption.width, m),
            E = rgb([Math.round(numInterpolate(meteorColor[0][0],
                                               meteorColor[1][0], o)),
                     Math.round(numInterpolate(meteorColor[0][1],
                                               meteorColor[1][1], o)),
                     Math.round(numInterpolate(meteorColor[0][2],
                                               meteorColor[1][2], o))]);
        
        let div = document.createElement('div');
        div.className = 'dot',
        div.style.width = div.style.height =
            px(Math.floor(Math.random() * 3 + 4));
        div.style.left = px(m);
        div.style.top = px(g);
        div.style.backgroundColor = E;
        div.style.opacity = Math.random() * 0.25 + 0.25;
        div.style[cssPrefix + 'animation-name'] =
            arrayRandom(['dot1', 'dot2', 'dot3', 'dot4']);
        div.style[cssPrefix + 'animation-duration'] =
            numInterpolate(1e4, 4e4, Math.random()) + 'ms';
        div.style[cssPrefix + 'animation-delay'] =
            numInterpolate(0, 1e3, Math.random()) + 'ms';

        this.ele = div;
    }
}
