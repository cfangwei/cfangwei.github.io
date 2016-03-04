'use strict';

import './animate.scss';
import './style.scss';


import {Sky} from './sky.js';
import {Ring} from './ring.js';
import {Sun} from './sun.js';
import {SmallStar} from './star.js';

import {skysOptions, ringsOption, sunOption, meteorColor} from './data.js';



import {cssPrefix, meteorOption} from './data.js';

let main = () => {
    let skyContainer = document.querySelector(".sky"),
        skyParallexElContainer = document.querySelector(".sky-parallax"),
        meteorContainer = document.querySelector('.meteors');
    
    let sun = new Sun(sunOption);
    skyContainer.appendChild(sun.ele);

    skysOptions.map((skyOption) => {
        new Sky(skyContainer, skyOption);
    });

    ringsOption.map((ringOption) => {
        let ring = new Ring(ringOption, sunOption);
        skyContainer.appendChild(ring.ele);
    });

    let smallStarsNumber = 400;
    while (smallStarsNumber--) {
        let m = 10 + Math.random() * (meteorOption.width - 20),
            g = 10 + Math.random() * (meteorOption.height - 20),
            y = 1 - Math.abs(m - meteorOption.width / 2) / meteorOption.width * 2,
            b = 1 - Math.abs(g - meteorOption.height / 2) / meteorOption.height * 2,
            w = Math.pow(y * b, 2);
        
        if (m > sunOption.position[0] - sunOption.r &&
            m < sunOption.position[0] + sunOption.r &&
            g > sunOption.position[1] - sunOption.r &&
            g < sunOption.position[1] + sunOption.r ||
            Math.random() > w) {
            continue;
        }
        let smallstar = new SmallStar(m, g, y, b, w);
        skyParallexElContainer.appendChild(smallstar.ele);
    }
};

main();
