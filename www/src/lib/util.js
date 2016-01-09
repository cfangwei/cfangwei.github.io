


module.exports = {
    randomInteger: function(from, to){
        return (0.5 + (Math.random() * (to - from) + from)) | 0;
    }
};
