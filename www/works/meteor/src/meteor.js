'use strict';

export class Meteors {
    constructor() {}
}


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
                continue;
            n.progress.currentIndex = Math.round(n.progress.current * e.meteorCurvePoints),
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
