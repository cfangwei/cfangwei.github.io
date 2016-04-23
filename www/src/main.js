'use strict';

var $ = require('jquery');

import {CircleLine} from '../works/circleline/src/circleline.js';

// var GlowLight = require('./lib/glowlight.js');
// GlowLight.init(document.getElementById('backgroud-container'));
// GlowLight.start();
var Vue = require('vue');


var $window = $(window);

var stageController = require('./lib/stage-controller');

var Highcharts = require('highcharts');
require('highcharts/highcharts-more')(Highcharts);
// Load module after Highcharts is loaded





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
        'bookmark-footer': Vue.extend(require('./component/bookmark-footer/')),
        'forest': Vue.extend(require('./component/forest/')),
        'github-effect': Vue.extend(require('./component/github-effect/'))
    },
    ready: function(){
        // init glowlight
        // this.$refs.glowlightBg.init();

        // $window.scrollTop(); // ensure on top when page ready
        // $('html, body').animate({
        //     scrollTop: $('.post-card-screen').offset().top
        // }, 1000);
        
        
        /**
         *   
         * circleLine
         * 
         */

        let canvas = document.getElementById('dash-card--canvas'),
            ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let circleLine = new CircleLine(canvas.width / 2, canvas.height / 2, canvas,
                                        50, 300, 15, '#999');
        
        circleLine.render2DCircles();
        circleLine.move2D();
        circleLine.move3D();


        /**
         *   
         * blog
         * 
         */
        let blogImgs = document.querySelectorAll('.blog-screen .imgs img');
        let lastShowImg = null,
            blogI = 0,
            blogImgLenght = blogImgs.length;

        let intervalBlogImgfn = () => {
            if( lastShowImg ){
                lastShowImg.style.opacity = '0';
            }
            let img = blogImgs[ blogI % blogImgLenght ];
            img.style.opacity = '1';
            blogI++;
            lastShowImg = img;
        };
        setInterval(intervalBlogImgfn, 2000);
        intervalBlogImgfn();

        /**
         *   
         * skill
         * 
         */
        Highcharts.chart('skill-container', {
            
            chart: {
	        polar: true,
	        type: 'line'
	    },
	    credits: {
		enabled: false
	    },
	    title: {
	        text: 'Skill Breakdown'
	    },
	    
	    pane: {
	        startAngle: 0,
	        endAngle: 360
	    },
	    
	    xAxis: {
	    	type: 'category',
	        tickInterval: 1,
	        categories: ['CSS',
                             'HTML',
                             'JavaScript',
                             'jQuery',
                             'Customer Service',
                             'Marketing',
                             'Project Management',
                             'Social Media'],
	        min: 0,
	        max: 8,
	        tickmarkPlacement: 'on',

	        lineWidth: 0,
	        labels: {
	            formatter: function () {
        		return this.value
	            }
	        }
	    },
	    tooltip: {
                shared: true,
                useHTML: true,
                headerFormat: '<div class="newTip"><big>{point.key}</big>' + '<br/>',
                pointFormat: '{point.y} / 5.0',
                footerFormat: '</div>',
                valueDecimals: 1
            },
	    yAxis: {
                gridLineInterpolation: 'polygon',
	        min: 0,
	        max: 5,
	        tickInterval: 1,
		minorTickInterval: 0.5,
		showLastLabel: 'true',
		labels:{
		    x: 8,
		    style: {
			color: '#000',
			textShadow:'1px 1px 0px #fff',
			display: "inline-block"
		    }				
		}
		
	    },
	    plotOptions: {
	        series: {
	            pointStart: 0,
	            pointInterval: 1

	        },
	        column: {
	            pointPadding: 0,
	            groupPadding: 0
	        }
	    },	    
	    series: [{
	        type: 'area',
	        name: 'Skills',
	        data: [4.5, 4.5, 2, 2.5, 5, 4.1, 4, 3.75],
	        pointPlacement: "on"
	    }]
	});

    },
    methods: {
        // startGlowLight: function(){
        //     this.$refs.glowlightBg.start();
        // },
        // pauseGlowLight: function(){
        //     this.$refs.glowlightBg.pause();
        // },
        // hideGlowLight: function(){
        //     this.$refs.glowlightBg.hide();
        // }
    }
});

//app.startGlowLight();
//app.pauseGlowLight();
//app.hideGlowLight();
