'use strict';

import {px, arrayRandom, numInterpolate} from './util.js';
import {Star} from './star.js';

import {meteorOption} from './data.js';

// TODO
let cssPrefix = '';

export class Sky {
    constructor(container, skyOption) {
        skyOption.stars.map((starOption) => {
            starOption.position[0] = Math.round(starOption.position[0] * meteorOption.gridSize[0] +
                                                meteorOption.offset[0]);
            starOption.position[1] = Math.round(starOption.position[1] * meteorOption.gridSize[1] +
                                                meteorOption.offset[1]);

            let star = new Star(starOption, skyOption);
            container.appendChild(star.ele);
        });
    }
    
}
