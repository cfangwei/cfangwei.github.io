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
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _box = __webpack_require__(17);

	var _creeper = __webpack_require__(18);

	var createLights = function createLights(scene) {
	    var globalLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.5);

	    var shadowLight = new THREE.DirectionalLight(0x314924, 0.9);
	    shadowLight.position.set(-20, -20, 150);
	    shadowLight.castShadow = true;
	    shadowLight.shadowDarkness = 1;
	    shadowLight.shadowMapWidth = shadowLight.shadowMapHeight = 2048;

	    var backLight = new THREE.DirectionalLight(0xff00ff, 0.9);
	    backLight.position.set(-100, 100, 200);
	    backLight.castShadow = true;
	    backLight.shadowDarkness = 0.1;
	    backLight.shadowMapWidth = shadowLight.shadowMapHeight = 2048;

	    var light1 = new THREE.PointLight(0xff0040, 1, 5000);
	    light1.position.set(100, 100, 100);

	    //scene.add(globalLight);
	    scene.add(shadowLight);
	    scene.add(backLight);
	    scene.add(light1);
	};

	var createFloor = function createFloor(scene) {
	    var floor = new THREE.Mesh(new THREE.PlaneBufferGeometry(1000, 1000), new THREE.MeshBasicMaterial({ color: 0xcbbbbb }));

	    floor.rotation.x = -Math.PI / 2;
	    floor.position.y = 0;
	    floor.receiveShadow = true;
	    scene.add(floor);
	};

	var createBox = function createBox(scene) {
	    var box = new _box.Box();
	    box.threeGroup.rotation.x = -Math.PI / 2;
	    box.threeGroup.position.y = 1;
	    scene.add(box.threeGroup);
	};

	var createCreeper = function createCreeper(scene) {
	    var creeper = new _creeper.Creeper();

	    creeper.threeGroup.position.y = 150;
	    creeper.threeGroup.position.x = 150;
	    scene.add(creeper.threeGroup);
	};

	var main = function main() {
	    var HEIGHT = window.innerHeight,
	        WIDTH = window.innerWidth,
	        windowHalfX = WIDTH / 2,
	        windowHalfY = HEIGHT / 2;

	    var scene = new THREE.Scene();

	    var aspectRatio = WIDTH / HEIGHT,
	        fieldOfView = 50,
	        nearPlane = 1,
	        farPlane = 2000;

	    var camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);

	    camera.position.x = 0;
	    camera.position.z = 300;
	    camera.position.y = 450;
	    camera.lookAt(new THREE.Vector3(0, 60, 0));

	    var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

	    renderer.setSize(WIDTH, HEIGHT);
	    renderer.shadowMap = true;

	    var container = document.getElementById('world');
	    container.appendChild(renderer.domElement);

	    //createLights(scene);
	    createFloor(scene);
	    createBox(scene);
	    createCreeper(scene);

	    var controls = new THREE.OrbitControls(camera, renderer.domElement);
	    controls.minPolarAngle = -Math.PI / 2;
	    controls.maxPolarAngle = Math.PI / 2;
	    controls.noZoom = true;
	    controls.noPan = true;

	    var render = function render() {
	        renderer.render(scene, camera);
	    };

	    render();

	    var t = 0;
	    var control = {
	        loop: function loop() {
	            render();
	            t += 0.05;
	            requestAnimationFrame(control.loop);
	        }
	    };
	    return control;
	};

	var control = main();
	control.loop();

/***/ },

/***/ 17:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Box = exports.Box = function Box() {
	    _classCallCheck(this, Box);

	    this.threeGroup = new THREE.Group();

	    var boxBody = new THREE.Group();

	    var faceBufferGeometry = new THREE.PlaneBufferGeometry(100, 100),
	        meshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0xa0ee76 });

	    var face1 = new THREE.Mesh(faceBufferGeometry, meshBasicMaterial),
	        face2 = new THREE.Mesh(faceBufferGeometry, meshBasicMaterial),
	        face3 = new THREE.Mesh(faceBufferGeometry, meshBasicMaterial),
	        face4 = new THREE.Mesh(faceBufferGeometry, meshBasicMaterial),
	        face5 = new THREE.Mesh(faceBufferGeometry, meshBasicMaterial);

	    face2.rotation.x = Math.PI / 2;
	    face3.rotation.y = Math.PI / 2;
	    face4.rotation.y = Math.PI / 2;
	    face5.rotation.x = Math.PI / 2;

	    face2.position.y = -50;
	    face3.position.x = -50;
	    face4.position.x = 50;
	    face5.position.y = 50;

	    boxBody.add(face1);
	    boxBody.add(face2);
	    boxBody.add(face3);
	    boxBody.add(face4);
	    boxBody.add(face5);

	    this.threeGroup.add(boxBody);

	    var geometry = new THREE.SphereGeometry(50, 100, 100);
	    var material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
	    var sphere = new THREE.Mesh(geometry, material);
	    sphere.position.z = 40;
	    this.threeGroup.add(sphere);
	};

/***/ },

/***/ 18:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Creeper = exports.Creeper = function () {
	    function Creeper() {
	        _classCallCheck(this, Creeper);

	        this.threeGroup = new THREE.Group();

	        this.createHead();

	        var CustomSinCurve = THREE.Curve.create(function (scale) {
	            //custom curve constructor
	            this.scale = scale === undefined ? 1 : scale;
	        }, function (t) {
	            //getPoint: t is between 0-1
	            var tx = t * 3 - 1.5,
	                ty = Math.sin(2 * Math.PI * t),
	                tz = 0;

	            return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
	        });

	        var path = new CustomSinCurve(20);

	        var geometry = new THREE.TubeGeometry(path, //path
	        200, //segments
	        20, //radius
	        80, //radiusSegments
	        false //closed
	        );

	        var material = new THREE.MeshBasicMaterial({ color: 0x444444 });

	        this.threeGroup.add(new THREE.Mesh(geometry, material));
	    }

	    _createClass(Creeper, [{
	        key: 'createHead',
	        value: function createHead() {
	            var geometry = new THREE.BoxGeometry(50, 50, 50);
	            var material = new THREE.MeshBasicMaterial({ color: 0x444444 });
	            this.head = new THREE.Mesh(geometry, material);
	            this.head.position.z = 100;

	            this.threeGroup.add(this.head);
	        }
	    }]);

	    return Creeper;
	}();

/***/ }

/******/ });