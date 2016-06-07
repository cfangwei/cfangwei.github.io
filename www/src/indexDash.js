'use strict';


var $ = require('jquery');




var Vue = require('vue');


var $window = $(window);

var stageController = require('./lib/stage-controller');



var app = new Vue({
    el: '#app',
    data: {
        
    },
    components: {
        'dash-card': Vue.extend(require('./component/dash-card')),
        'launch-grid': Vue.extend(require('./component/launch-grid'))
        
    },
    ready: function(){
    }
});


