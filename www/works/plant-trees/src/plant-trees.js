'use strict'
require('./main.scss');

var $ = require('jquery'),
    Vue = require('vue');

var stageController = require('../../../src/lib/stage-controller.js'),
    util = require('../../../src/lib/util.js');

var TweenLite = require('../../../src/vendor/tweenlite.js');

import TreeClass from './tree.js';
import {randomFloat, randomInteger} from '../../../src/lib/util.js';

let canvas,
    context,
    $bg,
    $bt,  // sun or moon controller
    animate,
    tree,
    isPause = false,
    defaultGeneration = 1;

var resizeFn = function(width, height) {
  console.log(canvas);
    canvas.width = width;
    canvas.height = height;

    context = canvas.getContext('2d');
    context.lineCap = 'round';
    context.globalCompositeOperation = 'lighter';
    tree = null;
};

var drawTree = function() {
    if (isPause) {
        return; 
    }
    requestAnimationFrame(drawTree);
};

var drawTreeFrame = function() {
    if (!tree) {
        return;
    } 
    tree.draw(context);
    if (tree.complete()) {
        tree = null; 
    }
};

var generatTree = (x, y) => {
  tree = new TreeClass(x, y, 100, -90);
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
        this.setup($(this.$el));
        this.start();
    },
    methods: {

      setup: function($container){

        //n = false,
        var winWidth = stageController.width,
          winHeight = stageController.height;

        canvas = $container.find('.planttrees--canvas').get()[0],
        $bt = $container.find(".planttrees--bt"),
        $bg = $container.find('.planttrees--bg');
        stageController.addResize("PlantTrees", resizeFn);
        resizeFn(winWidth, winHeight);
      },
      start: function(){
        let winWidth = stageController.stageWidth,
          winHeight = stageController.stageHeight;

          generatTree(winWidth / 2, winHeight);
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
