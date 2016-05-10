'use strict';

console.log('ss');

let Vue = require('vue');

let sortCanvas = {
    template: require('./template.html'),
    methods: {
        draw: function(array) {
            let self = this;
            array.forEach((e, i) => {
                let h = self.unitHeight * e;

                let a = (i * self.unitWidth),
                    b = (i * self.unitWidth),
                    c = self.unitWidth,
                    d = h;
                
                console.log(a, b, c, d);
                self.ctx.rect(a, b, c, d);
                self.ctx.stroke();
            });
        }
    },
    ready: function(){
        this.canvas = this.$el;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.style ='black';
        
        
        this.canvas.height = 500;
        this.canvas.width = 500;
        
        
        
        
        let targetArray = [1,2,3,4,5,6,7,8,9,10];
        
        this.baseHeight = this.canvas.height,
        this.baseWidth = this.canvas.width;

        let targetArrayLen = targetArray.length;
        this.unitWidth = this.baseWidth / targetArrayLen;

            

        let maxHeight = 0;
        targetArray.forEach((a) => {
            if( maxHeight < a ){
                maxHeight = a;
            }
        });

        this.unitHeight = this.baseHeight / maxHeight;

        this.draw(targetArray);
        
    }
};


let app = new Vue({
    el: '#app',
    components: {
        'sortCanvas': Vue.extend(sortCanvas)
    },
    ready: () => {
        
    }
});


