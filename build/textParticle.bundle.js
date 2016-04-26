/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Particle = function () {
	    function Particle(x, y, canvas) {
	        _classCallCheck(this, Particle);

	        this.endX = x;
	        this.endY = y;
	        //this.canvas = canvas;
	        //this.ctx = this.canvas.getContext('2d');
	        this.x = Math.random() * canvas.width;
	        this.y = Math.random() * canvas.height;

	        this.vx = Math.random() * 10 - 5;
	        this.vy = Math.random() * 10 - 5;
	    }

	    _createClass(Particle, [{
	        key: 'move',
	        value: function move(mouseX, mouseY) {
	            var disX = this.endX - this.x;
	            var disY = this.endY - this.y;
	            var dis = Math.sqrt(Math.pow(disX, 2) + Math.pow(disY, 2));
	            var force = dis * 0.01;
	            var angle = Math.atan2(disY, disX); // atan2(x, y) 返回点(x, y)到x 轴的弧度

	            var mouseF = 0,
	                mouseA = 0;
	            if (mouseX > 0 && mouseY > 0) {
	                var _dis = Math.pow(this.x - mouseX, 2) + Math.pow(this.y - mouseY, 2);
	                mouseF = Math.min(5000 / _dis, 5000);
	                mouseA = Math.atan2(this.y - mouseY, this.x - mouseX);
	            } else {
	                mouseF = 0;
	                mouseA = 0;
	            }

	            this.vx += force * Math.cos(angle) + mouseF * Math.cos(mouseA);
	            this.vy += force * Math.sin(angle) + mouseA * Math.sin(mouseA);

	            this.vx *= 0.92;
	            this.vy *= 0.92;

	            //
	            this.x += this.vx;
	            this.y += this.vy;
	        }
	    }, {
	        key: 'render',
	        value: function render(ctx) {
	            ctx.fillStyle = '#111';
	            ctx.fillRect(this.x, this.y, 2, 2);
	        }
	    }, {
	        key: 'update',
	        value: function update(ctx, mouseX, mouseY) {
	            this.move(mouseX, mouseY);
	            this.render(ctx);
	        }
	    }]);

	    return Particle;
	}();

	var getCanvasData = function getCanvasData(canvas) {
	    var ctx = canvas.getContext('2d'),
	        imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

	    var particles = [];
	    for (var x = 0, ii = 0; x < imageData.width; x++) {
	        for (var y = 0; y < imageData.height; y++) {
	            var i = 4 * (y * imageData.width + x);
	            if (imageData.data[i + 3] > 128) {
	                ii++;
	                ii % 4 === 0 && particles.push(new Particle(x, y, canvas));
	            }
	        }
	    }
	    return particles;
	};

	var canvas = document.getElementById('canvas'),
	    ctx = canvas.getContext('2d');

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.font = '200px sans-serif';
	ctx.fillText('放為', canvas.width / 2, canvas.height / 2.5);

	var particles = getCanvasData(canvas);

	var mouseX = void 0,
	    mouseY = void 0;

	canvas.addEventListener('mousemove', function (e) {
	    mouseX = e.clientX;
	    mouseY = e.clientY;
	});

	var frame = function frame() {
	    ctx.clearRect(0, 0, canvas.width, canvas.height);
	    particles.map(function (particle) {
	        particle.update(ctx, mouseX, mouseY);
	    });
	};

	var tick = function tick() {
	    frame();
	    requestAnimationFrame(tick);
	};

	tick();

/***/ }
/******/ ]);