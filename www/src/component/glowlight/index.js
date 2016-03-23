'use strict';

require('./style.scss');

var $ = require('jquery'),
    stageController = require('../../lib/stage-controller.js'),
    util = require('../../lib/util');


var GlowLightParticle = function(){
    this.initialize.apply(this, arguments);
};

GlowLightParticle.prototype = {
    initialize: function(c, frameStep, radius) {
        this.x = c;
        this.y = frameStep;
        this.radius = radius;
        this.vx = Math.random() * 7;
        this.vy = Math.random() * 7;
        this.colorBase = util.randomInteger(0, 15);
        this.hsla = 'hsla(' + ((360 / 15) * this.colorBase) + ', 100%, 50%, 1)';
    },
    r: 1,
    vx: 1,
    vy: 1
};


var particles = null,
    maxParticlesNum = 16,
    running = false,
    j = 200,
    r = 5,
    q = 0,
    frameStep = 0.002, // 步进系数, 控制半径缩放的快慢
    windowWidth = stageController.width,
    windowHeight = stageController.height,
    glowlightWorld,
    content;


var initParticle = function(){
    particles = [];
    var particle;
    for (var i = 0; i< maxParticlesNum; i++ ) {
        particle = new GlowLightParticle(2 * stageController.width,
                                         2 * stageController.height,
                                         Math.random() * (j - r) + r);
        particles[i] = particle;
    }
};


var canvasLayout = function(){
    glowlightWorld.width = stageController.width;
    glowlightWorld.height = stageController.height;
    content = glowlightWorld.getContext('2d');
    content.fillStyle= 'rgb(20, 20, 20)';
    content.fillRect(0, 0, stageController.width,
                     stageController.height);
};

var resizeFn = function(){
    windowWidth = stageController.width;
    windowHeight = stageController.height;
    canvasLayout();
};


// TODO 优化一下 pause 也一直递归着感觉不太好
var glowlightRaf = function(){
    requestAnimationFrame(glowlightRaf);
    if ( !running ) {
        return;
    }
    glowlightAction();
};

var glowlightAction = function(){
    content.globalCompositeOperation = 'source-over';
    content.fillStyle = 'rgb(17, 17, 17)'; // set backgroud color 
    content.fillRect(0, 0,
                     stageController.width,
                     stageController.height);
    content.globalCompositeOperation = 'lighter';
    // 使用不同的 globalCompositeOperation 值绘制矩形。
    // lighter = 显示源图像 + 目标图像。
    
    var particle,
        y = -1,
        borderDistance = 300, // 弹返边界距离 window 的距离
        grd; // canvas RadialGradient
    
    for (var i = 0; i < maxParticlesNum; i++) {
        particle = particles[i];
        particle.x = particle.x + particle.vx;
        particle.y = particle.y + particle.vy;
        
        particle.radius = particle.radius + Math.sin(q); // sin q 回归 -1 ~ 1;
        
        q = q + frameStep;

        if (particle.x > windowWidth - particle.radius + borderDistance) {
            particle.vx *= y;
            particle.x = windowWidth - particle.radius + borderDistance;
        }
        if (particle.x < 0 + particle.radius - borderDistance) {
            particle.vx *= y;
            particle.x = particle.radius - borderDistance;
        }
        if (particle.y > windowHeight - particle.radius + borderDistance) {
            particle.vy *= y;
            particle.y = windowHeight - particle.radius + borderDistance;
        }
        if (particle.y < 0 + particle.radius - borderDistance) {
            particle.vy *= y;
            particle.y = particle.radius - borderDistance;
        }
        
        grd = content.createRadialGradient(particle.x, //坐标
                                           particle.y,
                                           particle.radius,// 半径
                                           particle.x, // 渐变坐标
                                           particle.y,
                                           particle.radius * 2 // 渐变半径
                                          );
        
        grd.addColorStop(0, particle.hsla);
        grd.addColorStop(1, 'rgba(0,0,0,0)');
        content.beginPath(); // begin draw
        content.fillStyle = grd; //color and something else
        // draw circle
        content.arc(particle.x, // 坐标
                    particle.y,
                    particle.radius * 3, // 半径
                    0, // 开始角度
                    Math.PI * 2, // 终止角度
                    false // 顺时针
                   );
        content.fill(); // 实心
    }
};



module.exports = {
    template: require('./template.html'),
    ready: function(){
        // 模版中的对象
        glowlightWorld = $(this.$el).find('.glowlight-world')[0];
        canvasLayout();
        if ( particles === null ) {
            initParticle();
        } else {
            var particle;
            for (var i = 0; i < maxParticlesNum; i++) {
                particle = particles[i];
                particle.initialize(2 * stageController.width,
                                    2 * stageController.height,
                                    Math.random() * (j - r) + r);
            }
        }
        stageController.addResize('GlowLight', resizeFn);
    },
    methods: {
        init: function(){
            glowlightRaf();
        },
        start: function(){
            running = true;
        },
        pause: function(){
            running = false;
        },
        hide: function(){
            $(this.$el).hide(0);
        }
    }
};

