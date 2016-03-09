
function canvasCircle(e, t, n) {
    e.beginPath(),
    e.arc(t[0], t[1], n, 0, Math.PI * 2)
}
function canvasClearFill(e) {
    e.fillStyle = "black",
    e.globalCompositeOperation = "destination-out",
    e.fill(),
    e.globalCompositeOperation = "source-over"
}
function canvasDrawRotated(e, t, n, r) {
    e.translate(n[0], n[1]),
    e.rotate(t),
    r(),
    e.setTransform(1, 0, 0, 1, 0, 0)
}
function arrayRandom(e) {
    return e[Math.floor(Math.random() * e.length)]
}
function rgb(e) {
    return "rgb(" + e[0] + "," + e[1] + "," + e[2] + ")"
}
function rgba(e, t) {
    return "rgba(" + e[0] + "," + e[1] + "," + e[2] + "," + t + ")"
}
function last(e) {
    return e[e.length - 1]
}
function numInterpolate(e, t, n) {
    return e * (1 - n) + t * n
}
function numReverseInterpolate(e, t, n) {
    return (n - e) / (t - e)
}
function clamp(e, t, n) {
    return Math.max(Math.min(e, n), t)
}
function px(e) {
    return e + "px"
}
function scaleMeteors() {
    window.meteorAnimContainer || (window.meteorAnimContainer = document.querySelector(".page-header .animation"));
    var e = [-188, -138]
    , t = [-148, -98]
    , n = 600
    , r = 1050;
    if (window.innerHeight > r)
        return;
    var i = numReverseInterpolate(n, r, window.innerHeight);
    i = clamp(i, 0, 1),
    meteorAnimContainer.style.marginTop = px(numInterpolate(e[0], e[1], i)),
    meteorAnimContainer.style.marginBottom = px(numInterpolate(t[0], t[1], i))
}
(function() {
    "performance" in window == 0 && (window.performance = {}),
    Date.now = Date.now || function() {
        return (new Date).getTime()
    }
    ;
    if ("now" in window.performance == 0) {
        var e = Date.now();
        performance.timing && performance.timing.navigationStart && (e = performance.timing.navigationStart),
        window.performance.now = function() {
            return Date.now() - e
        }
    }
})(),
"document" in self && ("classList" in document.createElement("_") ? function() {
    "use strict";
    var e = document.createElement("_");
    e.classList.add("c1", "c2");
    if (!e.classList.contains("c2")) {
        var t = function(e) {
            var t = DOMTokenList.prototype[e];
            DOMTokenList.prototype[e] = function(e) {
                var n, r = arguments.length;
                for (n = 0; n < r; n++)
                    e = arguments[n],
                t.call(this, e)
            }
        }
        ;
        t("add"),
        t("remove")
    }
    e.classList.toggle("c3", !1);
    if (e.classList.contains("c3")) {
        var n = DOMTokenList.prototype.toggle;
        DOMTokenList.prototype.toggle = function(e, t) {
            return 1 in arguments && !this.contains(e) == !t ? t : n.call(this, e)
        }
    }
    e = null 
}() : function(e) {
    "use strict";
    if (!("Element" in e))
        return;
    var t = "classList"
    , n = "prototype"
    , r = e.Element[n]
    , i = Object
    , s = String[n].trim || function() {
        return this.replace(/^\s+|\s+$/g, "")
    }
    , o = Array[n].indexOf || function(e) {
        var t = 0
        , n = this.length;
        for (; t < n; t++)
            if (t in this && this[t] === e)
                return t;
        return -1
    }
    , u = function(e, t) {
        this.name = e,
        this.code = DOMException[e],
        this.message = t
    }
    , a = function(e, t) {
        if (t === "")
            throw new u("SYNTAX_ERR","An invalid or illegal string was specified");
        if (/\s/.test(t))
            throw new u("INVALID_CHARACTER_ERR","String contains an invalid character");
        return o.call(e, t)
    }
    , f = function(e) {
        var t = s.call(e.getAttribute("class") || "")
        , n = t ? t.split(/\s+/) : []
        , r = 0
        , i = n.length;
        for (; r < i; r++)
            this.push(n[r]);
        this._updateClassName = function() {
            e.setAttribute("class", this.toString())
        }
    }
    , l = f[n] = []
    , c = function() {
        return new f(this)
    }
    ;
    u[n] = Error[n],
    l.item = function(e) {
        return this[e] || null 
    }
    ,
    l.contains = function(e) {
        return e += "",
        a(this, e) !== -1
    }
    ,
    l.add = function() {
        var e = arguments, t = 0, n = e.length, r, i = !1;
        do
            r = e[t] + "",
        a(this, r) === -1 && (this.push(r),
                              i = !0);
        while (++t < n);i && this._updateClassName()
    }
    ,
    l.remove = function() {
        var e = arguments, t = 0, n = e.length, r, i = !1, s;
        do {
            r = e[t] + "",
            s = a(this, r);
            while (s !== -1)
                this.splice(s, 1),
            i = !0,
            s = a(this, r)
        } while (++t < n);i && this._updateClassName()
    }
    ,
    l.toggle = function(e, t) {
        e += "";
        var n = this.contains(e)
        , r = n ? t !== !0 && "remove" : t !== !1 && "add";
        return r && this[r](e),
        t === !0 || t === !1 ? t : !n
    }
    ,
    l.toString = function() {
        return this.join(" ")
    }
    ;
    if (i.defineProperty) {
        var h = {
            get: c,
            enumerable: !0,
            configurable: !0
        };
        try {
            i.defineProperty(r, t, h)
        } catch (p) {
            p.number === -2146823252 && (h.enumerable = !1,
                                         i.defineProperty(r, t, h))
        }
    } else
        i[n].__defineGetter__ && r.__defineGetter__(t, c)
}(self));
var vec2 = {};
vec2.direction = function(e, t) {
    return [t[0] - e[0], t[1] - e[1]]
}
,
vec2.length = function(e) {
    return Math.sqrt(e[0] * e[0] + e[1] * e[1])
}
,
vec2.distance = function(e, t) {
    var n = vec2.direction(e, t);
    return vec2.length(n)
}
,
vec2.normalize = function(e, t) {
    return t === undefined && (t = vec2.length(e)),
    [e[0] / t, e[1] / t]
}
,
vec2.scale = function(e, t) {
    return [e[0] * t, e[1] * t]
}
,
vec2.add = function(e, t) {
    return [e[0] + t[0], e[1] + t[1]]
}
,
vec2.subtract = function(e, t) {
    return [e[0] - t[0], e[1] - t[1]]
}
,
vec2.angleVert = function(e) {
    return Math.atan2(e[0], e[1])
}
,
vec2.angleHorz = function(e) {
    return Math.atan2(e[1], e[0])
}
,
vec2.interpolate = function(e, t, n) {
    return [e[0] + (t[0] - e[0]) * n, e[1] + (t[1] - e[1]) * n]
}
,
vec2.fromAngle = function(e, t) {
    return [Math.cos(e) * t, Math.sin(e) * t]
}
;
var Meteors = function() {
    function N(t, n) {
        var r = {
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
            curvePoints: []
        }
        , i = Math.floor(Math.random() * e.sky[0].stars.length)
        , s = Math.floor(Math.random() * e.sky[1].stars.length);
        r.starA.p = e.sky[0].stars[i].c,
        r.starB.p = e.sky[1].stars[s].c,
        e.sky[0].stars.splice(i, 1),
        e.sky[1].stars.splice(s, 1),
        r.orbit.r = arrayRandom(e.sun.pushRange),
        r.starA.toStarB.vec = vec2.direction(r.starA.p, r.starB.p),
        r.starA.toStarB.ang = vec2.angleHorz(r.starA.toStarB.vec),
        r.starA.toSun.vec = vec2.direction(r.starA.p, e.sun.c),
        r.starB.toSun.vec = vec2.direction(r.starB.p, e.sun.c),
        r.starA.toSun.len = vec2.length(r.starA.toSun.vec),
        r.starB.toSun.len = vec2.length(r.starB.toSun.vec),
        r.starA.toSun.ang = vec2.angleHorz(r.starA.toSun.vec),
        r.starB.toSun.ang = vec2.angleHorz(r.starB.toSun.vec);
        while (r.orbit.r > r.starA.toSun.len)
            r.orbit.r = arrayRandom(e.sun.pushRange);
        r.orbit.clockwise = r.starA.toStarB.ang > r.starA.toSun.ang ? 1 : -1,
        r.starA.tang.len = Math.sqrt(Math.pow(r.starA.toSun.len, 2) - Math.pow(r.orbit.r, 2)),
        r.starB.tang.len = Math.sqrt(Math.pow(r.starB.toSun.len, 2) - Math.pow(r.orbit.r, 2)),
        r.starA.tang.ang = r.starA.toSun.ang - Math.asin(r.orbit.r / r.starA.toSun.len) * r.orbit.clockwise,
        r.starB.tang.ang = r.starB.toSun.ang + Math.asin(r.orbit.r / r.starB.toSun.len) * r.orbit.clockwise,
        r.starA.tang.vec = vec2.fromAngle(r.starA.tang.ang, r.starA.tang.len),
        r.starB.tang.vec = vec2.fromAngle(r.starB.tang.ang, r.starB.tang.len),
        r.starA.tang.p = vec2.add(r.starA.p, r.starA.tang.vec),
        r.starB.tang.p = vec2.add(r.starB.p, r.starB.tang.vec),
        r.orbit.enterAng = vec2.angleHorz(vec2.direction(e.sun.c, r.starA.tang.p)),
        r.orbit.leaveAng = vec2.angleHorz(vec2.direction(e.sun.c, r.starB.tang.p)),
        r.orbit.enterAng < 0 && (r.orbit.enterAng += Math.PI * 2),
        r.orbit.leaveAng < 0 && (r.orbit.leaveAng += Math.PI * 2),
        r.orbit.leaveAng += Math.PI * 2 * r.orbit.clockwise,
        r.orbit.totalAng = Math.abs(r.orbit.leaveAng - r.orbit.enterAng),
        r.orbit.len = r.orbit.totalAng * r.orbit.r;
        var o = r.starA.tang.len + r.orbit.len + r.starB.tang.len
        , u = r.starA.tang.len / o
        , a = r.orbit.len / o;
        return r.progress.startTimes = {
            orbit: u,
            starB: u + a
        },
        k(r),
        r
    }
    function C(t, n) {
        var r = document.createElement("div");
        r.className = "flare",
        r.style.left = px(t[0]),
        r.style.top = px(t[1]),
        r.style.borderColor = rgb(n),
        e.skyEl.appendChild(r),
        setTimeout(function() {
            e.skyEl.removeChild(r)
        }, 2e3)
    }
    function k(t) {
        for (var n = 0; n < e.meteorCurvePoints; n++) {
            var r = n / (e.meteorCurvePoints - 1);
            if (r < t.progress.startTimes.orbit)
                var i = numReverseInterpolate(0, t.progress.startTimes.orbit, r)
            , s = [numInterpolate(t.starA.p[0], t.starA.tang.p[0], i), numInterpolate(t.starA.p[1], t.starA.tang.p[1], i)];
            else if (r < t.progress.startTimes.starB)
                var i = numReverseInterpolate(t.progress.startTimes.orbit, t.progress.startTimes.starB, r)
            , o = numInterpolate(t.orbit.enterAng, t.orbit.leaveAng, i)
            , u = vec2.fromAngle(o, t.orbit.r)
            , s = vec2.add(e.sun.c, u);
            else
                var i = numReverseInterpolate(t.progress.startTimes.starB, 1, r)
            , s = [numInterpolate(t.starB.tang.p[0], t.starB.p[0], i), numInterpolate(t.starB.tang.p[1], t.starB.p[1], i)];
            var a = {};
            a.p = s,
                a.fromSun = {},
                a.fromSun.vec = vec2.direction(e.sun.c, s),
                a.fromSun.len = vec2.length(a.fromSun.vec),
                a.fromSun.ang = vec2.angleHorz(a.fromSun.vec),
                t.curvePoints.push(a)
        }
    }
    function L(t) {
        e.ctx.globalAlpha = t.shineStrength * 6,
        canvasDrawRotated(e.ctx, t.curvePoints[t.progress.currentIndexClamped].fromSun.ang, e.sun.c, function() {
            e.ctx.drawImage(e.shineTemplCanvas, e.shineCanvasSize / -2, e.shineCanvasSize / -2)
        })
    }
    function A(t) {
        e.ctx.strokeStyle = rgb([Math.round(numInterpolate(e.meteorColor[0][0], e.meteorColor[1][0], t.progress.current)), Math.round(numInterpolate(e.meteorColor[0][1], e.meteorColor[1][1], t.progress.current)), Math.round(numInterpolate(e.meteorColor[0][2], e.meteorColor[1][2], t.progress.current))]);
        var n = t.curvePoints[t.progress.currentIndexClamped];
        for (var r = 0; r < e.meteorShades; r++) {
            var i = r / (e.meteorShades - 1)
            , s = 1 - r / e.meteorShades
            , o = Math.round(e.meteorSegments * s);
            e.ctx.beginPath(),
            e.ctx.moveTo(n.p[0], n.p[1]);
            for (var u = 1; u < o; u++) {
                var a = t.progress.currentIndex - u;
                a = clamp(a, 0, t.curvePoints.length - 1);
                var f = t.curvePoints[a];
                e.ctx.lineTo(f.p[0], f.p[1])
            }
            e.ctx.lineWidth = numInterpolate(e.meteorWidth[0], e.meteorWidth[1], i);
            var l = numInterpolate(e.meteorAlpha[0], e.meteorAlpha[1], i);
            l *= Math.max(t.shineStrength * 10, 0) + .5,
            e.ctx.globalAlpha = l,
            e.ctx.stroke()
        }
    }
    var e = this;
    e.skyEl = document.querySelector(".page-header .animation .sky"),
    e.skyParallaxEl = document.querySelector(".page-header .animation .sky-parallax"),
    e.container = document.querySelector(".page-header .animation .meteors"),
    e.width = 1200,
    e.height = 700,
    e.gridSize = [50, 50],
    e.offset = [11, 18],
    e.meteorInterval = [1e3, 3e3],
    e.meteorLimit = 4,
    e.meteorDuration = 8e3,
    e.meteorCurvePoints = 300,
        e.meteorShades = 8,
        e.meteorSegments = 16,
        e.meteorWidth = [2, 5],
        e.meteorAlpha = [.05, .12],
    e.meteorColor = [[185, 164, 255], [83, 236, 184]],
    e.smallStars = 400,
    e.sun = {
            r: 80,
            c: [464, 369],
            strokeWidth: 2,
            attractRange: 70,
            pushRange: [97, 127, 177],
            shineRange: 250,
            shineColor: [204, 248, 255],
            shineSize: .6,
            shineSegments: 10,
            hazeColor: [134, 145, 255],
            hazeSize: 100
        },
    e.ringColor = "255,255,255",
        e.rings = [[97, .1], [127, .08], [177, .06], [254, .04], [361, .02]],
    e.sky = [{
            r: 7,
            strokeWidth: 4,
            strokeColor: rgb(e.meteorColor[0]),
            stars: [{
                c: [3, 0],
                opacity: .1
            }, {
                c: [0, 2],
                opacity: .2
            }, {
                c: [2, 3],
                opacity: .3
            }, {
                c: [4, 2],
                opacity: .3
            }, {
                c: [1, 6],
                opacity: .3
            }, {
                c: [2, 9],
                opacity: .3
            }, {
                c: [8, 3],
                opacity: .4
            }, {
                c: [4, 4],
                opacity: .4
            }, {
                c: [5, 5],
                opacity: .4
            }, {
                c: [4, 6],
                opacity: .4
            }, {
                c: [5, 8],
                opacity: .4
            }, {
                c: [7, 4],
                opacity: .5
            }, {
                c: [7, 5],
                opacity: .5
            }, {
                c: [6, 6],
                opacity: .5
            }, {
                c: [6, 7],
                opacity: .5
            }]
        }, {
            r: 10,
            strokeWidth: 2,
            strokeColor: rgb(e.meteorColor[1]),
            stars: [{
                c: [15, 5],
                opacity: .5
            }, {
                c: [15, 9],
                opacity: .5
            }, {
                c: [14, 10],
                opacity: .5
            }, {
                c: [13, 11],
                opacity: .5
            }, {
            c: [16, 4],
            opacity: .4
        }, {
            c: [17, 6],
            opacity: .4
        }, {
            c: [17, 9],
            opacity: .4
        }, {
            c: [16, 10],
            opacity: .4
        }, {
            c: [17, 10],
            opacity: .4
        }, {
            c: [16, 12],
            opacity: .4
        }, {
            c: [18, 5],
            opacity: .3
        }, {
            c: [18, 8],
            opacity: .3
        }, {
            c: [19, 10],
            opacity: .3
        }, {
            c: [22, 4],
            opacity: .2
        }, {
            c: [23, 6],
            opacity: .2
        }, {
            c: [21, 7],
            opacity: .2
        }, {
            c: [21, 9],
            opacity: .2
        }, {
            c: [23, 2],
            opacity: .2
        }]
    }],
        /iPhone|iPod|iPad|Android/.test(navigator.userAgent) && (e.meteorCurvePoints /= 2,
                                                                 e.meteorSegments /= 2,
                                                                 e.meteorShades /= 2,
                                                                 e.meteorInterval[0] *= 2,
                                                                 e.meteorInterval[1] *= 2,
                                                                 e.meteorAlpha[0] *= 4,
                                                                 e.meteorAlpha[1] *= 1.5,
                                                                 e.meteorWidth[0] *= 1.5,
                                                                 e.meteorWidth[1] *= .8),
    e.cssPrefix = "animation" in document.body.style ? "" : "-webkit-",
    e.isPlaying = !1,
    e.lastTick = null ,
    e.nextMeteor = -1,
    e.meteorLength = e.meteorSegments / e.meteorCurvePoints,
    e.meteors = [],
    e.avgMs = 0,
    e.frameCount = 0,
    e.canvas = document.createElement("canvas"),
    e.canvas.width = e.width,
    e.canvas.height = e.height,
    e.ctx = e.canvas.getContext("2d"),
    e.ctx.lineCap = "round",
    e.container.appendChild(e.canvas);
    
    var t = window.devicePixelRatio
    , n = e.sun.r * 2 + 20
    , r = document.createElement("canvas");
    
    r.width = r.height = n * t,
    r.style.width = r.style.height = px(n),
    r.style.left = px(e.sun.c[0] - n / 2),
    r.style.top = px(e.sun.c[1] - n / 2);
    var i = r.getContext("2d");
    i.scale(t, t),
    e.skyEl.appendChild(r);
    var s = i.createLinearGradient(0, 0, n, n);
    s.addColorStop(.1, rgba(e.meteorColor[0], .65)),
    s.addColorStop(.9, rgba(e.meteorColor[1], .65)),
    canvasCircle(i, [n / 2, n / 2], e.sun.r),
    i.lineWidth = e.sun.strokeWidth,
    i.strokeStyle = s,
    i.stroke();
    for (var o = 0; o < e.sky.length; o++) {
        var u = e.sky[o];
        for (var a = 0; a < u.stars.length; a++) {
            var f = u.stars[a];
            f.c[0] = Math.round(f.c[0] * e.gridSize[0] + e.offset[0]),
            f.c[1] = Math.round(f.c[1] * e.gridSize[1] + e.offset[1]);
            var l = document.createElement("div");
            l.className = "star",
            l.style.width = l.style.height = px(u.r * 2),
            l.style.left = px(f.c[0] - u.r),
            l.style.top = px(f.c[1] - u.r),
            l.style.border = u.strokeWidth + "px solid " + u.strokeColor,
            l.style.opacity = f.opacity,
            l.style[e.cssPrefix + "animation-name"] = arrayRandom(["star1", "star2"]),
            l.style[e.cssPrefix + "animation-duration"] = numInterpolate(2e3, 1e4, Math.random()) + "ms",
            l.style[e.cssPrefix + "animation-delay"] = numInterpolate(0, 1e3, Math.random()) + "ms",
            e.skyEl.appendChild(l)
        }
    }
    for (var o = 0; o < e.rings.length; o++) {
        var c = e.rings[o]
        , h = document.createElement("div");
        h.className = "ring",
        h.style.width = h.style.height = px(c[0] * 2),
        h.style.left = px(e.sun.c[0] - c[0]),
        h.style.top = px(e.sun.c[1] - c[0]),
        h.style.opacity = c[1],
        h.style.border = "1px solid rgb(" + e.ringColor + ")",
        e.skyEl.appendChild(h)
    }
    var p = e.sun.r
    , d = e.sun.r + 20
    , v = 500;
    while (e.smallStars--) {
        var m = 10 + Math.random() * (e.width - 20)
        , g = 10 + Math.random() * (e.height - 20)
        , y = 1 - Math.abs(m - e.width / 2) / e.width * 2
        , b = 1 - Math.abs(g - e.height / 2) / e.height * 2
        , w = Math.pow(y * b, 2);
        if (m > e.sun.c[0] - e.sun.r && m < e.sun.c[0] + e.sun.r && g > e.sun.c[1] - e.sun.r && g < e.sun.c[1] + e.sun.r || Math.random() > w)
            continue;var o = numReverseInterpolate(0, e.width, m)
        , E = rgb([Math.round(numInterpolate(e.meteorColor[0][0], e.meteorColor[1][0], o)), Math.round(numInterpolate(e.meteorColor[0][1], e.meteorColor[1][1], o)), Math.round(numInterpolate(e.meteorColor[0][2], e.meteorColor[1][2], o))])
        , l = document.createElement("div");
        l.className = "dot",
        l.style.width = l.style.height = px(Math.floor(Math.random() * 3 + 4)),
        l.style.left = px(m),
        l.style.top = px(g),
        l.style.backgroundColor = E,
        l.style.opacity = Math.random() * .25 + .25,
        l.style[e.cssPrefix + "animation-name"] = arrayRandom(["dot1", "dot2", "dot3", "dot4"]),
        l.style[e.cssPrefix + "animation-duration"] = numInterpolate(1e4, 4e4, Math.random()) + "ms",
        l.style[e.cssPrefix + "animation-delay"] = numInterpolate(0, 1e3, Math.random()) + "ms",
        e.skyParallaxEl.appendChild(l)
    }
    e.shineCanvasSize = (e.sun.r + e.sun.hazeSize) * 2,
    e.shineTemplCanvas = document.createElement("canvas"),
    e.shineTemplCanvas.width = e.shineTemplCanvas.height = e.shineCanvasSize,
    e.shineTemplCtx = e.shineTemplCanvas.getContext("2d");
    var s = e.shineTemplCtx.createRadialGradient(e.shineCanvasSize / 2 + e.sun.r * .75, e.shineCanvasSize / 2, 0, e.shineCanvasSize / 2 + e.sun.r * .75, e.shineCanvasSize / 2, e.sun.hazeSize);
    s.addColorStop(0, rgba(e.sun.hazeColor, 1)),
    s.addColorStop(.25, rgba(e.sun.hazeColor, .65)),
    s.addColorStop(.5, rgba(e.sun.hazeColor, .37)),
    s.addColorStop(.75, rgba(e.sun.hazeColor, .16)),
    s.addColorStop(1, rgba(e.sun.hazeColor, 0)),
    e.shineTemplCtx.fillStyle = s,
    e.shineTemplCtx.globalAlpha = .25,
    e.shineTemplCtx.fillRect(0, 0, e.shineCanvasSize, e.shineCanvasSize),
    e.shineTemplCtx.globalAlpha = 1,
    e.shineTemplCtx.lineWidth = e.sun.strokeWidth * 1.5,
    e.shineTemplCtx.strokeStyle = rgba(e.sun.shineColor, .15);
    for (var a = 0; a < e.sun.shineSegments; a++) {
        var S = a / e.sun.shineSegments
        , x = e.sun.shineSize * (1 - S);
        e.shineTemplCtx.beginPath(),
        e.shineTemplCtx.arc(e.shineCanvasSize / 2, e.shineCanvasSize / 2, e.sun.r, -x, x),
        e.shineTemplCtx.stroke()
    }
    canvasCircle(e.shineTemplCtx, [e.shineCanvasSize / 2, e.shineCanvasSize / 2], e.sun.r - e.sun.strokeWidth * 1.5),
    canvasClearFill(e.shineTemplCtx),
    
    e.meteorRepo = [],
    e.nextAvailableMeteor = 0;
    for (var T = 0; T < 10; T++)
        e.meteorRepo.push(N());
    
    e.tick = function(t) {
        t || (t = e.lastTick),
        e.delta = Math.min(t - e.lastTick, 50);
        if (t > e.nextMeteor && e.meteors.length < e.meteorLimit) {
            var n = e.meteorRepo[e.nextAvailableMeteor];
            e.nextAvailableMeteor = (e.nextAvailableMeteor + 1) % e.meteorRepo.length,
            n.progress.current = 0,
            n.speed = 1,
            n.hasFlare = !1,
            e.meteors.push(n),
            C(n.starA.p, e.meteorColor[0]);
            var r = numInterpolate(e.meteorInterval[0], e.meteorInterval[1], Math.random());
            e.nextMeteor = t + r
        }
        e.ctx.clearRect(0, 0, e.width, e.height);
        
        for (var i = 0; i < e.meteors.length; i++) {
            var n = e.meteors[i];
            if (n === !1)
                continue;n.progress.currentIndex = Math.round(n.progress.current * e.meteorCurvePoints),
            n.progress.currentIndexClamped = clamp(n.progress.currentIndex, 0, n.curvePoints.length - 1),
            n.shineStrength = (1 - n.curvePoints[n.progress.currentIndexClamped].fromSun.len / e.sun.shineRange) * .25,
            n.progress.current < .2 && (n.shineStrength *= Math.max(n.progress.current, 0) * 5),
            n.shineStrength > 0 && L(n),
            A(n),
            n.progress.current > n.progress.startTimes.starB && n.speed > .9 ? n.speed *= .99 : n.progress.current > n.progress.startTimes.orbit && n.speed < 2 && (n.speed *= 1.005),
            n.progress.current += e.delta / e.meteorDuration * n.speed,
            n.progress.current > 1 && !n.hasFlare && (C(n.starB.p, e.meteorColor[1]),
                                                      n.hasFlare = !0),
            n.progress.current > 1 + e.meteorLength && (e.meteors[i] = !1)
        }
        for (var s = 0; s < e.meteors.length; s++)
            e.meteors[s] === !1 && e.meteors.splice(s, 1);
        e.lastTick = t,
        e.isPlaying && requestAnimationFrame(e.tick)
    }
    ,
    e.start = function() {
        if (e.isPlaying)
            return;
        e.lastTick = performance.now(),
        e.isPlaying = !0,
        e.tick()
    }
    ,
    e.stop = function() {
        if (!e.isPlaying)
            return;
        e.isPlaying = !1
    }
}
, Feature = function() {
    var e = this;
    e.interval = 5500,
    e.current = 0,
    e.change = function() {
            requestAnimationFrame(function() {
                var n = (e.current + 1) % e.logos.length;
                e.logos[e.current].className = "out",
                e.texts && (e.texts[e.current].className = "out"),
                e.logos[n].className = "in",
                e.texts && (e.texts[n].className = "in"),
                e.current = n,
                setTimeout(e.change, e.interval)
            })
        }
}
;
$(function(e) {
    var t = document.querySelector(".page-header").getBoundingClientRect().height
    , n = document.querySelector(".international video")
    , r = new Meteors;
    window.headerMeteors = r,
    scaleMeteors(),
    window.addEventListener("resize", function(e) {
        scaleMeteors()
    }),
    window.addEventListener("blur", function(e) {
        r.stop()
    }),
    window.addEventListener("focus", function(e) {
        r.start()
    });
    var i = new Feature;
    i.logos = document.querySelectorAll(".page-header .feature .logo li"),
    i.texts = document.querySelectorAll(".page-header .feature .text li");
    var s = ["/img/connect/header/space.jpg", "/img/connect/header/starfield.png"];
    window.preload(s, function(e) {
        document.body.classList.add("header-ready"),
        r.start(),
        setTimeout(i.change, i.interval)
    }, !1);
    var o = [".setup figure", ".accept figure"];
    o.forEach(function(e, t) {
        o[t] = document.querySelector(e),
        o[t].classList.add("uncover-ready")
    });
    var u = document.querySelector(".accept .currencies")
    , a = document.querySelector(".page-header .sky-parallax")
    , f = document.querySelector(".page-header .starfield");
    window.addEventListener("scroll", function(e) {
        requestAnimationFrame(function() {
            window.scrollY > t ? r.stop() : r.start(),
            o.forEach(function(e) {
                var t = e.getBoundingClientRect()
                , n = t.top + t.height / 2;
                n >= 0 && n <= window.innerHeight && e.classList.add("uncover")
            });
            var e = n.getBoundingClientRect();
            e.bottom > 0 && e.top < window.innerHeight && n.paused && n.play();
            if (u) {
                var e = u.getBoundingClientRect();
                if (e.top + e.height < 0 || e.top > window.innerHeight)
                    u.className = "currencies icon-" + Math.ceil(Math.random() * 10)
            }
        })
    })
});
