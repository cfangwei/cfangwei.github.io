


module.exports = {
    randomInteger: function(from, to){
        return (0.5 + (Math.random() * (to - from) + from)) | 0;
    },
    randomFloat: function(min, max){
        return min + Math.random() * (max - min);
    },
    isObject: function(object){
        return Object.prototype.toString.call(object) === '[object Object]';
    }
};
