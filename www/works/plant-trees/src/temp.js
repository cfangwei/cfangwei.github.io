
var PlantTrees = PlantTrees || (function() {
    var n = false,
        L = 180,
        C = 140,
        p = 9,
        a = 6,
        e,
        M,
        q,
        F = 1,
        g,
        l,
        m,
        o,
        A,
        D,
        v,
        I,
        E = '<div id="planttrees-con" class="contents-data"><div id="planttrees-bg"></div><canvas id="planttrees"></canvas><div id="planttrees-bt"></div><div id="planttrees-guide" class="contents-guide"><div class="guide-tooltip">press</div><div class="guide-mouse"></div></div></div>';
    function K(N) {
        N.innerHTML = E;
        n = false;
        g = stageController.stageWidth;
        l = stageController.stageHeight;
        F = 1;
        e = document.getElementById("planttrees");
        q = $("#planttrees-bt");
        A = document.getElementById("planttrees-guide");
        D = A.getElementsByClassName("guide-tooltip")[0];
        v = document.getElementById("planttrees-con");
        I = document.getElementById("planttrees-bg");
        o = null ;
        stageController.addResize("PlantTrees", k)
    }
    function w() {
        g = stageController.stageWidth;
        l = stageController.stageHeight;
        A.style.display = "block";
        TweenLite.set(A, {
            css: {
                opacity: 0,
                x: ((g >> 1) - 90),
                y: (l >> 1)
            }
        });
        o = TweenLite.to(A, 0.2, {
            css: {
                opacity: 1
            },
            onComplete: x
        })
    }
    function x() {
        o = TweenLite.to(A, 0.5, {
            onComplete: t
        })
    }
    function t() {
        m = G(g / 2, l);
        J();
        o = TweenLite.to(A, 3, {
            onComplete: s
        })
    }
    function s() {
        g = stageController.stageWidth;
        l = stageController.stageHeight;
        D.innerHTML = "click";
        var N = 110
          , O = 50;
        if (CMDetect.isMobile) {
            N = 190;
            O = 70
        }
        o = TweenLite.to(A, 1, {
            css: {
                x: (g - N),
                y: O
            },
            onComplete: r
        })
    }
    function r() {
        o = TweenLite.to(A, 0.5, {
            onComplete: y
        })
    }
    function y() {
        o = null ;
        TweenLite.to(A, 0.2, {
            css: {
                opacity: 0
            },
            onComplete: z
        })
    }
    function z() {
        CMUtiles.removeDom(A);
        f()
    }
    function u() {
        stageController.removeResize("PlantTrees");
        n = true;
        if (A != null ) {
            TweenLite.killTweensOf(A)
        }
        if (o != null ) {
            TweenLite.killTweensOf(o)
        }
        o = null ;
        c();
        m = null ;
        e = null ;
        q = null ;
        A = null ;
        D = null ;
        v = null ;
        I = null 
    }
    function b() {
        n = true;
        c();
        if (o != null ) {
            o.pause()
        }
    }
    function h() {
        n = false;
        J();
        if (o == null ) {
            f()
        } else {
            o.resume()
        }
    }
    function k() {
        g = stageController.stageWidth;
        l = stageController.stageHeight;
        e.width = g;
        e.height = l;
        M = e.getContext("2d");
        M.lineCap = "round";
        M.globalCompositeOperation = "lighter";
        m = null 
    }
    function J() {
        if (n) {
            return
        }
        requestAnimationFrame(J);
        d()
    }
    function d() {
        if (!m) {
            return
        }
        m.draw(M);
        if (m.complete()) {
            m = null 
        }
    }
    function G(P, N) {
        var Q = CMUtiles.randomFloat(C, L)
          , T = Q - C
          , R = (L - C) / (p - a)
          , S = a + ((0.5 + (T / R)) | 0)
          , O = (Math.random() * 360) | 0;
        return new TreeClass(P,N,Q,-90,O,S,F)
    }
    function f() {
        stageController.addDown("planttrees", j);
        q.on("click", H)
    }
    function c() {
        stageController.removeDown("planttrees");
        q.off("click", H)
    }
    function j(O, N) {
        if (m) {
            return
        }
        if (O < 100 || O > g - 100 || N > l - 70) {
            return
        }
        m = G(O, l)
    }
    function H() {
        if (F == 1) {
            F = 0;
            i()
        } else {
            F = 1;
            B()
        }
    }
    function B() {
        TweenLite.to(v, 1, {
            css: {
                backgroundColor: "#ddd"
            }
        });
        I.style.backgroundPosition = "0px 0px";
        q[0].style.backgroundPosition = "0px 0px";
        k();
        m = G(g / 2, l);
        Address.blackLeft();
        Address.blackTop();
        ConfigModel.isWhite = 0
    }
    function i() {
        TweenLite.to(v, 1, {
            css: {
                backgroundColor: "#222"
            }
        });
        I.style.backgroundPosition = "0px -90px";
        if (CMDetect.isMobile) {
            q[0].style.backgroundPosition = "0px -148px"
        } else {
            q[0].style.backgroundPosition = "0px -74px"
        }
        k();
        m = G(g / 2, l);
        Address.whiteLeft();
        Address.whiteTop();
        ConfigModel.isWhite = 1
    }
    return {
        init: K,
        start: w,
        dispose: u,
        pause: b,
        resume: h,
        resize: k
    }
})();
