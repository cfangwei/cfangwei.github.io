'use strict';


export class Vec2 {
    
    static direction(e, t) {
        return [t[0] - e[0], t[1] - e[1]];
    }

    static lengthFn(e) {
        return Math.sqrt(e[0] * e[0] + e[1] * e[1]);
    }
    
    static distance(e, t) {
        var n = Vec2.direction(e, t);
        return Vec2.length(n);
    }

    static normalize(e, t) {
        return t === undefined && (t = Vec2.length(e)),
        [e[0] / t, e[1] / t];
    }

    static scale(e, t) {
        return [e[0] * t, e[1] * t];
    }

    static add(e, t) {
        return [e[0] + t[0], e[1] + t[1]];
    }

    static subtract(e, t) {
        return [e[0] - t[0], e[1] - t[1]];
    }

    static angleVert(e) {
        return Math.atan2(e[0], e[1]);
    }

    static angleHorz(e) {
        return Math.atan2(e[1], e[0]);
    }

    static interpolate(e, t, n) {
        return [e[0] + (t[0] - e[0]) * n, e[1] + (t[1] - e[1]) * n];
    }

    static fromAngle(e, t) {
        return [Math.cos(e) * t, Math.sin(e) * t];
    }
}
