

module.exports = {
    randomInteger: function(from, to){
        return (0.5 + (Math.random() * (to - from) + from)) | 0;
    },
    randomFloat: function(min, max){
        return min + Math.random() * (max - min);
    },
    isObject: function(object){
        return Object.prototype.toString.call(object) === '[object Object]';
    },
    addZeros: function g(r, x) {
        var w = r.toString()
        , v = ""
        , q = w.length
        , u = x + 1;
        if (q < u) {
            var t = u - q, s;
            for (s = 1; s <= t; s++) {
                v += "0";
            }
            w = v + w
        }
        return w
    }
};
