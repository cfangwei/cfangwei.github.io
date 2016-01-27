var $ = require('jquery');

var stageController = require('../../../src/lib/stage-controller');

var TweenLite = require('../../../src/vendor/tweenlite.js');

import {isTouch} from '../../../src/lib/detector';
import {randomFloat, randomInteger} from '../../../src/lib/util.js';

require('./main.scss');

var WaveInCircle = WaveInCircle || (function() {
    var X,
        D,
        A,
        ai = 8,
        p = ai - 2,
        y = 0.96,
        r = 0.04, i = 0.06, h = 0.03, u = 100, T = 0, O = 0, wavecircleWorld, context, ab = false, ah = false,
        f,
        e,
        g,
        wavecircleGuide,
        wavecircle,
        W,
        U,
        P,
        w,
        q,
        L = {
            left: 0,
            top: 0
        },
        wavecircleBtBlue,
        wavecircleBtRainbow,
        N = 0,
        circleWidth = 466,
        circleHeight= 466,
        template =
        '<div class="contents-data">'+
        '<div id="wavecircle">'+
        '<canvas id="wavecircle-world" class="chand-updown"></canvas>'+
        '<div id="wavecircle-btcon">'+
        '<div id="wavecircle-bt-blue" class="wavecircle-bt">'+
        '<p></p>'+
        '</div>'+
        '<div id="wavecircle-bt-rainbow" class="wavecircle-bt">'+
        '<p></p>'+
        '<ul><li></li><li></li><li></li><li></li><li></li></ul>'+
        '</div></div></div>'+
        '<div id="wavecircle-guide" class="contents-guide"><div class="guide-mouse"></div><div class="guide-tooltip">press & move</div></div></div>';

    function init(container) {
        container.innerHTML = template;
        ab = false;
        X = [];
        D = [];
        A = [];

        for (let i = 0; i < ai; i++) {
            let ak = {};
            ak.x = circleWidth / (ai - 1) * i;
            ak.y = circleHeight;
            ak.vy = Math.random() * 40 - 20;
            X[i] = ak;
            
            let am = {};
            am.x = circleWidth / (ai - 1) * i;
            am.y = circleHeight;
            am.vy = Math.random() * 40 - 20;
            D[i] = am;
            
            let al = {};
            al.x = circleWidth / (ai - 1) * i;
            al.y = circleHeight;
            al.vy = Math.random() * 40 - 20;
            A[i] = al
        }
        W = {
            r: 189,
            g: 100,
            b: 46
        };
        U = {
            r: 196,
            g: 100,
            b: 39
        };
        P = {
            r: 207,
            g: 100,
            b: 31
        };
        wavecircleWorld = document.getElementById('wavecircle-world');
        wavecircleWorld.width  = circleWidth;
        wavecircleWorld.height = circleHeight;
        context = wavecircleWorld.getContext('2d');
        
        wavecircleBtBlue = $('#wavecircle-bt-blue');
        wavecircleBtRainbow = $('#wavecircle-bt-rainbow');
        N = 0;
        
        wavecircleBtBlue.removeClass('blue-out').addClass('blue-over');
        wavecircleBtRainbow.removeClass('rainbow-over').addClass('rainbow-out');
        
        wavecircle = document.getElementById('wavecircle');
        //wavecircle.appendChild(CMDetect.circleMask);
        wavecircleGuide = document.getElementById('wavecircle-guide');
        w = null;
        stageController.addResize('WaveInCircle', resizeFn);
    }
    
    function start() {
        q = 0;
        g = -1;
        requestAnimationFrame(requestAnimate);
        // w = TweenLite.delayedCall(3.2, aa);
        // if (isTouch()) {
        //     wavecircleBtBlue
        //         .on("click", blueClickFn);
            
        //     wavecircleBtRainbow
        //         .on('click', rainbowClickFn);
            
        // } else {
        //     wavecircleBtBlue
        //         .on('click', blueClickFn)
        //         .on('mouseenter', blueMouseEnter)
        //         .on('mouseleave', blueMouseLeave);
            
        //     wavecircleBtRainbow
        //         .on('click', rainbowClickFn)
        //         .on('mouseenter', rainbowMouseEnter)
        //         .on('mouseleave', blueMouseLeave);
        // }
    }
    function dispose() {
        stageController.removeResize("WaveInCircle");
        CMUtiles.removeDom(CMDetect.circleMask);
        if (wavecircleGuide != null ) {
            TweenLite.killTweensOf(wavecircleGuide);
        }
        wavecircleGuide = null ;
        if (w != null ) {
            TweenLite.killTweensOf(w);
        }
        w = null ;
        wavecircleBtBlue.off();
        wavecircleBtRainbow.off();
        wavecircleBtBlue = null ;
        wavecircleBtRainbow = null ;
        ab = true;
        b();
        ah = false;
        wavecircleWorld = null ;
        context = null ;
        wavecircle = null;
    }
    function pause() {
        ab = true;
        b();
        ah = false;
        T = O = 0;
        if (w != null ) {
            w.pause();
        }
    }
    function resume() {
        ab = false;
        g = -1;
        requestAnimationFrame(requestAnimate);
        if (w == null ) {
            k();
        } else {
            w.resume();
        }
    }
    function k() {
        stageController.addDown("waveinacircle", n);
        stageController.addMove("waveinacircle", s);
        stageController.addUp("waveinacircle", ag);
    }
    function b() {
        stageController.removeDown("waveinacircle", n);
        stageController.removeMove("waveinacircle", s);
        stageController.removeUp("waveinacircle", ag);
    }
    
    function resizeFn() {
        var ak = stageController.stageWidth, al = stageController.stageHeight, am;
        f = (ak - circleWidth) >> 1;
        e = ((al - circleHeight) >> 1);
        if (al > 710) {
            am = e
        } else {
            am = (e - 25);
        }
        wavecircle.style[CMDetect.cssHead] = "translate(" + f + "px, " + am + "px)";
    }
    function aa() {
        wavecircleGuide.style.display = "block";
        
        TweenLite.set(wavecircleGuide, {
            css: {
                opacity: 0,
                x: (f + 300),
                y: (e + 60)
            }
        });
        w = TweenLite.to(wavecircleGuide, 0.2, {
            css: {
                opacity: 1
            },
            onComplete: B
        });
    }
    function B() {
        w = TweenLite.to(wavecircleGuide, 0.6, {
            delay: 1,
            css: {
                x: f + 240,
                y: e + 420
            },
            onUpdate: R,
            onComplete: z
        });
    }
    function z() {
        w = TweenLite.to(wavecircleGuide, 0.6, {
            css: {
                x: f + 120,
                y: e + 60
            },
            onUpdate: R,
            onComplete: G
        });
    }
    function R() {
        var ak = wavecircleGuide.getBoundingClientRect();
        J(ak.left, ak.top);
    }

    function G() {
        T = 0;
        O = 0;
        w = null ;
        TweenLite.to(wavecircleGuide, 0.2, {
            css: {
                opacity: 0
            },
            onComplete: H
        });
    }
    function H() {
        CMUtiles.removeDom(wavecircleGuide);
        k();
    }
    function blueClickFn() {
        if (N === 0) {
            return;
        }
        N = 0;
        wavecircleBtBlue.removeClass('blue-out').addClass('blue-over');
        wavecircleBtRainbow.removeClass('rainbow-over').addClass('rainbow-out');
        TweenLite.to(W, 0.8, {
            r: 189,
            g: 100,
            b: 46
        });
        TweenLite.to(U, 0.8, {
            r: 196,
            g: 100,
            b: 39
        });
        TweenLite.to(P, 0.8, {
            r: 207,
            g: 100,
            b: 31
        });
    }
    
    function rainbowClickFn() {
        if (N === 1) {
            return;
        }
        N = 1;
        wavecircleBtBlue.removeClass('blue-over').addClass('blue-out');
        wavecircleBtRainbow.removeClass('rainbow-out').addClass('rainbow-over');
        TweenLite.to(W, 0.8, {
            r: 0,
            g: 100,
            b: 50
        });
        TweenLite.to(U, 0.8, {
            r: 60,
            g: 100,
            b: 50
        });
        TweenLite.to(P, 0.8, {
            r: 180,
            g: 100,
            b: 50
        });
    }
    function blueMouseEnter() {
        if (N === 0) {
            return;
        }
        TweenLite.killTweensOf(wavecircleBtBlue);
        TweenLite.killTweensOf(wavecircleBtRainbow);
        TweenLite.to(wavecircleBtBlue, 0.2, {
            css: {
                opacity: 1
            }
        });
        TweenLite.to(wavecircleBtRainbow, 0.2, {
            css: {
                opacity: 0.4
            }
        });
        wavecircleBtBlue.removeClass("blue-out").addClass("blue-over");
        wavecircleBtRainbow.removeClass("rainbow-over").addClass("rainbow-out");
    }
    function rainbowMouseEnter() {
        if (N == 1) {
            return
        }
        TweenLite.killTweensOf(wavecircleBtBlue);
        TweenLite.killTweensOf(wavecircleBtRainbow);
        TweenLite.to(wavecircleBtBlue, 0.2, {
            css: {
                opacity: 0.4
            }
        });
        TweenLite.to(wavecircleBtRainbow, 0.2, {
            css: {
                opacity: 1
            }
        });
        wavecircleBtBlue.removeClass("blue-over").addClass("blue-out");
        wavecircleBtRainbow.removeClass("rainbow-out").addClass("rainbow-over");
    }
    function blueMouseLeave() {
        TweenLite.killTweensOf(wavecircleBtBlue);
        TweenLite.killTweensOf(wavecircleBtRainbow);
        TweenLite.to(wavecircleBtBlue, 0.2, {
            css: {
                opacity: 1
            }
        });
        TweenLite.to(wavecircleBtRainbow, 0.2, {
            css: {
                opacity: 1
            }
        });
        if (N == 1) {
            wavecircleBtBlue.removeClass("blue-over").addClass("blue-out");
            wavecircleBtRainbow.removeClass("rainbow-out").addClass("rainbow-over")
        } else {
            wavecircleBtBlue.removeClass("blue-out").addClass("blue-over");
            wavecircleBtRainbow.removeClass("rainbow-over").addClass("rainbow-out")
        }
    }
    function n(al, ak) {
        ah = true;
        J(al, ak)
    }
    function s(al, ak) {
        if (!ah) {
            return
        }
        J(al, ak)
    }
    function ag() {
        if (!ah) {
            return
        }
        ah = false;
        T = 0;
        O = 0;
        q = 0
    }
    function J(al, ak) {
        var am = ak - e
        , an = al - f;
        if (an < 0 || an > circleWidth || am < 0 || am > circleHeight) {
            return;
        }
        T = an;
        O = am;
        q = 0
    }
    function requestAnimate(frameN) {
    
        if (ab) {
            return;
        }
        requestAnimationFrame(requestAnimate);
        if (!g) {
            g = frameN;
        }
        let ak = frameN,
            al = ak - g;
        
        if (al > 25) {
            g = ak;
            q = q + 1;
            console.log(q);
            if (q > 600) {
                q = 0;
                //K();
            }
            calc2draw();
        }
    }
    function K() {
        var al = e + randomInteger(0, 100)
        , am = f + randomInteger(0, 466)
        
        , top = e + randomInteger(300, 466)
        , left = f + randomInteger(0, 466);
        
        L.left = am;
        L.top = al;
        
        TweenLite.to(L, 0.6, {
            left: left,
            top: top,
            onUpdate: v,
            onComplete: Y
        });
    }
    function v() {
        J(L.left, L.top);
    }
    function Y() {
        T = 0;
        O = 0;
        q = 0
    }
    function calc2draw() {
        context.fillStyle = '#fff';
        context.fillRect(0, 0, circleWidth, circleHeight);
        var  al, ak, an;
        for (let i = 0; i < ai; i++) {
            X[i].vy += (circleHeight / 2 - X[i].y) * r;
            D[i].vy += (circleHeight / 2 - D[i].y + 5) * i;
            A[i].vy += (circleHeight / 2 - A[i].y - 5) * h;
            
            al = T - X[i].x;
            ak = O - circleHeight / 2;
            an = Math.sqrt(al * al + (ak / 2) * (ak / 2));
            
            if (an < u) {
                X[i].vy += (O - X[i].y) * r;
                D[i].vy += (O - D[i].y + 10) * i;
                A[i].vy += (O - A[i].y + 10) * h;
            }
            X[i].vy *= y;
            X[i].y += X[i].vy;
            D[i].vy *= y;
            D[i].y += D[i].vy;
            A[i].vy *= y;
            A[i].y += A[i].vy;
            if (X[i].x !== 0) {
                drawWavecircle(A, W); //aj
                drawWavecircle(X, U);
                drawWavecircle(D, P);
            }
        }
    }
    
    function drawWavecircle(al, rgb) {
        context.beginPath();
        context.fillStyle = 'hsla(' + rgb.r + ', ' + rgb.g + '%, ' + rgb.b + '%, 0.4)';
        context.moveTo(al[0].x, al[0].y);
        var an, ak, ao;
        for (an = 0; an < p; an++) {
            ak = (al[an].x + al[an + 1].x) * 0.5;
            ao = (al[an].y + al[an + 1].y) * 0.5;
            context.quadraticCurveTo(al[an].x, al[an].y, ak, ao);
        }
        context.quadraticCurveTo(al[al.length - 2].x, al[al.length - 2].y, al[al.length - 1].x, al[al.length - 1].y);
        context.lineTo(circleWidth, circleHeight);
        context.lineTo(0, circleHeight);
        context.lineTo(0, al[0].y);
        context.fill();
    }
    return {
        init: init,
        start: start,
        dispose: dispose,
        pause: pause,
        resume: resume,
        resize: resizeFn
    };
})();


WaveInCircle.init($('#app')[0]);

WaveInCircle.start();
