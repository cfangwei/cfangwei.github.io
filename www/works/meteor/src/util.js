'use strict';


let rgb = (e) => {
    return 'rgb(' + e[0] + ',' + e[1] + ',' + e[2] + ')';
};

let rgba = (e, t) => {
    return 'rgba(' + e[0] + ',' + e[1] + ',' + e[2] + ',' + t + ')';
};

let px = (v) => {
    return v + 'px';
};

let arrayRandom = (e) => {
    return e[Math.floor(Math.random() * e.length)];
};

let numInterpolate = (e, t, n) => {
    return e * (1 - n) + t * n;
};

let numReverseInterpolate = (e, t, n) => {
    return (n - e) / (t - e);
};

let clamp = (e, t, n) => {
    return Math.max(Math.min(e, n), t);
};

let canvasCircle = (e, t, n) => {
    e.beginPath();
    e.arc(t[0], t[1], n, 0, Math.PI * 2);
};

let canvasClearFill = (e) => {

    e.fillStyle = "black";
    e.globalCompositeOperation = "destination-out";
    e.fill();
    e.globalCompositeOperation = "source-over";
};

let canvasDrawRotated = (e, t, n, r) => {
    e.translate(n[0], n[1]);
    e.rotate(t);
    r();
    e.setTransform(1, 0, 0, 1, 0, 0);
};

export {px, arrayRandom, numInterpolate, numReverseInterpolate, clamp, rgb, rgba, canvasCircle,
        canvasDrawRotated, canvasClearFill};
