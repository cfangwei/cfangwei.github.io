
var $ = require('jquery'),
    Vue = require('vue');

var stageController = require('../../../src/lib/stage-controller.js'),
    util = require('../../../src/lib/util.js');

var TweenLite = require('../../../src/vendor/tweenlite.js');

import TreeClass from './tree.js';
import {randomFloat, randomInteger} from '../../../src/lib/util.js';

let canvas,
    $bg,
    $bt,  // sun or moon controller
    animate,
    defaultGeneration = 1;

var resizeFn = function(width, height) {
    canvas.width = width;
    canvas.height = height;
    var context = canvas.getContext('2d');
    context.lineCap = 'round';
    context.globalCompositeOperation = 'lighter';
    //m = null 
};

var generatTree = (x, y) => {
  tree = new TreeClass(x, y, 100, -90);
}

var planttrees = new Vue({
    el: '#app',
    replace: false,
    template:
    '<div class="planttrees contents-data">' +
        '<div id="planttrees--bg"></div>' +
        '<canvas class="planttrees--canvas"></canvas>' +
        '<div class="planttrees--bt"></div>' +
        '<div id="planttrees-guide" class="contents-guide">' +
           '<div class="guide-tooltip">press</div>' +
           '<div class="guide-mouse"></div>' +
        '</div>' +
        '</div>',
    ready: function(){
        this.setup($(this.$el));
    },
    setup: function($container){
        
        //n = false,
        var winWidth = stageController.stageWidth,
        winHeight = stageController.stageHeight,
        //F = 1,
        canvas = $container.find(".planttrees--canvas").get()[0],
        $bt = $container.find(".planttrees--bt"),
            // A = document.getElementById("planttrees-guide"),
            // D = A.getElementsByClassName("guide-tooltip")[0],
            // v = document.getElementById("planttrees-con"),
            $bg = $container.find('.planttrees--bg');
        //o = null;
        stageController.addResize("PlantTrees", resizeFn);
        resizeFn();
    },
    start: function(){
        let winWidth = stageController.stageWidth,
            winHeight = stageController.stageHeight;
       
        if (!canvas) {
            throw 'Must init first.';
        }
        //animate = TweenLite.to();
    },
    dispose: function(){
        
    },
    pause: function(){
        
    },
    resume: function(){
        
    },
    resize: function(){
        
    }
});
