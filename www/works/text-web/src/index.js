'use strict';
require('./style.scss');

import {CharWorld} from './charworld.js';
import {Char} from './char.js';


let canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


let charWorld = new CharWorld(canvas, 50);


charWorld.start();
