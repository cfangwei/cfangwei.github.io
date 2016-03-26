'use strict';


const HALF_PI = Math.PI / 2,
      TWO_PI = Math.PI * 2,
      RADIANS_TO_DEGREES =  180 / Math.PI,
      FINISHED = {t: 1};

let dist = (x1, y1, x2, y2) => {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
};

let lerp = (a, b, t) => {
    return (b - a) * t + a;
};

let map = (v, i1, i2, o1, o2) => {
    return o1 + (o2 - o1) * (v - i1) / (i2 - i1);
};

let bezier = (a, b, c, d, t) => {
    // seems like a hack:
    if (a === b && c === d) {
        return this.lerp(a, d, t);
    }
    var t1 = 1.0 - t;
    return a * t1 * t1 * t1 + 3 * b * t * t1 * t1 + 3 * c * t * t * t1 + d * t * t * t;
};

let bezierTangent = (a, b, c, d, t) => {
    return (3 * t * t * (-a + 3 * b - 3 * c + d) + 6 * t * (a - 2 * b + c) + 3 * (-a + b));
};

let bezierHandle = (a, b, c, d, t) => {
    // seems like a hack:
    if (a == b && c == d) {
        return [a, this.lerp(d, a, t)];
    }
    var n = this.lerp(b, a, t);
    var m = this.lerp(c, b, t);
    return [n, this.lerp(m, n, t)];
};

let pivotX = (x, y, angle) => {
    return x * Math.cos(angle) - y * Math.sin(angle);
};

let clamp = (v, min, max) => {
    if (v >= max) return max;
    if (v <= min) return min;
    return v;
};

let pivotY = (x, y, angle) => {
    return y * Math.cos(angle) + x * Math.sin(angle);
};

export {dist, lerp, map, bezier, bezierTangent,
        bezierHandle, pivotX, clamp, pivotY};
