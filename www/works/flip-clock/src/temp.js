'use strict';

var $ = require('jquery');

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
        m = '<div id="flipclock" class="contents-data"><div class="flipclock-con"><ul class="flip flip-hour"><li><span><div class="flip-up"><div class="flip-shadow"></div><div class="flip-text">00</div></div><div class="flip-down"><div class="flip-shadow"></div><div class="flip-text">00</div><div class="flip-apm">AM</div></div></span></li><li><span><div class="flip-up"><div class="flip-shadow"></div><div class="flip-text">00</div></div><div class="flip-down"><div class="flip-shadow"></div><div class="flip-text">00</div><div class="flip-apm">AM</div></div></span></li></ul><ul class="flip flip-minute"><li><span><div class="flip-up"><div class="flip-shadow"></div><div class="flip-text">00</div></div><div class="flip-down"><div class="flip-shadow"></div><div class="flip-text">00</div></div></span></li><li><span><div class="flip-up"><div class="flip-shadow"></div><div class="flip-text">00</div></div><div class="flip-down"><div class="flip-shadow"></div><div class="flip-text">00</div></div></span></li></ul></div><div class="flipclock-con2"><ul class="flip flip-second"><li><span><div class="flip-up"><div class="flip-shadow"></div><div class="flip-text">00</div></div><div class="flip-down"><div class="flip-shadow"></div><div class="flip-text">00</div></div></span></li><li><span><div class="flip-up"><div class="flip-shadow"></div><div class="flip-text">00</div></div><div class="flip-down"><div class="flip-shadow"></div><div class="flip-text">00</div></div></span></li></ul></div></div>';
    function init(v) {
        v.innerHTML = m;
        j = false;
        n ="" $("#flipclock");
        if (CMDetect.isMobile) {
            o = 280
        }
        StageController.addResize("FlipClock", t)
    }
    function start() {
        r = 0;
        l = 0;
        q = 0;
        var x = new Date()
          , w = x.getMinutes()
          , y = x.getSeconds()
          , v = x.getHours();
        c = w;
        g = v;
        k(w);
        f(v);
        s(y);
        TweenLite.delayedCall(1, a)
    }
    function t() {
        var v = StageController.stageWidth - o
          , w = 1;
        if (i > v) {
            w = v / i
        }
        n[0].style[CMDetect.cssHead] = "scale(" + w + ")"
    }
    function dispose() {
        StageController.removeResize("FlipClock");
        j = true;
        TweenLite.killDelayedCallsTo(a);
        n = null 
    }
    function pause() {
        j = true;
        TweenLite.killDelayedCallsTo(a)
    }
    function resume() {
        j = false;
        a()
    }
    function a() {
        if (j) {
            return
        }
        TweenLite.delayedCall(1, a);
        var x = new Date()
          , w = x.getMinutes()
          , y = x.getSeconds()
          , v = x.getHours();
        if (h != y) {
            h = y;
            s(y)
        }
        if (c != w) {
            c = w;
            k(w)
        }
        if (g != v) {
            g = v;
            f(v)
        }
    }
    function s(y) {
        n.removeClass("play");
        var x = $("ul.flip-second li.active"), w;
        if (x.html() == undefined) {
            x = $("ul.flip-second li").eq(0);
            x.addClass("before").removeClass("active").next("li").addClass("active").closest("#flipclock").addClass("play");
            r = 0
        } else {
            if (x.is(":last-child")) {
                $("ul.flip-second li").removeClass("before");
                x.addClass("before").removeClass("active");
                x = $("ul.flip-second li").eq(0);
                x.addClass("active").closest("#flipclock").addClass("play");
                r = -1
            } else {
                $("ul.flip-second li").removeClass("before");
                x.addClass("before").removeClass("active").next("li").addClass("active").closest("#flipclock").addClass("play");
                r = r + 1
            }
        }
        var v = CMUtiles.addZeros(y, 1);
        w = $("ul.flip-second li").eq(r + 1);
        w.find(".flip-text").html(v)
    }
    function k(x) {
        n.removeClass("play");
        var y = $("ul.flip-minute li.active"), w;
        if (y.html() == undefined) {
            y = $("ul.flip-minute li").eq(0);
            y.addClass("before").removeClass("active").next("li").addClass("active").closest("#flipclock").addClass("play");
            l = 0
        } else {
            if (y.is(":last-child")) {
                $("ul.flip-minute li").removeClass("before");
                y.addClass("before").removeClass("active");
                y = $("ul.flip-minute li").eq(0);
                y.addClass("active").closest("#flipclock").addClass("play");
                l = -1
            } else {
                $("ul.flip-minute li").removeClass("before");
                y.addClass("before").removeClass("active").next("li").addClass("active").closest("#flipclock").addClass("play");
                l = l + 1
            }
        }
        var v = CMUtiles.addZeros(x, 1);
        w = $("ul.flip-minute li").eq(l + 1);
        w.find(".flip-text").html(v)
    }
    function f(w) {
        n.removeClass("play");
        var y = $("ul.flip-hour li.active"), x;
        if (y.html() == undefined) {
            y = $("ul.flip-hour li").eq(0);
            y.addClass("before").removeClass("active").next("li").addClass("active").closest("#flipclock").addClass("play");
            q = 0
        } else {
            if (y.is(":last-child")) {
                $("ul.flip-hour li").removeClass("before");
                y.addClass("before").removeClass("active");
                y = $("ul.flip-hour li").eq(0);
                y.addClass("active").closest("#flipclock").addClass("play");
                q = -1
            } else {
                $("ul.flip-hour li").removeClass("before");
                y.addClass("before").removeClass("active").next("li").addClass("active").closest("#flipclock").addClass("play");
                q = q + 1
            }
        }
        var v = "AM";
        if (w > 12) {
            w = w - 12;
            v = "PM"
        } else {
            if (w == 12) {
                v = "PM";
            }
        }
        var z = CMUtiles.addZeros(w, 1);
        x = $("ul.flip-hour li").eq(q + 1);
        x.find(".flip-text").html(z);
        x.find(".flip-apm").html(v);
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
