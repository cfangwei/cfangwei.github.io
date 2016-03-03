'use strict';

import './animate.scss';
import './style.scss';


import {Sky} from './sky.js';
import {Ring} from './ring.js';
import {Sun} from './sun.js';
import {Meteor} from './meteor.js';
import {SmallStar} from './star.js';
import {canvasDrawRotated, numInterpolate, clamp, px, rgb} from './util.js';
import {skysOptions, ringsOption, sunOption, meteorColor, meteorInterval} from './data.js';
import {cssPrefix, meteorOption, width, height} from './data.js';



let skyContainer = document.querySelector(".sky"),
    skyParallexElContainer = document.querySelector(".sky-parallax"),
    meteorContainer = document.querySelector('.meteors');


let makeFlare = (t, n) => {
    var r = document.createElement('div');
    r.className = 'flare';
    r.style.left = px(t[0]);
    r.style.top = px(t[1]);
    r.style.borderColor = rgb(n);
    //TODO
    skyContainer.appendChild(r);
    
    setTimeout(function() {
        skyContainer.removeChild(r);
    }, 2e3);
};



class Control {
    
    constructor(skyContainer, skyParallexElContainer, meteorContainer) {
        this.skyParallexElContainer = skyParallexElContainer;
        this.skyContainer = skyContainer;
        this.meteorContainer = meteorContainer;

        this.isPlaying = false;
        this.lastTick = 0;
        // this.delta;
        // this.nextMeteor;
        this.meteors = [];
        this.meteorRepo = [];
        this.meteorLimit = 4;
        this.nextAvailableMeteor = 0;

        console.log('sds');
        //TODO
        this.canvas = document.createElement("canvas"),
        this.canvas.width = width,
        this.canvas.height = height,
        this.ctx = this.canvas.getContext("2d"),
        this.ctx.lineCap = "round",
        this.meteorContainer.appendChild(this.canvas);
        
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

        for (let i = 0; i < 10; i++) {
            this.meteorRepo.push(new Meteor(skysOptions, sunOption));
        }
    }

    L(t) {
        this.ctx.globalAlpha = t.shineStrength * 6;
        canvasDrawRotated(this.ctx, t.curvePoints[t.progress.currentIndexClamped].fromSun.ang,
                          this.sunOption.position, function() {
                              this.ctx.drawImage(this.shineTemplCanvas, this.shineCanvasSize / -2, this.shineCanvasSize / -2)
                          });
    }

    A(t) {
        this.ctx.strokeStyle = rgb([Math.round(numInterpolate(this.meteorColor[0][0], this.meteorColor[1][0], t.progress.current)), Math.round(numInterpolate(this.meteorColor[0][1], this.meteorColor[1][1], t.progress.current)), Math.round(numInterpolate(this.meteorColor[0][2], this.meteorColor[1][2], t.progress.current))]);
        var n = t.curvePoints[t.progress.currentIndexClamped];
        for (var r = 0; r < this.meteorShades; r++) {
            var i = r / (this.meteorShades - 1)
            , s = 1 - r / this.meteorShades
            , o = Math.round(this.meteorSegments * s);
            this.ctx.beginPath(),
            this.ctx.moveTo(n.p[0], n.p[1]);
            for (var u = 1; u < o; u++) {
                var a = t.progress.currentIndex - u;
                a = clamp(a, 0, t.curvePoints.length - 1);
                var f = t.curvePoints[a];
                this.ctx.lineTo(f.p[0], f.p[1]);
            }
            this.ctx.lineWidth = numInterpolate(this.meteorWidth[0], this.meteorWidth[1], i);
            var l = numInterpolate(this.meteorAlpha[0], this.meteorAlpha[1], i);
            l *= Math.max(t.shineStrength * 10, 0) + .5,
            this.ctx.globalAlpha = l,
            this.ctx.stroke();
        }
    }

    tick(t) {
        //let tt = this.lastTick;
        
        //t || (t = this.lastTick);
        console.log(this);
        console.log(this.lastTick);
        this.delta = Math.min(100, 50);
        if (t > this.nextMeteor && this.meteors.length < this.meteorLimit) {
            var meteor = this.meteorRepo[this.nextAvailableMeteor];
            this.nextAvailableMeteor = (this.nextAvailableMeteor + 1) % this.meteorRepo.length;
            meteor.controlOption.progress.current = 0;
            meteor.controlOption.speed = 1;
            meteor.controlOption.hasFlare = !1;
            
            this.meteors.push(meteor);
            
            makeFlare(meteor.controlOption.starA.p, meteorColor[0]);
            let r = numInterpolate(meteorInterval[0], meteorInterval[1], Math.random());
            this.nextMeteor = t + r;
        }
        this.ctx.clearRect(0, 0, this.width, this.height);
        for (var i = 0; i < this.meteors.length; i++) {
            var n = this.meteors[i];
            if (n === false)
                continue;n.progress.currentIndex = Math.round(n.progress.current * this.meteorCurvePoints),
            n.progress.currentIndexClamped = clamp(n.progress.currentIndex, 0, n.curvePoints.length - 1),
            n.shineStrength = (1 - n.curvePoints[n.progress.currentIndexClamped].fromSun.len
                               / this.sun.shineRange) * 0.25,
            n.progress.current < 0.2 && (n.shineStrength *= Math.max(n.progress.current, 0) * 5),
            n.shineStrength > 0 && this.L(n),
            this.A(n),
            n.progress.current > n.progress.startTimes.starB && n.speed > 0.9 ? n.speed *= .99 : n.progress.current > n.progress.startTimes.orbit && n.speed < 2 && (n.speed *= 1.005),
            n.progress.current += this.delta / this.meteorDuration * n.speed,
            n.progress.current > 1 && !n.hasFlare && (makeFlare(n.starB.p, this.meteorColor[1]),
                                                      n.hasFlare = !0),
            n.progress.current > 1 + this.meteorLength && (this.meteors[i] = false);
        }
        for (var s = 0; s < this.meteors.length; s++)
            this.meteors[s] === false && this.meteors.splice(s, 1);
        this.lastTick = t,
        this.isPlaying && requestAnimationFrame(this.tick);
    }

    start() {
        if( this.isPlaying ){
            return;
        } else {
            this.lastTick = performance.now();
            this.isPlaying = true;
            this.tick();
        }
    }
}

let mainControl = new Control(skyContainer, skyParallexElContainer, meteorContainer);
mainControl.start();
