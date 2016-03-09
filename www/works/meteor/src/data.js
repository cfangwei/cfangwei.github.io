'use strict';

import {rgb} from './util.js';

let meteorColor = [[185, 164, 255], [83, 236, 184]];

let skysOptions = [{
    r: 7,
    strokeWidth: 4,
    strokeColor: rgb(meteorColor[0]),
    stars: [{
        position: [3, 0],
        opacity: 0.1
    }, {
        position: [0, 2],
        opacity: 0.2
    }, {
        position: [2, 3],
        opacity: 0.3
    }, {
        position: [4, 2],
        opacity: 0.3
    }, {
        position: [1, 6],
        opacity: 0.3
    }, {
        position: [2, 9],
        opacity: 0.3
    }, {
        position: [8, 3],
        opacity: 0.4
    }, {
        position: [4, 4],
        opacity: 0.4
    }, {
        position: [5, 5],
        opacity: 0.4
    }, {
        position: [4, 6],
        opacity: 0.4
    }, {
        position: [5, 8],
        opacity: 0.4
    }, {
        position: [7, 4],
        opacity: 0.5
    }, {
        position: [7, 5],
        opacity: 0.5
    }, {
        position: [6, 6],
        opacity: 0.5
    }, {
        position: [6, 7],
        opacity: 0.5
    }]
}, {
    r: 10,
    strokeWidth: 2,
    strokeColor: rgb(meteorColor[1]),
    stars: [{
        position: [15, 5],
        opacity: 0.5
    }, {
        position: [15, 9],
        opacity: 0.5
    }, {
        position: [14, 10],
        opacity: 0.5
    }, {
        position: [13, 11],
        opacity: 0.5
    }, {
        position: [16, 4],
        opacity: 0.4
    }, {
        position: [17, 6],
        opacity: 0.4
    }, {
        position: [17, 9],
        opacity: 0.4
    }, {
        position: [16, 10],
        opacity: 0.4
    }, {
        position: [17, 10],
        opacity: 0.4
    }, {
        position: [16, 12],
        opacity: 0.4
    }, {
        position: [18, 5],
        opacity: 0.3
    }, {
        position: [18, 8],
        opacity: 0.3
    }, {
        position: [19, 10],
        opacity: 0.3
    }, {
        position: [22, 4],
        opacity: 0.2
    }, {
        position: [23, 6],
        opacity: 0.2
    }, {
        position: [21, 7],
        opacity: 0.2
    }, {
        position: [21, 9],
        opacity: 0.2
    }, {
        position: [23, 2],
        opacity: 0.2
    }]
}];

let ringsOption = [[97, 0.1], [127, 0.08], [177, 0.06], [254, 0.04], [361, 0.02]];

let sunOption = {
    r: 80,
    position: [464, 369],
    strokeWidth: 2,
    attractRange: 70,
    pushRange: [97, 127, 177],
    shineRange: 250,
    shineColor: [204, 248, 255],
    shineSize: 0.6,
    shineSegments: 10,
    hazeColor: [134, 145, 255],
    hazeSize: 100
};

const meteorOption = {
    width: 1200,
    height: 700,
    gridSize: [50, 50],
    offset: [11, 18],
    meteorInterval: [1e3, 3e3],
    meteorLimit: 4,
    meteorDuration: 8e3,
    meteorCurvePoints: 300,
    meteorShades: 8,
    meteorSegments: 16,
    meteorWidth: [2, 5],
    meteorAlpha: [0.05, 0.12]
};

const cssPrefix = '';

const meteorCurvePoints = 300;

const meteorInterval = [1e3, 3e3];

export {skysOptions, ringsOption, sunOption, meteorColor, meteorInterval,
        meteorOption, cssPrefix, meteorCurvePoints};
