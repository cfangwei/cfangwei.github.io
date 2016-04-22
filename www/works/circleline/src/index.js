'use strict';

import {CircleLine} from './circleline.js';

let canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let circleLine = new CircleLine(canvas.width / 2, canvas.height / 2, canvas,
                                50, 300, 5, '#000');

circleLine.render2DCircles();
//circleLine.move2D();
circleLine.move3D();
