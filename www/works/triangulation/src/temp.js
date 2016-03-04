var Triangulation = Triangulation || (function() {
    var Z, k, y, v, G, K, B, ag = 4, S = 2, j = {
        no: 0
    }, U, ad, R, s, aa, ac, d, i, T, aj, z, I, x, am, n, h, g, ah, ao, O, e = ["contents/triangulation/tri1.json", "contents/triangulation/tri2.json", "contents/triangulation/tri3.json", "contents/triangulation/tri4.json", "contents/triangulation/tri5.json", "contents/triangulation/tri6.json", "contents/triangulation/tri7.json"], al = ["contents/triangulation/ny1.jpg", "contents/triangulation/ny2.jpg", "contents/triangulation/ny3.jpg", "contents/triangulation/ny4.jpg", "contents/triangulation/ny5.jpg", "contents/triangulation/ny6.jpg", "contents/triangulation/ny7.jpg"], W, Q = '<div id="triangulation-root" class="contents-data"><div id="triangulation-con" class="chand-updown"><div id="triangulation-img"><ul id="triangulation-img-move"><li><img src="contents/triangulation/ny1.jpg" width="466" height="466" /></li><li><img src="contents/triangulation/ny2.jpg" width="466" height="466" /></li><li><img src="contents/triangulation/ny3.jpg" width="466" height="466" /></li><li><img src="contents/triangulation/ny4.jpg" width="466" height="466" /></li><li><img src="contents/triangulation/ny5.jpg" width="466" height="466" /></li><li><img src="contents/triangulation/ny6.jpg" width="466" height="466" /></li><li><img src="contents/triangulation/ny7.jpg" width="466" height="466" /></li></ul></div><canvas id="triangulation-world"></canvas><ul id="triangulation-btcon"><li id="triangulation-bt-1"><p></p></li><li id="triangulation-bt-2"><p></p></li><li id="triangulation-bt-3"><p></p></li><li id="triangulation-bt-4"><p></p></li><li id="triangulation-bt-5"><p></p></li><li id="triangulation-bt-6"><p></p></li><li id="triangulation-bt-7"><p></p></li></ul><div id="triangulation-loading"></div></div><div id="triangulation-guide" class="contents-guide"><div class="guide-mouse"></div><div class="guide-tooltip">press & up/down</div></div></div>';
    function ab(at) {
        at.innerHTML = Q;
        Z = false;
        ah = false;
        d = true;
        W = {
            lines: 12,
            length: 3,
            width: 3,
            radius: 6,
            color: "#fff",
            speed: 1,
            trail: 60,
            shadow: false,
            hwaccel: false,
            zIndex: 2000000000
        };
        if (CMDetect.isMobile) {
            ag = 10;
            S = 6;
            W.width = 9;
            W.length = 9;
            W.radius = 18
        } else {
            if (CMDetect.isTablet) {
                ag = 6;
                S = 3
            }
        }
        k = document.getElementById("triangulation-world");
        k.width = 466;
        k.height = 466;
        y = k.getContext("2d");
        v = document.createElement("canvas");
        v.width = 466;
        v.height = 466;
        G = v.getContext("2d");
        T = $("#triangulation-loading");
        aj = document.getElementById("triangulation-con");
        z = document.getElementById("triangulation-img-move");
        aj.appendChild(CMDetect.circleMask);
        I = document.getElementById("triangulation-guide");
        O = [];
        B = [];
        var ar, ap, aq;
        for (aq = 0; aq < 7; aq++) {
            ar = $("#triangulation-bt-" + (aq + 1));
            ap = ar[0].getElementsByTagName("p")[0];
            O[aq] = ar;
            B[aq] = ap
        }
        i = 0;
        ae();
        StageController.addResize("Triangulation", u)
    }
    function V(aq) {
        Address.unable();
        T.show().spin(W);
        if (K != null ) {
            K = null 
        }
        s = false;
        aa = false;
        if (d) {
            ac = true
        }
        var ap = al[aq]
          , ar = e[aq];
        K = new Image();
        K.src = ap;
        K.onload = an;
        $.ajax({
            url: ar,
            dataType: "json"
        }).done(function(at) {
            f(at)
        }).fail(function(at, av, au) {
            w()
        })
    }
    function an() {
        G.drawImage(K, 0, 0);
        U = G.getImageData(0, 0, 466, 466).data;
        s = true;
        b()
    }
    function f(ap) {
        ad = ap;
        R = ad.length;
        aa = true;
        b()
    }
    function b() {
        if (Z) {
            return
        }
        if (s && aa && ac) {
            N()
        }
    }
    function w() {}
    function E() {
        V(0)
    }
    function D() {
        StageController.removeResize("Triangulation");
        TweenLite.killTweensOf(j);
        c();
        Z = true;
        if (I != null ) {
            TweenLite.killTweensOf(I)
        }
        I = null ;
        if (x != null ) {
            TweenLite.killTweensOf(x)
        }
        x = null ;
        U = null ;
        ad = null ;
        k = null ;
        y = null ;
        v = null ;
        G = null ;
        T = null ;
        aj = null ;
        z = null ;
        O = []
    }
    function a() {
        Z = true;
        TweenLite.killTweensOf(j);
        c();
        if (x != null ) {
            x.pause()
        }
    }
    function m() {
        Z = false;
        if (x == null ) {
            l()
        } else {
            x.resume()
        }
    }
    function u() {
        var ap = StageController.stageWidth, aq = StageController.stageHeight, ar;
        h = (ap - 476) >> 1;
        g = ((aq - 476) >> 1);
        if (aq > 710) {
            ar = g
        } else {
            ar = g - 25
        }
        aj.style[CMDetect.cssHead] = "translate(" + h + "px, " + ar + "px)"
    }
    function N() {
        T.hide().spin(false);
        TweenLite.killTweensOf(j);
        ao = 0;
        n = 0;
        j.no = 0;
        if (d) {
            d = false;
            x = TweenLite.to(j, 3, {
                delay: 0.1,
                no: R,
                onUpdate: M,
                onComplete: X,
                ease: Expo.easeInOut
            })
        } else {
            TweenLite.to(j, 3, {
                delay: 0.1,
                no: R,
                onUpdate: M,
                ease: Expo.easeInOut
            });
            Address.able()
        }
    }
    function X() {
        am = 0;
        var ap = 280;
        if (CMDetect.isMobile) {
            ap = 220
        }
        I.style.display = "block";
        TweenLite.set(I, {
            css: {
                opacity: 0,
                x: (h + ap),
                y: g
            }
        });
        x = TweenLite.to(I, 0.2, {
            css: {
                opacity: 1
            },
            onComplete: C
        })
    }
    function C() {
        x = TweenLite.to(I, 1, {
            delay: 0.6,
            css: {
                y: g + 350
            },
            onUpdate: P,
            onComplete: A
        })
    }
    function A() {
        x = TweenLite.to(I, 1, {
            delay: 0.3,
            css: {
                y: g
            },
            onUpdate: P,
            onComplete: F
        })
    }
    function F() {
        x = null ;
        TweenLite.to(I, 0.2, {
            css: {
                opacity: 0
            },
            onComplete: H
        })
    }
    function H() {
        CMUtiles.removeDom(I);
        am = 1;
        l();
        Address.able()
    }
    function P() {
        var ap = I.getBoundingClientRect();
        L(ap.left, ap.top + 10)
    }
    function M() {
        if (Z) {
            return
        }
        var ap = (0.5 + (j.no)) | 0;
        if (n == ap) {
            return
        }
        n = ap;
        y.clearRect(0, 0, 466, 466);
        var aq;
        for (aq = 0; aq < ap; aq++) {
            ak(aq)
        }
    }
    function ak(ar) {
        var aq, ax, av, au, ap, aw, at;
        at = ad[ar];
        ax = at.nodes[0];
        av = at.nodes[1];
        au = at.nodes[2];
        y.beginPath();
        y.moveTo(ax.x, ax.y);
        y.lineTo(av.x, av.y);
        y.lineTo(au.x, au.y);
        y.lineTo(ax.x, ax.y);
        ap = (ax.x + av.x + au.x) * 0.33333;
        aw = (ax.y + av.y + au.y) * 0.33333;
        aq = ((ap | 0) + (aw | 0) * 466) << 2;
        y.fillStyle = "rgba(" + U[aq] + ", " + U[aq + 1] + ", " + U[aq + 2] + ", 1)";
        y.fill()
    }
    function r(ap) {
        y.clearRect(0, 0, 466, 466);
        ac = false;
        TweenLite.killTweensOf(j);
        V(ap);
        TweenLite.to(z, 0.4, {
            css: {
                left: (466 * -ap)
            },
            onComplete: Y,
            ease: Cubic.easeInOut
        })
    }
    function Y() {
        ac = true;
        b()
    }
    function l() {
        StageController.addDown("triangulation", o);
        StageController.addMove("triangulation", t);
        StageController.addUp("triangulation", af);
        var aq, ap;
        if (CMDetect.isTouch) {
            for (ap = 0; ap < 7; ap++) {
                aq = O[ap];
                aq.off().on("click", J)
            }
        } else {
            for (ap = 0; ap < 7; ap++) {
                aq = O[ap];
                aq.off().on("click", J).on("mouseenter", ai).on("mouseleave", q)
            }
        }
    }
    function c() {
        StageController.removeDown("triangulation", o);
        StageController.removeMove("triangulation", t);
        StageController.removeUp("triangulation", af);
        var aq, ap;
        for (ap = 0; ap < 7; ap++) {
            aq = O[ap];
            aq.off()
        }
    }
    function ai(ar) {
        var at = Number((ar.currentTarget.id).substr(17, 18)) - 1;
        var aq, ap;
        for (ap = 0; ap < 7; ap++) {
            aq = B[ap];
            TweenLite.killTweensOf(aq);
            if (ap == at) {
                TweenLite.to(aq, 0.2, {
                    css: {
                        opacity: 1
                    }
                })
            } else {
                TweenLite.to(aq, 0.2, {
                    css: {
                        opacity: 0.4
                    }
                })
            }
        }
    }
    function q(ar) {
        var aq, ap;
        for (ap = 0; ap < 7; ap++) {
            aq = B[ap];
            TweenLite.killTweensOf(aq);
            TweenLite.to(aq, 0.2, {
                css: {
                    opacity: 1
                }
            })
        }
    }
    function J(ap) {
        i = Number((ap.currentTarget.id).substr(17, 18)) - 1;
        r(i);
        ae()
    }
    function ae() {
        var aq, ap;
        for (ap = 0; ap < 7; ap++) {
            aq = B[ap];
            if (ap == i) {
                aq.style.border = ag + "px solid #fff"
            } else {
                aq.style.border = S + "px solid #fff"
            }
        }
    }
    function o(aq, ap) {
        if (!ac) {
            return
        }
        ah = true;
        L(aq, ap)
    }
    function t(aq, ap) {
        if (!ah || !ac) {
            return
        }
        L(aq, ap)
    }
    function af() {
        if (!ah || !ac) {
            return
        }
        ah = false
    }
    function L(aq, ap) {
        var at = ap - g
          , au = aq - h;
        if (au < 0 || au > 476 || at < 0 || at > 476) {
            return
        }
        var ar = CMUtiles.getCurrent(at, 0, 476, R, 0);
        p(ar)
    }
    function p(ap) {
        if (n == ap) {
            return
        }
        ao = ap;
        TweenLite.killTweensOf(j);
        TweenLite.to(j, am, {
            no: ao,
            onUpdate: M,
            ease: Cubic.easeOut
        })
    }
    return {
        init: ab,
        start: E,
        dispose: D,
        pause: a,
        resume: m,
        resize: u
    }
})();
