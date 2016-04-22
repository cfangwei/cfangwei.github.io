'use strict';

var $ = require('jquery');
import {CircleLine} from '../works/circleline/src/circleline.js';

// var GlowLight = require('./lib/glowlight.js');
// GlowLight.init(document.getElementById('backgroud-container'));
// GlowLight.start();
var Vue = require('vue');


var $window = $(window);

var stageController = require('./lib/stage-controller');


var resizeScreen = function(width, height){
    $('body').find('.screen')
        .css('height', height + 'px');
};

stageController.addResize('screen', resizeScreen);
resizeScreen(stageController.width, stageController.height);


var app = new Vue({
    el: '#app',
    data: {
        
    },
    components: {
        'glowlight-bg': Vue.extend(require('./component/glowlight')),
        'slide-icons': Vue.extend(require('./component/slide-icons')),
        'dash-card': Vue.extend(require('./component/dash-card')),
        'post-card': Vue.extend(require('./component/post-card')),
        'smoke-effect': Vue.extend(require('./component/smoke-effect/')),
        'bookmark-footer': Vue.extend(require('./component/bookmark-footer/'))
    },
    ready: function(){
        // init glowlight
        // this.$refs.glowlightBg.init();

        // $window.scrollTop(); // ensure on top when page ready
        // $('html, body').animate({
        //     scrollTop: $('.post-card-screen').offset().top
        // }, 1000);
        
        
        
        let canvas = document.getElementById('dash-card--canvas'),
            ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let circleLine = new CircleLine(canvas.width / 2, canvas.height / 2, canvas,
                                        50, 300, 5, '#000');
        
        circleLine.render2DCircles();
        circleLine.move2D();
        circleLine.move3D();


    },
    methods: {
        startGlowLight: function(){
            this.$refs.glowlightBg.start();
        },
        pauseGlowLight: function(){
            this.$refs.glowlightBg.pause();
        },
        hideGlowLight: function(){
            this.$refs.glowlightBg.hide();
        }
    }
});

//app.startGlowLight();
//app.pauseGlowLight();
app.hideGlowLight();
