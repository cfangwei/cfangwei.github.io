
var $ = require('jquery');


var StageController = function(){

    this.width = $(window).width();

    this.height = $(window).height();

    this._resizeFns = {};
    
    $(window).on('resize', $.proxy(function(){
        this.width = $(window).width();
        this.height = $(window).height();

        var self = this;
        // observer;
        // excute all regisetered resizeFns when window resize
        Object.keys(this._resizeFns).map(function(resizeFnName){
            self._resizeFns[resizeFnName](self.width, self.height);
        });
    }, this));
};

StageController.prototype.addResize = function(name, fn){
    this._resizeFns[name] = fn;
};

module.exports = new StageController();
