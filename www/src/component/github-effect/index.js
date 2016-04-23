'use strict';

let $ = require('jquery');

require('./main.scss');

import {PivotPoint} from './privot-point.js';
import {Particle} from './particle.js';

let countPointsPerFrame = 150;

function getPixels (data, width, pixelsPerLine) {
    var pixels = [];
    var x = 0, y = 0;

    for (var i = 0, max = data.length; i < max; i += 4) {

            x = parseInt(i / 4) % width;
            y = parseInt(i / pixelsPerLine);
            var opacity = data[i + 3] / 255;
            if (opacity == 0) {
                continue;
            }
            var r = data[i];
            var g = data[i + 1];
            var b = data[i + 2];
            pixels.push({x: x, y: y, color: 'rgba(' + r + ',' + g + ',' + b + ',' + opacity.toFixed(2) + ')'});
        }
        return pixels;
}




module.exports = {
    template: require('./template.html'),
    data: function(){
        
    },
    ready: function(){
        let img = this.$el.querySelector('img'),
            imgHeight = img.height,
            imgWidth = img.width;

        let  pixelsPerLine = imgWidth * 4;
        
        let canvas = this.$el.querySelector('canvas'),
            ctx = canvas.getContext('2d');

        canvas.height = screen.height;
        canvas.width = screen.width;

        let offsetY = (canvas.height - imgHeight) / 2,
            offsetX = (canvas.width - imgWidth) / 2;

        ctx.drawImage(img, offsetX, offsetY, imgWidth, imgHeight);

        
        let ctxData = ctx.getImageData(offsetX, offsetY, imgWidth, imgHeight).data,
            pixels = getPixels(ctxData, imgWidth, pixelsPerLine);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pixels.sort((p0, p1) => {
            return p0.x - p1.x;
        });

        PivotPoint.init({ x: 100, y: 80, offset: imgWidth });

        var points = [];
        var countPointsPerFrame = 150;
        var index = 0;
        var endDate = +new Date();

        
        function generatePoints (index) {
            var offset = index * countPointsPerFrame;
            for (var i = 0; i < countPointsPerFrame; ++i) {
                var pixel = pixels[offset + i];
                if (!pixel) {
                    return;
                }
                var p = Particle.create({
                    x: PivotPoint.getX(),
                    y: PivotPoint.getY(),
                    finalX: pixel.x,
                    finalY: pixel.y,
                    color: pixel.color,
                    context: ctx
                });
                points.push(p);
            }
        }

        function checkAllDone () {
            for (let i = points.length - countPointsPerFrame, max = points.length; i < max; i++) {
                if( !points[i].done ){
                    return false;
                }

            }
            return true;
        }
        
        function update () {
            var dt = +new Date() - endDate;
            generatePoints(index);
            ++index;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (var i = 0, len = points.length; i < len; ++i) {
                var point = points[i];
                point.update();
                point.draw(offsetX, offsetY);
            }
            PivotPoint.update(dt);
            endDate = +new Date();
            if( points[points.length - 1].done ){
                if(checkAllDone()) {
                    
                    secondPart();
                    return;
                }
            }

            requestAnimationFrame(update);
        }

        let $window = $(window),
            drawing = false;

        var offsetTop = $(this.$el).offset().top;
        console.log("offsetTop 2= ", offsetTop);
        
        var listen = function(event){
            if ($window.scrollTop() > offsetTop - screen.height / 4) {
                if( !drawing ){
                    update();
                    drawing = true;
                }
                $window.off('scroll', listen);
            }  
        };
        $window.on('scroll', listen);
        listen();


        function secondPart () {

        }

    },
    methods: {
        
    }
};



//     var width = 538;
//     var height = 190;
//     var pixelsPerLine = width * 4;
//     var canvas = document.querySelector("#c1");
//     var context = canvas.getContext('2d');
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//     var offsetX = (canvas.width - width) / 2;
//     var offsetY = (canvas.height - height) / 2;

//     var tmpCanvas = document.querySelector("#c2");
//     var tmpContext = tmpCanvas.getContext('2d');
//     var img = document.querySelector('img');
//     tmpContext.drawImage(img, 0, 0, width, height);
//     var data = tmpContext.getImageData(0, 0, width, height).data;
//     var pixels = getPixels(data);

//     pixels.sort(function (p0, p1) {
//         return p0.x - p1.x;
//     });

// PivotPoint.init({ x: 100, y: 80, offset: width });


// var points = [];
//     var countPointsPerFrame = 150;
//     var index = 0;
//     var endDate = +new Date();

//     function update () {
//         var dt = +new Date() - endDate;
//         generatePoints(index);
//         ++index;
//         context.clearRect(0, 0, canvas.width, canvas.height);
//         for (var i = 0, len = points.length; i < len; ++i) {
//             var point = points[i];
//             point.update();
//             point.draw();
//         }
//         PivotPoint.update(dt);
//         endDate = +new Date();
//         requestAnimationFrame(update);
//     }

//     update();
