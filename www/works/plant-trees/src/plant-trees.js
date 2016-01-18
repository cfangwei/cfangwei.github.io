
var $ = require('jquery'),
    Vue = require('vue');

var stageController = require('../../../src/lib/stage-controller.js'),
    util = require('../../../src/lib/util.js');


var planttrees = new Vue({
    el: '#app',
    replace: false,
    template:
    '<div id="planttrees-con" class="contents-data">' +
        '<div id="planttrees-bg"></div>' +
        '<canvas id="planttrees"></canvas>' +
        '<div id="planttrees-bt"></div>' +
        '<div id="planttrees-guide" class="contents-guide">' +
           '<div class="guide-tooltip">press</div>' +
           '<div class="guide-mouse"></div>' +
        '</div>' +
        '</div>',
    ready: function(){
        
    }
});
