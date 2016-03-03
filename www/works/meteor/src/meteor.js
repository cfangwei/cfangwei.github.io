'use strict';

import {px, rgb,  arrayRandom, numReverseInterpolate, numInterpolate} from './util.js';

import {Vec2} from './vec2.js';

import {meteorCurvePoints} from './data.js';


export class Meteor {
    constructor(skysOptions, sunOption) {
        this.sunOption = sunOption;
        
        let controlOption = {
            starA: {
                toSun: {},
                tang: {},
                toStarB: {}
            },
            starB: {
                toSun: {},
                tang: {}
            },
            orbit: {},
            progress: {
                current: 0
            },
            speed: 1,
            curvePoints: []},
            
            i = Math.floor(Math.random() * skysOptions[0].stars.length),
            s = Math.floor(Math.random() * skysOptions[1].stars.length);
        
        controlOption.starA.p = skysOptions[0].stars[i].position;
        controlOption.starB.p = skysOptions[1].stars[s].position;
        
        skysOptions[0].stars.splice(i, 1);
        skysOptions[1].stars.splice(s, 1);
        
        controlOption.orbit.r = arrayRandom(sunOption.pushRange);
        controlOption.starA.toStarB.vec = Vec2.direction(controlOption.starA.p, controlOption.starB.p);
        controlOption.starA.toStarB.ang = Vec2.angleHorz(controlOption.starA.toStarB.vec);
        controlOption.starA.toSun.vec = Vec2.direction(controlOption.starA.p, sunOption.position);
        controlOption.starB.toSun.vec = Vec2.direction(controlOption.starB.p, sunOption.position);
        
        controlOption.starA.toSun.len = Vec2.lengthFn(controlOption.starA.toSun.vec);
        controlOption.starB.toSun.len = Vec2.lengthFn(controlOption.starB.toSun.vec);
        controlOption.starA.toSun.ang = Vec2.angleHorz(controlOption.starA.toSun.vec);
        controlOption.starB.toSun.ang = Vec2.angleHorz(controlOption.starB.toSun.vec);
        
        while (controlOption.orbit.r > controlOption.starA.toSun.len)
            controlOption.orbit.r = arrayRandom(sunOption.pushRange);
        
        controlOption.orbit.positionlockwise = controlOption.starA.toStarB.ang > controlOption.starA.toSun.ang ? 1 : -1;
        controlOption.starA.tang.len = Math.sqrt(Math.pow(controlOption.starA.toSun.len, 2) -
                                                 Math.pow(controlOption.orbit.r, 2));
        controlOption.starB.tang.len = Math.sqrt(Math.pow(controlOption.starB.toSun.len, 2) -
                                                 Math.pow(controlOption.orbit.r, 2));
        
        controlOption.starA.tang.ang = controlOption.starA.toSun.ang -
            Math.asin(controlOption.orbit.r / controlOption.starA.toSun.len) * controlOption.orbit.clockwise;
        controlOption.starB.tang.ang = controlOption.starB.toSun.ang +
            Math.asin(controlOption.orbit.r / controlOption.starB.toSun.len) * controlOption.orbit.clockwise;
        
        controlOption.starA.tang.vec = Vec2.fromAngle(controlOption.starA.tang.ang, controlOption.starA.tang.len);
        controlOption.starB.tang.vec = Vec2.fromAngle(controlOption.starB.tang.ang, controlOption.starB.tang.len);
        controlOption.starA.tang.p = Vec2.add(controlOption.starA.p, controlOption.starA.tang.vec);
        controlOption.starB.tang.p = Vec2.add(controlOption.starB.p, controlOption.starB.tang.vec);
        controlOption.orbit.enterAng = Vec2.angleHorz(Vec2.direction(sunOption.position, controlOption.starA.tang.p));
        controlOption.orbit.leaveAng = Vec2.angleHorz(Vec2.direction(sunOption.position, controlOption.starB.tang.p));
        controlOption.orbit.enterAng < 0 && (controlOption.orbit.enterAng += Math.PI * 2);
        controlOption.orbit.leaveAng < 0 && (controlOption.orbit.leaveAng += Math.PI * 2);
        controlOption.orbit.leaveAng += Math.PI * 2 * controlOption.orbit.positionlockwise;
        controlOption.orbit.totalAng = Math.abs(controlOption.orbit.leaveAng - controlOption.orbit.enterAng);
        controlOption.orbit.len = controlOption.orbit.totalAng * controlOption.orbit.r;
        
        var o = controlOption.starA.tang.len + controlOption.orbit.len + controlOption.starB.tang.len,
            u = controlOption.starA.tang.len / o,
            a = controlOption.orbit.len / o;
        
         controlOption.progress.startTimes = {
            orbit: u,
            starB: u + a
        },
        this.meteorCurve(controlOption);
        this.controlOption = controlOption;
    }

    meteorCurve(controlOption) {
        for (var n = 0; n < meteorCurvePoints; n++) {
            var r = n / (meteorCurvePoints - 1);

            let s;
            
            if (r < controlOption.progress.startTimes.orbit) {
                let i = numReverseInterpolate(0, controlOption.progress.startTimes.orbit, r);
                
                    s = [numInterpolate(controlOption.starA.p[0], controlOption.starA.tang.p[0], i),
                         numInterpolate(controlOption.starA.p[1], controlOption.starA.tang.p[1], i)];
            } else if (r < controlOption.progress.startTimes.starB) {
                var i = numReverseInterpolate(controlOption.progress.startTimes.orbit,
                                              controlOption.progress.startTimes.starB, r),
                    o = numInterpolate(controlOption.orbicontrolOption.enterAng,
                                       controlOption.orbicontrolOption.leaveAng, i),
                    u = Vec2.fromAngle(o, controlOption.orbicontrolOption.r);
                
                    s = Vec2.add(this.sunOption.position, u);
            } else {
                let i = numReverseInterpolate(controlOption.progress.startTimes.starB, 1, r);
                s = [numInterpolate(controlOption.starB.tang.p[0], controlOption.starB.p[0], i),
                         numInterpolate(controlOption.starB.tang.p[1], controlOption.starB.p[1], i)];
            }
            
            var a = {};
            a.p = s,
            a.fromSun = {},
            a.fromSun.vec = Vec2.direction(this.sunOption.position, s),
            a.fromSun.len = Vec2.lengthFn(a.fromSun.vec),
            a.fromSun.ang = Vec2.angleHorz(a.fromSun.vec),
            controlOption.curvePoints.push(a);
        }
    }
}
