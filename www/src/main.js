'use strict';

var $ = require('jquery');


// var GlowLight = require('./lib/glowlight.js');
// GlowLight.init(document.getElementById('backgroud-container'));
// GlowLight.start();



var Vue = require('vue');


var app = new Vue({
    el: '#app',
    data: {
        
    },
    components: {
        'glowlight-bg': Vue.extend(require('./component/glowlight')),
        'slide-icons': Vue.extend(require('./component/slide-icons')),
        'dash-card': Vue.extend(require('./component/dash-card'))
    },
    ready: function(){
        // 初始化 glowlight
        this.$refs.glowlightBg.init();
    },
    methods: {
        startGlowLight: function(){
            this.$refs.glowlightBg.start();
        },
        pauseGlowLight: function(){
            this.$refs.glowlightBg.pause();
        }
    }
});

app.startGlowLight();
//app.pauseGlowLight();
//app.startGlowLight();
