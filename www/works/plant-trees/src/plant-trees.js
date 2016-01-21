'use strict';

var $ = require('jquery'),
    Vue = require('vue');

var stageController = require('../../../src/lib/stage-controller.js'),
    util = require('../../../src/lib/util.js');

var TweenLite = require('../../../src/vendor/tweenlite.js');

var canvas,
    $bg,
    $bt,  // sun or moon controller
    animate;

var resizeFn = function(width, height) {
    canvas.width = width;
    canvas.height = height;
    var context = canvas.getContext('2d');
    context.lineCap = 'round';
    context.globalCompositeOperation = 'lighter';
    //m = null 
};

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
        console.log(this);
        this.setup($(this.$el));
    },
    methods: {

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
                resizeFn(winWidth, winHeight);
      },
      start: function(){
        let winWidth = stageController.stageWidth,
          winHeight = stageController.stageHeight;

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

    }
});
