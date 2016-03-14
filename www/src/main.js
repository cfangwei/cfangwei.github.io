'use strict';

var $ = require('jquery');


// var GlowLight = require('./lib/glowlight.js');
// GlowLight.init(document.getElementById('backgroud-container'));
// GlowLight.start();
var Vue = require('vue');


var $window = $(window);

var stageController = require('./lib/stage-controller');


var resizeScreen = function(width, height){
    $('body').find('.screen')
        .css('height', height + 'px');
        //.css('width', width + 'px');
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
        'post-card': Vue.extend(require('./component/post-card'))
    },
    ready: function(){
        // init glowlight
        this.$refs.glowlightBg.init();

        //$window.scrollTop(); // ensure on top when page ready
        $('html, body').animate({
            scrollTop: $('.post-card-screen').offset().top
        }, 1000);

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

app.startGlowLight();
//app.pauseGlowLight();
//app.hideGlowLight();
