var WaveInCircle = WaveInCircle || (function() {
    var X,
        D, A, ai = 8, p = ai - 2, y = 0.96, r = 0.04, i = 0.06, h = 0.03, u = 100, T = 0, O = 0, j, x, ab = false, ah = false, f, e, g, I, M, W, U, P, w, q, L = {
        left: 0,
        top: 0
    }, Q, ae, N = 0, af = 466, c = 466, S = '<div class="contents-data"><div id="wavecircle"><canvas id="wavecircle-world" class="chand-updown"></canvas><div id="wavecircle-btcon"><div id="wavecircle-bt-blue" class="wavecircle-bt"><p></p></div><div id="wavecircle-bt-rainbow" class="wavecircle-bt"><p></p><ul><li></li><li></li><li></li><li></li><li></li></ul></div></div></div><div id="wavecircle-guide" class="contents-guide"><div class="guide-mouse"></div><div class="guide-tooltip">press & move</div></div></div>';
    function ad(ao) {
        ao.innerHTML = S;
        ab = false;
        X = [];
        D = [];
        A = [];
        var an, ak, am, al;
        for (an = 0; an < ai; an++) {
            ak = {};
            ak.x = af / (ai - 1) * an;
            ak.y = c;
            ak.vy = Math.random() * 40 - 20;
            X[an] = ak;
            am = {};
            am.x = af / (ai - 1) * an;
            am.y = c;
            am.vy = Math.random() * 40 - 20;
            D[an] = am;
            al = {};
            al.x = af / (ai - 1) * an;
            al.y = c;
            al.vy = Math.random() * 40 - 20;
            A[an] = al
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
        j = document.getElementById("wavecircle-world");
        j.width = af;
        j.height = c;
        x = j.getContext("2d");
        Q = $("#wavecircle-bt-blue");
        ae = $("#wavecircle-bt-rainbow");
        N = 0;
        Q.removeClass("blue-out").addClass("blue-over");
        ae.removeClass("rainbow-over").addClass("rainbow-out");
        M = document.getElementById("wavecircle");
        M.appendChild(CMDetect.circleMask);
        I = document.getElementById("wavecircle-guide");
        w = null ;
        StageController.addResize("WaveInCircle", t)
    }
    function E() {
        q = 0;
        g = -1;
        requestAnimationFrame(ac);
        w = TweenLite.delayedCall(3.2, aa);
        if (CMDetect.isTouch) {
            Q.on("click", F);
            ae.on("click", Z)
        } else {
            Q.on("click", F).on("mouseenter", V).on("mouseleave", m);
            ae.on("click", Z).on("mouseenter", o).on("mouseleave", m)
        }
    }
    function C() {
        StageController.removeResize("WaveInCircle");
        CMUtiles.removeDom(CMDetect.circleMask);
        if (I != null ) {
            TweenLite.killTweensOf(I)
        }
        I = null ;
        if (w != null ) {
            TweenLite.killTweensOf(w)
        }
        w = null ;
        Q.off();
        ae.off();
        Q = null ;
        ae = null ;
        ab = true;
        b();
        ah = false;
        j = null ;
        x = null ;
        M = null 
    }
    function a() {
        ab = true;
        b();
        ah = false;
        T = O = 0;
        if (w != null ) {
            w.pause()
        }
    }
    function l() {
        ab = false;
        g = -1;
        requestAnimationFrame(ac);
        if (w == null ) {
            k()
        } else {
            w.resume()
        }
    }
    function k() {
        StageController.addDown("waveinacircle", n);
        StageController.addMove("waveinacircle", s);
        StageController.addUp("waveinacircle", ag)
    }
    function b() {
        StageController.removeDown("waveinacircle", n);
        StageController.removeMove("waveinacircle", s);
        StageController.removeUp("waveinacircle", ag)
    }
    function t() {
        var ak = StageController.stageWidth, al = StageController.stageHeight, am;
        f = (ak - af) >> 1;
        e = ((al - c) >> 1);
        if (al > 710) {
            am = e
        } else {
            am = (e - 25)
        }
        M.style[CMDetect.cssHead] = "translate(" + f + "px, " + am + "px)"
    }
    function aa() {
        I.style.display = "block";
        TweenLite.set(I, {
            css: {
                opacity: 0,
                x: (f + 300),
                y: (e + 60)
            }
        });
        w = TweenLite.to(I, 0.2, {
            css: {
                opacity: 1
            },
            onComplete: B
        })
    }
    function B() {
        w = TweenLite.to(I, 0.6, {
            delay: 1,
            css: {
                x: f + 240,
                y: e + 420
            },
            onUpdate: R,
            onComplete: z
        })
    }
    function z() {
        w = TweenLite.to(I, 0.6, {
            css: {
                x: f + 120,
                y: e + 60
            },
            onUpdate: R,
            onComplete: G
        })
    }
    function R() {
        var ak = I.getBoundingClientRect();
        J(ak.left, ak.top)
    }
    function G() {
        T = 0;
        O = 0;
        w = null ;
        TweenLite.to(I, 0.2, {
            css: {
                opacity: 0
            },
            onComplete: H
        })
    }
    function H() {
        CMUtiles.removeDom(I);
        k()
    }
    function F() {
        if (N == 0) {
            return
        }
        N = 0;
        Q.removeClass("blue-out").addClass("blue-over");
        ae.removeClass("rainbow-over").addClass("rainbow-out");
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
        })
    }
    function Z() {
        if (N == 1) {
            return
        }
        N = 1;
        Q.removeClass("blue-over").addClass("blue-out");
        ae.removeClass("rainbow-out").addClass("rainbow-over");
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
        })
    }
    function V() {
        if (N == 0) {
            return
        }
        TweenLite.killTweensOf(Q);
        TweenLite.killTweensOf(ae);
        TweenLite.to(Q, 0.2, {
            css: {
                opacity: 1
            }
        });
        TweenLite.to(ae, 0.2, {
            css: {
                opacity: 0.4
            }
        });
        Q.removeClass("blue-out").addClass("blue-over");
        ae.removeClass("rainbow-over").addClass("rainbow-out")
    }
    function o() {
        if (N == 1) {
            return
        }
        TweenLite.killTweensOf(Q);
        TweenLite.killTweensOf(ae);
        TweenLite.to(Q, 0.2, {
            css: {
                opacity: 0.4
            }
        });
        TweenLite.to(ae, 0.2, {
            css: {
                opacity: 1
            }
        });
        Q.removeClass("blue-over").addClass("blue-out");
        ae.removeClass("rainbow-out").addClass("rainbow-over")
    }
    function m() {
        TweenLite.killTweensOf(Q);
        TweenLite.killTweensOf(ae);
        TweenLite.to(Q, 0.2, {
            css: {
                opacity: 1
            }
        });
        TweenLite.to(ae, 0.2, {
            css: {
                opacity: 1
            }
        });
        if (N == 1) {
            Q.removeClass("blue-over").addClass("blue-out");
            ae.removeClass("rainbow-out").addClass("rainbow-over")
        } else {
            Q.removeClass("blue-out").addClass("blue-over");
            ae.removeClass("rainbow-over").addClass("rainbow-out")
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
        if (an < 0 || an > af || am < 0 || am > c) {
            return
        }
        T = an;
        O = am;
        q = 0
    }
    function ac(am) {
        if (ab) {
            return
        }
        requestAnimationFrame(ac);
        if (!g) {
            g = am
        }
        var ak = am
          , al = ak - g;
        if (al > 25) {
            g = ak;
            q = q + 1;
            if (q > 600) {
                q = 0;
                K()
            }
            d()
        }
    }
    function K() {
        var al = e + CMUtiles.randomInteger(0, 100)
          , am = f + CMUtiles.randomInteger(0, 466)
          , an = e + CMUtiles.randomInteger(300, 466)
          , ak = f + CMUtiles.randomInteger(0, 466);
        L.left = am;
        L.top = al;
        TweenLite.to(L, 0.6, {
            left: ak,
            top: an,
            onUpdate: v,
            onComplete: Y
        })
    }
    function v() {
        J(L.left, L.top)
    }
    function Y() {
        T = 0;
        O = 0;
        q = 0
    }
    function d() {
        x.fillStyle = "#fff";
        x.fillRect(0, 0, af, c);
        var am, al, ak, an;
        for (am = 0; am < ai; am++) {
            X[am].vy += (c / 2 - X[am].y) * r;
            D[am].vy += (c / 2 - D[am].y + 5) * i;
            A[am].vy += (c / 2 - A[am].y - 5) * h;
            al = T - X[am].x;
            ak = O - c / 2;
            an = Math.sqrt(al * al + (ak / 2) * (ak / 2));
            if (an < u) {
                X[am].vy += (O - X[am].y) * r;
                D[am].vy += (O - D[am].y + 10) * i;
                A[am].vy += (O - A[am].y + 10) * h
            }
            X[am].vy *= y;
            X[am].y += X[am].vy;
            D[am].vy *= y;
            D[am].y += D[am].vy;
            A[am].vy *= y;
            A[am].y += A[am].vy;
            if (X[am].x != 0) {
                aj(A, W);
                aj(X, U);
                aj(D, P)
            }
        }
    }
    function aj(al, am) {
        x.beginPath();
        x.fillStyle = "hsla(" + am.r + ", " + am.g + "%, " + am.b + "%, 0.4)";
        x.moveTo(al[0].x, al[0].y);
        var an, ak, ao;
        for (an = 0; an < p; an++) {
            ak = (al[an].x + al[an + 1].x) * 0.5;
            ao = (al[an].y + al[an + 1].y) * 0.5;
            x.quadraticCurveTo(al[an].x, al[an].y, ak, ao)
        }
        x.quadraticCurveTo(al[al.length - 2].x, al[al.length - 2].y, al[al.length - 1].x, al[al.length - 1].y);
        x.lineTo(af, c);
        x.lineTo(0, c);
        x.lineTo(0, al[0].y);
        x.fill()
    }
    return {
        init: ad,
        start: E,
        dispose: C,
        pause: a,
        resume: l,
        resize: t
    }
})();
