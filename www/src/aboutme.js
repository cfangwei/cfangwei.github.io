'use strict';


var Vue = require('vue');

var app = new Vue({
    el: '#aboutme',
    components: {
        'bookmark-footer': Vue.extend(require('./component/bookmark-footer/'))
    },
    ready: function(){
        
    }
});
