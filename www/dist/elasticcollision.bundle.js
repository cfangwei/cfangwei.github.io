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

	var ballNumber = 10;
	var ballRadius = 10,
	    g = 9.8,
	    mocali = 0.5,
	    collarg = 0.8;

	var areaRadius = 300;

	var getRandom = function getRandom(a, b) {
	    return Math.random() * (b - a) + a;
	};

	var getRandomInt = function getRandomInt(a) {
	    return Math.floor(Math.random() * a);
	};

	var Ball = function () {
	    function Ball(x, y, r, color, pxpm) {
	        _classCallCheck(this, Ball);

	        this.x = x;
	        this.y = y;
	        this.oldx = x;
	        this.oldy = y;
	        this.vx = 0;
	        this.vy = 0;
	        this.radius = r;
	        this.color = color;

	        this.pxpm = pxpm;
	    }

	    _createClass(Ball, [{
	        key: 'move',
	        value: function move(t, x, y) {
	            this.oldx = this.x;
	            this.oldy = this.y;

	            this.vx += this.vx > 0 ? -mocali * t : mocali * t;
	            this.vy = this.vy + g * t;

	            this.x += t * this.vx * this.pxpm;
	            this.y += t * this.vy * this.pxpm;

	            // if (this.y > height - this.radius || this.y < this.radius) {
	            //     this.y = this.y < this.radius ? this.radius : (height - this.radius);
	            //     this.vy = -this.vy * collarg;
	            // }
	            // if (this.x > width - this.radius || this.x < this.radius) {
	            //     this.x = this.x < this.radius ? this.radius : (width - this.radius);
	            //     this.derectionX = !this.derectionX;
	            //     this.vx = -this.vx * collarg;
	            // }
	            var dx = Math.abs(this.x - x),
	                dy = Math.abs(this.y - y);
	            if (Math.sqrt(dx * dx + dy * dy) > areaRadius) {
	                this.vy = -this.vy * collarg;
	                this.vx = -this.vx * collarg;
	            }
	        }
	    }]);

	    return Ball;
	}();

	var collision = function collision(balls) {
	    balls.map(function (ball1) {
	        balls.map(function (ball2) {
	            if (ball1 !== ball2) {
	                var rc = Math.sqrt(Math.pow(ball1.x - ball2.x, 2) + Math.pow(ball1.y - ball2.y, 2));
	                if (Math.ceil(rc) < ball1.radius + ball2.radius) {

	                    //获得碰撞后速度的增量
	                    var ax = ((ball1.vx - ball2.vx) * Math.pow(ball1.x - ball2.x, 2) + (ball1.vy - ball2.vy) * (ball1.x - ball2.x) * (ball1.y - ball2.y)) / Math.pow(rc, 2);
	                    var ay = ((ball1.vy - ball2.vy) * Math.pow(ball1.y - ball2.y, 2) + (ball1.vx - ball2.vx) * (ball1.x - ball2.x) + (ball1.y - ball2.y)) / Math.pow(rc, 2);

	                    //给与小球新的速度
	                    ball1.vx = (ball1.vx - ax) * collarg;
	                    ball1.vy = (ball1.vy - ay) * collarg;
	                    ball2.vx = (ball2.vx + ax) * collarg;
	                    ball2.vy = (ball2.vy + ay) * collarg;

	                    //获取两球斜切位置并且强制扭转
	                    var clength = (ball1.radius + ball2.radius - rc) / 2;
	                    var cx = clength * (ball1.x - ball2.x) / rc;
	                    var cy = clength * (ball1.y - ball2.y) / rc;
	                    ball1.x = ball1.x + cx;
	                    ball1.y = ball1.y + cy;
	                    ball2.x = ball2.x - cx;
	                    ball2.y = ball2.y - cy;
	                }
	            }
	        });
	    });
	};

	var start = function start(ctx, canvas, balls) {

	    var drawBall = function drawBall(ball) {
	        ctx.save();
	        ctx.beginPath();
	        ctx.arc(ball.x, ball.y, ball.radius - 1, 0, Math.PI * 2);
	        ctx.fillStyle = ball.color;
	        ctx.fill();
	        ctx.strokeStyle = '#FFF';
	        ctx.stroke();
	        ctx.beginPath();
	        ctx.arc(ball.x, ball.y, 3, 0, Math.PI * 2);
	        ctx.fillStyle = 'rgba(255,255,255,.5)';
	        ctx.fill();
	        ctx.restore();
	        ball.moving = false;
	    };

	    var tick = function tick() {
	        ctx.clearRect(0, 0, canvas.width, canvas.height);
	        ctx.save();
	        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
	        ctx.fillRect(0, 0, canvas.width, canvas.height);
	        ctx.restore();

	        var t = 16 / 1000;
	        collision(balls);

	        balls.map(function (ball) {
	            ball.move(t, canvas.width / 2, canvas.height / 2);
	            drawBall(ball);
	        });
	    };

	    var animate = function animate() {
	        requestAnimationFrame(animate);
	        tick();
	    };

	    animate();
	};

	var main = function main() {
	    var canvas = document.getElementById('canvas'),
	        ctx = canvas.getContext('2d');

	    canvas.width = window.innerWidth;
	    canvas.height = window.innerHeight;

	    var pxpm = canvas.width / 20,
	        balls = [];

	    for (var i = 0; i < ballNumber; i++) {
	        var x = Math.random() * 2 * areaRadius - areaRadius,
	            ylim = Math.sqrt(areaRadius * areaRadius - x * x),
	            y = Math.random() * 2 * ylim - ylim;

	        balls.push(new Ball(x + canvas.width / 2, y + canvas.height / 2, ballRadius, 'rgba(' + getRandomInt(255) + ', ' + getRandomInt(255) + ', ' + getRandomInt(255) + ', 1)', pxpm));
	    }

	    start(ctx, canvas, balls);
	};

	window.onload = function () {
	    main();
	};

/***/ }
/******/ ]);