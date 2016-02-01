'use strict';

var $ = require('jquery');

var stageController = require('../../../src/lib/stage-controller');

var TweenLite = require('../../../src/vendor/tweenlite.js');



import {randomFloat, randomInteger, addZeros} from '../../../src/lib/util.js';


import {isTouch, cssHead} from '../../../src/lib/detector.js';

console.log(cssHead());

var FlipClock = FlipClock || (function() {
    var j = false, r = 0,
        l = 0,
        q = 0,
        h,
        c,
        g,
        n,
        i = 960,
        o = 200,
        m = '<div id="flipclock" class="contents-data">'+
        '<div class="flipclock-con">'+
        '<ul class="flip flip-hour">'+
        '<li>'+
        '<span><div class="flip-up"><div class="flip-shadow"></div><div class="flip-text">00</div></div><div class="flip-down"><div class="flip-shadow"></div><div class="flip-text">00</div><div class="flip-apm">AM</div></div></span></li><li><span><div class="flip-up"><div class="flip-shadow"></div><div class="flip-text">00</div></div><div class="flip-down"><div class="flip-shadow"></div><div class="flip-text">00</div><div class="flip-apm">AM</div></div></span></li></ul><ul class="flip flip-minute"><li><span><div class="flip-up"><div class="flip-shadow"></div><div class="flip-text">00</div></div><div class="flip-down"><div class="flip-shadow"></div><div class="flip-text">00</div></div></span></li><li><span><div class="flip-up"><div class="flip-shadow"></div><div class="flip-text">00</div></div><div class="flip-down"><div class="flip-shadow"></div><div class="flip-text">00</div></div></span></li></ul></div><div class="flipclock-con2"><ul class="flip flip-second"><li><span><div class="flip-up"><div class="flip-shadow"></div><div class="flip-text">00</div></div><div class="flip-down"><div class="flip-shadow"></div><div class="flip-text">00</div></div></span></li><li><span><div class="flip-up"><div class="flip-shadow"></div><div class="flip-text">00</div></div><div class="flip-down"><div class="flip-shadow"></div><div class="flip-text">00</div></div></span>'+
        '</li>'+
        '</ul>'+
        '</div></div>';
    function init(v) {
        v.innerHTML = m;
        j = false;
        n = $('#flipclock');
        // if (CMDetect.isMobile) {
        //     o = 280
        // }
        stageController.addResize('FlipClock', resizeFn);
    }
    function start() {
        r = 0;
        l = 0;
        q = 0;
        var date = new Date(),
            min = date.getMinutes(),
            sev = date.getSeconds(),
            hour = date.getHours();

        c = min;
        g = hour;
        
        flipMin(min);
        flipHour(hour);
        flipSec(sev);
        
        TweenLite.delayedCall(1, startFlip);
    }
    function resizeFn() {
        var v = stageController.stageWidth - o,
            w = 1;
        if (i > v) {
            w = v / i;
        }
        n[0].style[cssHead()] = 'scale(' + w + ')';
    }
    function dispose() {
        stageController.removeResize('FlipClock');
        j = true;
        TweenLite.killDelayedCallsTo(startFlip);
        n = null;
    }
    function pause() {
        j = true;
        TweenLite.killDelayedCallsTo(startFlip);
    }
    function resume() {
        j = false;
        startFlip();
    }
    function startFlip() {
        if (j) {
            return;
        }
        TweenLite.delayedCall(1, startFlip);
        var date = new Date(),
            min = date.getMinutes(),
            sec = date.getSeconds(),
            hour = date.getHours();
        if (h !== sec) {
            h = sec;
            flipSec(sec);
        }
        if (c !== min) {
            c = min;
            flipMin(min);
        }
        if (g !== hour) {
            g = hour;
            flipHour(hour);
        }
    }
    function flipSec(sec) {
        n.removeClass('play');
        let activeLi = $('ul.flip-second li.active');
        if (activeLi.html() === undefined) {
            activeLi = $('ul.flip-second li').eq(0);
            activeLi.addClass('before')
                .removeClass('active')
                .next('li')
                .addClass('active')
                .closest('#flipclock')
                .addClass('play');
            r = 0;
        } else {
            if (activeLi.is(':last-child')) {
                $('ul.flip-second li').removeClass('before');
                activeLi.addClass('before').removeClass('active');
                activeLi = $('ul.flip-second li').eq(0);
                activeLi.addClass('active').closest('#flipclock').addClass('play');
                r = -1;
            } else {
                $('ul.flip-second li').removeClass('before');
                activeLi.addClass('before').removeClass('active').next('li').addClass('active').closest('#flipclock').addClass('play');
                r = r + 1;
            }
        }
        var nextSec = addZeros(sec, 1);
        let w = $('ul.flip-second li').eq(r + 1);
        w.find('.flip-text').html(nextSec);
    }
    function flipMin(x) {
        n.removeClass('play');
        var y = $('ul.flip-minute li.active'), w;
        if (y.html() === undefined) {
            y = $('ul.flip-minute li').eq(0);
            y.addClass('before')
                .removeClass('active')
                .next('li')
                .addClass('active')
                .closest('#flipclock')
                .addClass('play');
            l = 0;
        } else {
            if (y.is(':last-child')) {
                $('ul.flip-minute li').removeClass('before');
                y.addClass('before').removeClass('active');
                y = $('ul.flip-minute li').eq(0);
                y.addClass('active')
                    .closest('#flipclock')
                    .addClass('play');
                l = -1
            } else {
                $('ul.flip-minute li').removeClass('before');
                y.addClass('before')
                    .removeClass('active')
                    .next('li')
                    .addClass('active')
                    .closest('#flipclock')
                    .addClass('play');
                l = l + 1;
            }
        }
        var v = addZeros(x, 1);
        w = $('ul.flip-minute li').eq(l + 1);
        w.find('.flip-text').html(v);
    }
    function flipHour(w) {
        n.removeClass('play');
        var y = $('ul.flip-hour li.active'), x;
        if (y.html() === undefined) {
            y = $('ul.flip-hour li').eq(0);
            y.addClass('before')
                .removeClass('active')
                .next('li')
                .addClass('active')
                .closest('#flipclock')
                .addClass('play');
            q = 0
        } else {
            if (y.is(':last-child')) {
                $('ul.flip-hour li').removeClass('before');
                y.addClass('before').removeClass('active');
                y = $('ul.flip-hour li').eq(0);
                y.addClass('active')
                    .closest('#flipclock')
                    .addClass('play');
                q = -1
            } else {
                $('ul.flip-hour li').removeClass('before');
                y.addClass('before')
                    .removeClass('active')
                    .next('li')
                    .addClass('active')
                    .closest('#flipclock')
                    .addClass('play');
                q = q + 1;
            }
        }
        var v = 'AM';
        if (w > 12) {
            w = w - 12;
            v = 'PM';
        } else {
            if (w === 12) {
                v = 'PM';
            }
        }
        var z = addZeros(w, 1);
        x = $('ul.flip-hour li').eq(q + 1);
        x.find('.flip-text').html(z);
        x.find('.flip-apm').html(v);
    }
    return {
        init: init,
        start: start,
        dispose: dispose,
        pause: pause,
        resume: resume
    };
})();


FlipClock.init($('#app')[0]);
FlipClock.start();

