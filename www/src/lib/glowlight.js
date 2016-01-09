

var $ = require('jquery'),
    stageController = require('./stage-controller.js'),
    util = require('./util');

var glowlightHtml =
        '<div id="glowlight" class="contents-data">'+
        '<div id="glowlight-con">'+
        '<canvas id="glowlight-world"></canvas>'+
        '</div>'+
        '</div>';

var particles = null,
    maxParticlesNum = 16,
    running = false,
    j = 200,
    r = 5,
    q = 0,
    e = 0.0002,
    b = stageController.width,
    p = stageController.height,
    content;

var GlowLightParticle = function(){
    this.initialize.apply(this, arguments);
};

GlowLightParticle.prototype = {
    initialize: function(c, e, d) {
        this.x = c;
        this.y = e;
        this.r = d;
        this.vx = Math.random() * 7;
        this.vy = Math.random() * 7;
        this.h = util.randomInteger(0, 15);
        this.hsla = "hsla(" + ((360 / 15) * this.h) + ",100%,50%,1)";
    },
    r: 1,
    vx: 1,
    vy: 1
};


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

var resize = function(){
    
};


var glowlight = function(container){
    container.innerHTML = glowlightHtml;

    var glowlightWorld = document.getElementById('glowlight-world');

    glowlightWorld.width = stageController.width;
    glowlightWorld.height = stageController.height;

    content = glowlightWorld.getContext('2d');
    content.fillStyle= 'rgb(20, 20, 20)';
    content.fillRect(0, 0, stageController.width,
                     stageController.height);

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
    stageController.addResize('GlowLight', resize);
};

var glowlightAction = function(){
    content.globalCompositeOperation = 'source-over';
    content.fillStyle = 'rgb(17, 17, 17)';
    content.fillRect(0, 0, stageController.width,
                     stageController.height);
    content.globalCompositeOperation = 'lighter';
    var z, B, y = -1, C = 300, A;
    for (z = 0; z < maxParticlesNum; z++) {
        B = particles[z];
        B.x = B.x + B.vx;
        B.y = B.y + B.vy;
        B.r = B.r + Math.sin(q);
        q = q + e;
        if (B.x > b - B.r + C) {
            B.vx *= y;
            B.x = b - B.r + C
        }
        if (B.x < 0 + B.r - C) {
            B.vx *= y;
            B.x = B.r - C
        }
        if (B.y > p - B.r + C) {
            B.vy *= y;
            B.y = p - B.r + C
        }
        if (B.y < 0 + B.r - C) {
            B.vy *= y;
            B.y = B.r - C
        }
        A = content.createRadialGradient(B.x, B.y, B.r, B.x, B.y, B.r * 2);
        A.addColorStop(0, B.hsla);
        A.addColorStop(1, "rgba(0,0,0,0)");
        content.beginPath();
        content.fillStyle = A;
        content.arc(B.x, B.y, B.r * 3, 0, Math.PI * 2, false);
        content.fill();
    }
};


var glowlightRaf = function(){
    if ( !running ) {
        return;
    }
    
    requestAnimationFrame(glowlightRaf);
    glowlightAction();
};

var start = function(){
    running = true;
    glowlightRaf();
};

var pause= function(){
    
};

var resume = function(){
    
};

var dispose = function(){
    
};

module.exports = {
    init: glowlight,
    start: start,
    pause: pause,
    resume: resume,
    dispose: dispose
};
