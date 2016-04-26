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
	//https://stripe.com/connect

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	__webpack_require__(57);

	__webpack_require__(59);

	var _sky = __webpack_require__(61);

	var _ring = __webpack_require__(65);

	var _sun = __webpack_require__(66);

	var _meteor = __webpack_require__(67);

	var _star = __webpack_require__(63);

	var _util = __webpack_require__(62);

	var _data = __webpack_require__(64);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var skyContainer = document.querySelector(".sky"),
	    skyParallexElContainer = document.querySelector(".sky-parallax"),
	    meteorContainer = document.querySelector('.meteors');

	var makeFlare = function makeFlare(t, n) {
	    var r = document.createElement('div');
	    r.className = 'flare';
	    r.style.left = (0, _util.px)(t[0]);
	    r.style.top = (0, _util.px)(t[1]);
	    r.style.borderColor = (0, _util.rgb)(n);
	    //TODO
	    skyContainer.appendChild(r);

	    setTimeout(function () {
	        skyContainer.removeChild(r);
	    }, 2e3);
	};

	var Control = function () {
	    function Control(skyContainer, skyParallexElContainer, meteorContainer) {
	        _classCallCheck(this, Control);

	        this.skyParallexElContainer = skyParallexElContainer;
	        this.skyContainer = skyContainer;
	        this.meteorContainer = meteorContainer;

	        this.isPlaying = false;
	        this.lastTick = 0;
	        this.delta = null;
	        // this.delta;
	        // this.nextMeteor;
	        this.meteorCurvePoints = 300;
	        this.meteorLength = 16 / this.meteorCurvePoints; //TODO
	        this.meteors = [];
	        this.meteorRepo = [];
	        this.meteorLimit = 4;
	        this.nextAvailableMeteor = 0;
	        this.nextMeteor = -1;

	        //TODO
	        this.canvas = document.createElement("canvas"), this.canvas.width = _data.meteorOption.width, this.canvas.height = _data.meteorOption.height, this.ctx = this.canvas.getContext("2d"), this.ctx.lineCap = "round", this.meteorContainer.appendChild(this.canvas);

	        var sun = new _sun.Sun(_data.sunOption);
	        skyContainer.appendChild(sun.ele);

	        _data.skysOptions.map(function (skyOption) {
	            new _sky.Sky(skyContainer, skyOption);
	        });

	        _data.ringsOption.map(function (ringOption) {
	            var ring = new _ring.Ring(ringOption, _data.sunOption);
	            skyContainer.appendChild(ring.ele);
	        });

	        var smallStarsNumber = 400;
	        while (smallStarsNumber--) {
	            var m = 10 + Math.random() * (_data.meteorOption.width - 20),
	                g = 10 + Math.random() * (_data.meteorOption.height - 20),
	                y = 1 - Math.abs(m - _data.meteorOption.width / 2) / _data.meteorOption.width * 2,
	                b = 1 - Math.abs(g - _data.meteorOption.height / 2) / _data.meteorOption.height * 2,
	                w = Math.pow(y * b, 2);

	            if (m > _data.sunOption.position[0] - _data.sunOption.r && m < _data.sunOption.position[0] + _data.sunOption.r && g > _data.sunOption.position[1] - _data.sunOption.r && g < _data.sunOption.position[1] + _data.sunOption.r || Math.random() > w) {
	                continue;
	            }
	            var smallstar = new _star.SmallStar(m, g, y, b, w);
	            skyParallexElContainer.appendChild(smallstar.ele);
	        }

	        for (var i = 0; i < 10; i++) {
	            this.meteorRepo.push(new _meteor.Meteor(_data.skysOptions, _data.sunOption));
	        }
	    }

	    _createClass(Control, [{
	        key: 'L',
	        value: function L(t) {
	            this.ctx.globalAlpha = t.shineStrength * 6;
	            (0, _util.canvasDrawRotated)(this.ctx, t.curvePoints[t.progress.currentIndexClamped].fromSun.ang, this.sunOption.position, function () {
	                this.ctx.drawImage(this.shineTemplCanvas, this.shineCanvasSize / -2, this.shineCanvasSize / -2);
	            });
	        }
	    }, {
	        key: 'A',
	        value: function A(t) {
	            this.ctx.strokeStyle = (0, _util.rgb)([Math.round((0, _util.numInterpolate)(_data.meteorColor[0][0], _data.meteorColor[1][0], t.controlOption.progress.current)), Math.round((0, _util.numInterpolate)(_data.meteorColor[0][1], _data.meteorColor[1][1], t.controlOption.progress.current)), Math.round((0, _util.numInterpolate)(_data.meteorColor[0][2], _data.meteorColor[1][2], t.controlOption.progress.current))]);
	            var n = t.controlOption.curvePoints[t.controlOption.progress.currentIndexClamped];
	            for (var r = 0; r < this.meteorShades; r++) {
	                var i = r / (this.meteorShades - 1),
	                    s = 1 - r / this.meteorShades,
	                    o = Math.round(this.meteorSegments * s);
	                this.ctx.beginPath(), this.ctx.moveTo(n.p[0], n.p[1]);
	                for (var u = 1; u < o; u++) {
	                    var a = t.progress.currentIndex - u;
	                    a = (0, _util.clamp)(a, 0, t.curvePoints.length - 1);
	                    var f = t.curvePoints[a];
	                    this.ctx.lineTo(f.p[0], f.p[1]);
	                }
	                this.ctx.lineWidth = (0, _util.numInterpolate)(this.meteorWidth[0], this.meteorWidth[1], i);
	                var l = (0, _util.numInterpolate)(this.meteorAlpha[0], this.meteorAlpha[1], i);
	                l *= Math.max(t.shineStrength * 10, 0) + .5, this.ctx.globalAlpha = l, this.ctx.stroke();
	            }
	        }
	    }, {
	        key: 'tick',
	        value: function tick(t) {
	            t || (t = this.lastTick);

	            this.delta = Math.min(this.lastTick, 50);
	            if (t > this.nextMeteor && this.meteors.length < this.meteorLimit) {
	                console.log('s');
	                var meteor = this.meteorRepo[this.nextAvailableMeteor];
	                this.nextAvailableMeteor = (this.nextAvailableMeteor + 1) % this.meteorRepo.length;
	                meteor.controlOption.progress.current = 0;
	                meteor.controlOption.speed = 1;
	                meteor.controlOption.hasFlare = !1;

	                this.meteors.push(meteor);

	                makeFlare(meteor.controlOption.starA.p, _data.meteorColor[0]);
	                var r = (0, _util.numInterpolate)(_data.meteorInterval[0], _data.meteorInterval[1], Math.random());
	                this.nextMeteor = t + r;
	            }
	            this.ctx.clearRect(0, 0, 1200, 700); //TODO
	            for (var i = 0; i < this.meteors.length; i++) {
	                console.log('x');
	                var n = this.meteors[i];
	                if (n === false) continue;
	                n.controlOption.progress.currentIndex = Math.round(n.controlOption.progress.current * this.meteorCurvePoints);

	                n.controlOption.progress.currentIndexClamped = (0, _util.clamp)(n.controlOption.progress.currentIndex, 0, n.controlOption.curvePoints.length - 1);

	                console.log(n.controlOption.curvePoints[n.controlOption.progress.currentIndexClamped].fromSun.controlOption);

	                n.controlOption.shineStrength = (1 - n.controlOption.curvePoints[n.controlOption.progress.currentIndexClamped].fromSun.len / _data.sunOption.shineRange) * 0.25, n.controlOption.progress.current < 0.2 && (n.controlOption.shineStrength *= Math.max(n.controlOption.progress.current, 0) * 5);
	                n.controlOption.shineStrength > 0 && this.L(n);
	                this.A(n);
	                n.controlOption.progress.current > n.controlOption.progress.startTimes.starB && n.controlOption.speed > 0.9 ? n.controlOption.speed *= .99 : n.controlOption.progress.current > n.controlOption.progress.startTimes.orbit && n.controlOption.speed < 2 && (n.controlOption.speed *= 1.005);
	                n.controlOption.progress.current += this.delta / this.meteorDuration * n.controlOption.speed;
	                n.controlOption.progress.current > 1 && !n.controlOption.hasFlare && (makeFlare(n.controlOption.starB.p, _data.meteorColor[1]), n.controlOption.hasFlare = !0);
	                n.controlOption.progress.current > 1 + this.meteorLength && (this.meteors[i] = false);
	            }
	            for (var s = 0; s < this.meteors.length; s++) {
	                this.meteors[s] === false && this.meteors.splice(s, 1);
	            }this.lastTick = t, this.isPlaying && requestAnimationFrame(this.tick.bind(this));
	        }
	    }, {
	        key: 'start',
	        value: function start() {
	            if (this.isPlaying) {
	                return;
	            } else {
	                this.lastTick = performance.now();
	                this.isPlaying = true;
	                this.tick();
	            }
	        }
	    }]);

	    return Control;
	}();

	var mainControl = new Control(skyContainer, skyParallexElContainer, meteorContainer);
	mainControl.start();

/***/ },

/***/ 7:
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },

/***/ 8:
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}

	function createLinkElement() {
		var linkElement = document.createElement("link");
		var head = getHeadElement();
		linkElement.rel = "stylesheet";
		head.appendChild(linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement();
			update = updateLink.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },

/***/ 57:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(58);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/sass-loader/index.js!./../../../node_modules/autoprefixer-loader/index.js?{browsers:[\">1%\"]}!./animate.scss", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/sass-loader/index.js!./../../../node_modules/autoprefixer-loader/index.js?{browsers:[\">1%\"]}!./animate.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 58:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports


	// module
	exports.push([module.id, "@-webkit-keyframes header-in {\n  0% {\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n\n@keyframes header-in {\n  0% {\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n\n@-webkit-keyframes header-in-85 {\n  0% {\n    opacity: 0; }\n  100% {\n    opacity: .85; } }\n\n@keyframes header-in-85 {\n  0% {\n    opacity: 0; }\n  100% {\n    opacity: .85; } }\n\n@-webkit-keyframes star1 {\n  0% {\n    -webkit-transform: scale(1);\n    transform: scale(1); }\n  100% {\n    -webkit-transform: scale(0.8);\n    transform: scale(0.8); } }\n\n@keyframes star1 {\n  0% {\n    -webkit-transform: scale(1);\n    transform: scale(1); }\n  100% {\n    -webkit-transform: scale(0.8);\n    transform: scale(0.8); } }\n\n@-webkit-keyframes star2 {\n  0% {\n    -webkit-transform: scale(1);\n    transform: scale(1); }\n  100% {\n    -webkit-transform: scale(1.3);\n    transform: scale(1.3); } }\n\n@keyframes star2 {\n  0% {\n    -webkit-transform: scale(1);\n    transform: scale(1); }\n  100% {\n    -webkit-transform: scale(1.3);\n    transform: scale(1.3); } }\n\n@-webkit-keyframes dot1 {\n  0% {\n    -webkit-transform: translate(0, 0);\n    transform: translate(0, 0); }\n  100% {\n    -webkit-transform: translate(30px, 15px);\n    transform: translate(30px, 15px); } }\n\n@keyframes dot1 {\n  0% {\n    -webkit-transform: translate(0, 0);\n    transform: translate(0, 0); }\n  100% {\n    -webkit-transform: translate(30px, 15px);\n    transform: translate(30px, 15px); } }\n\n@-webkit-keyframes dot2 {\n  0% {\n    -webkit-transform: translate(0, 0);\n    transform: translate(0, 0); }\n  100% {\n    -webkit-transform: translate(-15px, -15px);\n    transform: translate(-15px, -15px); } }\n\n@keyframes dot2 {\n  0% {\n    -webkit-transform: translate(0, 0);\n    transform: translate(0, 0); }\n  100% {\n    -webkit-transform: translate(-15px, -15px);\n    transform: translate(-15px, -15px); } }\n\n@-webkit-keyframes dot3 {\n  0% {\n    -webkit-transform: translate(0, 0);\n    transform: translate(0, 0); }\n  100% {\n    -webkit-transform: translate(0, 30px);\n    transform: translate(0, 30px); } }\n\n@keyframes dot3 {\n  0% {\n    -webkit-transform: translate(0, 0);\n    transform: translate(0, 0); }\n  100% {\n    -webkit-transform: translate(0, 30px);\n    transform: translate(0, 30px); } }\n\n@-webkit-keyframes dot4 {\n  0% {\n    -webkit-transform: translate(0, 0);\n    transform: translate(0, 0); }\n  100% {\n    -webkit-transform: translate(-15px, -30px);\n    transform: translate(-15px, -30px); } }\n\n@keyframes dot4 {\n  0% {\n    -webkit-transform: translate(0, 0);\n    transform: translate(0, 0); }\n  100% {\n    -webkit-transform: translate(-15px, -30px);\n    transform: translate(-15px, -30px); } }\n\n@-webkit-keyframes flare {\n  0% {\n    -webkit-transform: scale(0.5);\n    transform: scale(0.5);\n    opacity: .5; }\n  100% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n    opacity: 0; } }\n\n@keyframes flare {\n  0% {\n    -webkit-transform: scale(0.5);\n    transform: scale(0.5);\n    opacity: .5; }\n  100% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n    opacity: 0; } }\n\n@-webkit-keyframes feature-logo-in {\n  0% {\n    opacity: 0; }\n  20% {\n    -webkit-transform: translate(0, -25px);\n    transform: translate(0, -25px);\n    opacity: 0; }\n  100% {\n    -webkit-transform: translate(0, 0);\n    transform: translate(0, 0);\n    opacity: 1; } }\n\n@keyframes feature-logo-in {\n  0% {\n    opacity: 0; }\n  20% {\n    -webkit-transform: translate(0, -25px);\n    transform: translate(0, -25px);\n    opacity: 0; }\n  100% {\n    -webkit-transform: translate(0, 0);\n    transform: translate(0, 0);\n    opacity: 1; } }\n\n@-webkit-keyframes feature-logo-out {\n  0% {\n    -webkit-transform: translate(0, 0);\n    transform: translate(0, 0);\n    opacity: 1; }\n  60% {\n    -webkit-transform: translate(0, 20px);\n    transform: translate(0, 20px);\n    opacity: 0; }\n  100% {\n    opacity: 0; } }\n\n@keyframes feature-logo-out {\n  0% {\n    -webkit-transform: translate(0, 0);\n    transform: translate(0, 0);\n    opacity: 1; }\n  60% {\n    -webkit-transform: translate(0, 20px);\n    transform: translate(0, 20px);\n    opacity: 0; }\n  100% {\n    opacity: 0; } }\n\n@-webkit-keyframes feature-text-in {\n  0%,\n  35% {\n    opacity: 0; }\n  100% {\n    -webkit-transform: translate(0, 0);\n    transform: translate(0, 0);\n    opacity: 1; } }\n\n@keyframes feature-text-in {\n  0%,\n  35% {\n    opacity: 0; }\n  100% {\n    -webkit-transform: translate(0, 0);\n    transform: translate(0, 0);\n    opacity: 1; } }\n\n@-webkit-keyframes feature-text-out {\n  0% {\n    opacity: 1; }\n  100%,\n  50% {\n    opacity: 0; } }\n\n@keyframes feature-text-out {\n  0% {\n    opacity: 1; }\n  100%,\n  50% {\n    opacity: 0; } }\n", ""]);

	// exports


/***/ },

/***/ 59:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(60);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/sass-loader/index.js!./../../../node_modules/autoprefixer-loader/index.js?{browsers:[\">1%\"]}!./style.scss", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/sass-loader/index.js!./../../../node_modules/autoprefixer-loader/index.js?{browsers:[\">1%\"]}!./style.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 60:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports


	// module
	exports.push([module.id, "html, body, div {\n  margin: 0;\n  padding: 0; }\n\n.world {\n  background: -webkit-linear-gradient(bottom right, #4cddff, #3b9aca 10%, #2d6ca5 20%, #2a5291 27%, #283d81 35%, #222654 50%, #1e1635 63%, #0c0010 93%, #000);\n  background: linear-gradient(to top left, #4cddff, #3b9aca 10%, #2d6ca5 20%, #2a5291 27%, #283d81 35%, #222654 50%, #1e1635 63%, #0c0010 93%, #000);\n  height: 700px; }\n\n.sky .star {\n  -webkit-animation: star1 5s alternate ease-in-out infinite;\n  animation: star1 5s alternate ease-in-out infinite; }\n\n.sky *, .sky-parallax * {\n  position: absolute;\n  box-sizing: border-box;\n  border-radius: 50%; }\n\n.flare {\n  width: 40px;\n  height: 40px;\n  margin: -20px 0 0 -20px;\n  border: 2px solid #fff;\n  -webkit-animation: flare 1s linear;\n  animation: flare 1s linear;\n  -webkit-animation-fill-mode: forwards;\n  animation-fill-mode: forwards; }\n", ""]);

	// exports


/***/ },

/***/ 61:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Sky = undefined;

	var _util = __webpack_require__(62);

	var _star = __webpack_require__(63);

	var _data = __webpack_require__(64);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// TODO
	var cssPrefix = '';

	var Sky = exports.Sky = function Sky(container, skyOption) {
	    _classCallCheck(this, Sky);

	    skyOption.stars.map(function (starOption) {
	        starOption.position[0] = Math.round(starOption.position[0] * _data.meteorOption.gridSize[0] + _data.meteorOption.offset[0]);
	        starOption.position[1] = Math.round(starOption.position[1] * _data.meteorOption.gridSize[1] + _data.meteorOption.offset[1]);

	        var star = new _star.Star(starOption, skyOption);
	        container.appendChild(star.ele);
	    });
	};

/***/ },

/***/ 62:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var rgb = function rgb(e) {
	    return 'rgb(' + e[0] + ',' + e[1] + ',' + e[2] + ')';
	};

	var rgba = function rgba(e, t) {
	    return 'rgba(' + e[0] + ',' + e[1] + ',' + e[2] + ',' + t + ')';
	};

	var px = function px(v) {
	    return v + 'px';
	};

	var arrayRandom = function arrayRandom(e) {
	    return e[Math.floor(Math.random() * e.length)];
	};

	var numInterpolate = function numInterpolate(e, t, n) {
	    return e * (1 - n) + t * n;
	};

	var numReverseInterpolate = function numReverseInterpolate(e, t, n) {
	    return (n - e) / (t - e);
	};

	var clamp = function clamp(e, t, n) {
	    return Math.max(Math.min(e, n), t);
	};

	var canvasCircle = function canvasCircle(e, t, n) {
	    e.beginPath();
	    e.arc(t[0], t[1], n, 0, Math.PI * 2);
	};

	var canvasClearFill = function canvasClearFill(e) {

	    e.fillStyle = "black";
	    e.globalCompositeOperation = "destination-out";
	    e.fill();
	    e.globalCompositeOperation = "source-over";
	};

	var canvasDrawRotated = function canvasDrawRotated(e, t, n, r) {
	    e.translate(n[0], n[1]);
	    e.rotate(t);
	    r();
	    e.setTransform(1, 0, 0, 1, 0, 0);
	};

	exports.px = px;
	exports.arrayRandom = arrayRandom;
	exports.numInterpolate = numInterpolate;
	exports.numReverseInterpolate = numReverseInterpolate;
	exports.clamp = clamp;
	exports.rgb = rgb;
	exports.rgba = rgba;
	exports.canvasCircle = canvasCircle;
	exports.canvasDrawRotated = canvasDrawRotated;
	exports.canvasClearFill = canvasClearFill;

/***/ },

/***/ 63:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.SmallStar = exports.Star = undefined;

	var _util = __webpack_require__(62);

	var _data = __webpack_require__(64);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// TODO

	var Star = exports.Star = function Star(starOption, skyOption) {
	    _classCallCheck(this, Star);

	    this.ele = document.createElement('div');
	    this.ele.className = 'star';
	    this.ele.style.width = this.ele.style.height = (0, _util.px)(skyOption.r * 2);
	    this.ele.style.left = (0, _util.px)(starOption.position[0] - skyOption.r);
	    this.ele.style.top = (0, _util.px)(starOption.position[1] - skyOption.r);
	    this.ele.style.border = skyOption.strokeWidth + 'px solid ' + skyOption.strokeColor;
	    this.ele.style.opacity = starOption.opacity;
	    this.ele.style[_data.cssPrefix + 'animation-name'] = (0, _util.arrayRandom)(['star1', 'star2']);
	    this.ele.style[_data.cssPrefix + 'animation-duration'] = (0, _util.numInterpolate)(2e3, 1e4, Math.random()) + 'ms';
	    this.ele.style[_data.cssPrefix + 'animation-delay'] = (0, _util.numInterpolate)(0, 1e3, Math.random()) + 'ms';
	};

	var SmallStar = exports.SmallStar = function SmallStar(m, g, y, b, w) {
	    _classCallCheck(this, SmallStar);

	    var o = (0, _util.numReverseInterpolate)(0, _data.meteorOption.width, m),
	        E = (0, _util.rgb)([Math.round((0, _util.numInterpolate)(_data.meteorColor[0][0], _data.meteorColor[1][0], o)), Math.round((0, _util.numInterpolate)(_data.meteorColor[0][1], _data.meteorColor[1][1], o)), Math.round((0, _util.numInterpolate)(_data.meteorColor[0][2], _data.meteorColor[1][2], o))]);

	    var div = document.createElement('div');
	    div.className = 'dot', div.style.width = div.style.height = (0, _util.px)(Math.floor(Math.random() * 3 + 4));
	    div.style.left = (0, _util.px)(m);
	    div.style.top = (0, _util.px)(g);
	    div.style.backgroundColor = E;
	    div.style.opacity = Math.random() * 0.25 + 0.25;
	    div.style[_data.cssPrefix + 'animation-name'] = (0, _util.arrayRandom)(['dot1', 'dot2', 'dot3', 'dot4']);
	    div.style[_data.cssPrefix + 'animation-duration'] = (0, _util.numInterpolate)(1e4, 4e4, Math.random()) + 'ms';
	    div.style[_data.cssPrefix + 'animation-delay'] = (0, _util.numInterpolate)(0, 1e3, Math.random()) + 'ms';

	    this.ele = div;
	};

/***/ },

/***/ 64:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.meteorCurvePoints = exports.cssPrefix = exports.meteorOption = exports.meteorInterval = exports.meteorColor = exports.sunOption = exports.ringsOption = exports.skysOptions = undefined;

	var _util = __webpack_require__(62);

	var meteorColor = [[185, 164, 255], [83, 236, 184]];

	var skysOptions = [{
	    r: 7,
	    strokeWidth: 4,
	    strokeColor: (0, _util.rgb)(meteorColor[0]),
	    stars: [{
	        position: [3, 0],
	        opacity: 0.1
	    }, {
	        position: [0, 2],
	        opacity: 0.2
	    }, {
	        position: [2, 3],
	        opacity: 0.3
	    }, {
	        position: [4, 2],
	        opacity: 0.3
	    }, {
	        position: [1, 6],
	        opacity: 0.3
	    }, {
	        position: [2, 9],
	        opacity: 0.3
	    }, {
	        position: [8, 3],
	        opacity: 0.4
	    }, {
	        position: [4, 4],
	        opacity: 0.4
	    }, {
	        position: [5, 5],
	        opacity: 0.4
	    }, {
	        position: [4, 6],
	        opacity: 0.4
	    }, {
	        position: [5, 8],
	        opacity: 0.4
	    }, {
	        position: [7, 4],
	        opacity: 0.5
	    }, {
	        position: [7, 5],
	        opacity: 0.5
	    }, {
	        position: [6, 6],
	        opacity: 0.5
	    }, {
	        position: [6, 7],
	        opacity: 0.5
	    }]
	}, {
	    r: 10,
	    strokeWidth: 2,
	    strokeColor: (0, _util.rgb)(meteorColor[1]),
	    stars: [{
	        position: [15, 5],
	        opacity: 0.5
	    }, {
	        position: [15, 9],
	        opacity: 0.5
	    }, {
	        position: [14, 10],
	        opacity: 0.5
	    }, {
	        position: [13, 11],
	        opacity: 0.5
	    }, {
	        position: [16, 4],
	        opacity: 0.4
	    }, {
	        position: [17, 6],
	        opacity: 0.4
	    }, {
	        position: [17, 9],
	        opacity: 0.4
	    }, {
	        position: [16, 10],
	        opacity: 0.4
	    }, {
	        position: [17, 10],
	        opacity: 0.4
	    }, {
	        position: [16, 12],
	        opacity: 0.4
	    }, {
	        position: [18, 5],
	        opacity: 0.3
	    }, {
	        position: [18, 8],
	        opacity: 0.3
	    }, {
	        position: [19, 10],
	        opacity: 0.3
	    }, {
	        position: [22, 4],
	        opacity: 0.2
	    }, {
	        position: [23, 6],
	        opacity: 0.2
	    }, {
	        position: [21, 7],
	        opacity: 0.2
	    }, {
	        position: [21, 9],
	        opacity: 0.2
	    }, {
	        position: [23, 2],
	        opacity: 0.2
	    }]
	}];

	var ringsOption = [[97, 0.1], [127, 0.08], [177, 0.06], [254, 0.04], [361, 0.02]];

	var sunOption = {
	    r: 80,
	    position: [464, 369],
	    strokeWidth: 2,
	    attractRange: 70,
	    pushRange: [97, 127, 177],
	    shineRange: 250,
	    shineColor: [204, 248, 255],
	    shineSize: 0.6,
	    shineSegments: 10,
	    hazeColor: [134, 145, 255],
	    hazeSize: 100
	};

	var meteorOption = {
	    width: 1200,
	    height: 700,
	    gridSize: [50, 50],
	    offset: [11, 18],
	    meteorInterval: [1e3, 3e3],
	    meteorLimit: 4,
	    meteorDuration: 8e3,
	    meteorCurvePoints: 300,
	    meteorShades: 8,
	    meteorSegments: 16,
	    meteorWidth: [2, 5],
	    meteorAlpha: [0.05, 0.12]
	};

	var cssPrefix = '';

	var meteorCurvePoints = 300;

	var meteorInterval = [1e3, 3e3];

	exports.skysOptions = skysOptions;
	exports.ringsOption = ringsOption;
	exports.sunOption = sunOption;
	exports.meteorColor = meteorColor;
	exports.meteorInterval = meteorInterval;
	exports.meteorOption = meteorOption;
	exports.cssPrefix = cssPrefix;
	exports.meteorCurvePoints = meteorCurvePoints;

/***/ },

/***/ 65:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Ring = undefined;

	var _util = __webpack_require__(62);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ringColor = "255,255,255";

	var Ring = exports.Ring = function Ring(ringOption, sunOption) {
	    _classCallCheck(this, Ring);

	    var div = document.createElement('div');
	    div.className = 'ring';
	    div.style.width = div.style.height = (0, _util.px)(ringOption[0] * 2);
	    div.style.left = (0, _util.px)(sunOption.position[0] - ringOption[0]);
	    div.style.top = (0, _util.px)(sunOption.position[1] - ringOption[0]);
	    div.style.opacity = ringOption[1];
	    div.style.border = '1px solid rgb(' + ringColor + ')';

	    this.ele = div;
	};

/***/ },

/***/ 66:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Sun = undefined;

	var _util = __webpack_require__(62);

	var _data = __webpack_require__(64);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Sun = exports.Sun = function Sun(sunOption) {
	    _classCallCheck(this, Sun);

	    var dpr = window.devicePixelRatio,
	        n = sunOption.r * 2 + 20,
	        canvas = document.createElement('canvas');

	    canvas.width = canvas.height = n * dpr;
	    canvas.style.width = canvas.style.height = (0, _util.px)(n);
	    canvas.style.left = (0, _util.px)(sunOption.position[0] - n / 2);
	    canvas.style.top = (0, _util.px)(sunOption.position[1] - n / 2);

	    var context = canvas.getContext('2d');
	    context.scale(dpr, dpr);

	    var style = context.createLinearGradient(0, 0, n, n);
	    style.addColorStop(0.1, (0, _util.rgba)(_data.meteorColor[0], 0.65)), style.addColorStop(0.9, (0, _util.rgba)(_data.meteorColor[1], 0.65)), (0, _util.canvasCircle)(context, [n / 2, n / 2], sunOption.r), context.lineWidth = sunOption.strokeWidth, context.strokeStyle = style, context.stroke();

	    this.ele = canvas;
	};

/***/ },

/***/ 67:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Meteor = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _util = __webpack_require__(62);

	var _vec = __webpack_require__(68);

	var _data = __webpack_require__(64);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Meteor = exports.Meteor = function () {
	    function Meteor(skysOptions, sunOption) {
	        _classCallCheck(this, Meteor);

	        this.sunOption = sunOption;

	        var controlOption = {
	            starA: {
	                toSun: {},
	                tang: {},
	                toStarB: {}
	            },
	            starB: {
	                toSun: {},
	                tang: {}
	            },
	            orbit: {},
	            progress: {
	                current: 0
	            },
	            speed: 1,
	            curvePoints: [] },
	            i = Math.floor(Math.random() * skysOptions[0].stars.length),
	            s = Math.floor(Math.random() * skysOptions[1].stars.length);

	        controlOption.starA.p = skysOptions[0].stars[i].position;
	        controlOption.starB.p = skysOptions[1].stars[s].position;

	        skysOptions[0].stars.splice(i, 1);
	        skysOptions[1].stars.splice(s, 1);

	        controlOption.orbit.r = (0, _util.arrayRandom)(sunOption.pushRange);
	        controlOption.starA.toStarB.vec = _vec.Vec2.direction(controlOption.starA.p, controlOption.starB.p);
	        controlOption.starA.toStarB.ang = _vec.Vec2.angleHorz(controlOption.starA.toStarB.vec);
	        controlOption.starA.toSun.vec = _vec.Vec2.direction(controlOption.starA.p, sunOption.position);
	        controlOption.starB.toSun.vec = _vec.Vec2.direction(controlOption.starB.p, sunOption.position);

	        controlOption.starA.toSun.len = _vec.Vec2.lengthFn(controlOption.starA.toSun.vec);
	        controlOption.starB.toSun.len = _vec.Vec2.lengthFn(controlOption.starB.toSun.vec);
	        controlOption.starA.toSun.ang = _vec.Vec2.angleHorz(controlOption.starA.toSun.vec);
	        controlOption.starB.toSun.ang = _vec.Vec2.angleHorz(controlOption.starB.toSun.vec);

	        while (controlOption.orbit.r > controlOption.starA.toSun.len) {
	            controlOption.orbit.r = (0, _util.arrayRandom)(sunOption.pushRange);
	        }controlOption.orbit.positionlockwise = controlOption.starA.toStarB.ang > controlOption.starA.toSun.ang ? 1 : -1;
	        controlOption.starA.tang.len = Math.sqrt(Math.pow(controlOption.starA.toSun.len, 2) - Math.pow(controlOption.orbit.r, 2));
	        controlOption.starB.tang.len = Math.sqrt(Math.pow(controlOption.starB.toSun.len, 2) - Math.pow(controlOption.orbit.r, 2));

	        controlOption.starA.tang.ang = controlOption.starA.toSun.ang - Math.asin(controlOption.orbit.r / controlOption.starA.toSun.len) * controlOption.orbit.clockwise;
	        controlOption.starB.tang.ang = controlOption.starB.toSun.ang + Math.asin(controlOption.orbit.r / controlOption.starB.toSun.len) * controlOption.orbit.clockwise;

	        controlOption.starA.tang.vec = _vec.Vec2.fromAngle(controlOption.starA.tang.ang, controlOption.starA.tang.len);
	        controlOption.starB.tang.vec = _vec.Vec2.fromAngle(controlOption.starB.tang.ang, controlOption.starB.tang.len);
	        controlOption.starA.tang.p = _vec.Vec2.add(controlOption.starA.p, controlOption.starA.tang.vec);
	        controlOption.starB.tang.p = _vec.Vec2.add(controlOption.starB.p, controlOption.starB.tang.vec);
	        controlOption.orbit.enterAng = _vec.Vec2.angleHorz(_vec.Vec2.direction(sunOption.position, controlOption.starA.tang.p));
	        controlOption.orbit.leaveAng = _vec.Vec2.angleHorz(_vec.Vec2.direction(sunOption.position, controlOption.starB.tang.p));
	        controlOption.orbit.enterAng < 0 && (controlOption.orbit.enterAng += Math.PI * 2);
	        controlOption.orbit.leaveAng < 0 && (controlOption.orbit.leaveAng += Math.PI * 2);
	        controlOption.orbit.leaveAng += Math.PI * 2 * controlOption.orbit.positionlockwise;
	        controlOption.orbit.totalAng = Math.abs(controlOption.orbit.leaveAng - controlOption.orbit.enterAng);
	        controlOption.orbit.len = controlOption.orbit.totalAng * controlOption.orbit.r;

	        var o = controlOption.starA.tang.len + controlOption.orbit.len + controlOption.starB.tang.len,
	            u = controlOption.starA.tang.len / o,
	            a = controlOption.orbit.len / o;

	        controlOption.progress.startTimes = {
	            orbit: u,
	            starB: u + a
	        }, this.meteorCurve(controlOption);
	        this.controlOption = controlOption;
	    }

	    _createClass(Meteor, [{
	        key: 'meteorCurve',
	        value: function meteorCurve(controlOption) {
	            for (var n = 0; n < _data.meteorCurvePoints; n++) {
	                var r = n / (_data.meteorCurvePoints - 1);

	                var s = undefined;

	                if (r < controlOption.progress.startTimes.orbit) {
	                    var _i = (0, _util.numReverseInterpolate)(0, controlOption.progress.startTimes.orbit, r);

	                    s = [(0, _util.numInterpolate)(controlOption.starA.p[0], controlOption.starA.tang.p[0], _i), (0, _util.numInterpolate)(controlOption.starA.p[1], controlOption.starA.tang.p[1], _i)];
	                } else if (r < controlOption.progress.startTimes.starB) {
	                    var i = (0, _util.numReverseInterpolate)(controlOption.progress.startTimes.orbit, controlOption.progress.startTimes.starB, r),
	                        o = (0, _util.numInterpolate)(controlOption.orbicontrolOption.enterAng, controlOption.orbicontrolOption.leaveAng, i),
	                        u = _vec.Vec2.fromAngle(o, controlOption.orbicontrolOption.r);

	                    s = _vec.Vec2.add(this.sunOption.position, u);
	                } else {
	                    var _i2 = (0, _util.numReverseInterpolate)(controlOption.progress.startTimes.starB, 1, r);
	                    s = [(0, _util.numInterpolate)(controlOption.starB.tang.p[0], controlOption.starB.p[0], _i2), (0, _util.numInterpolate)(controlOption.starB.tang.p[1], controlOption.starB.p[1], _i2)];
	                }

	                var a = {};
	                a.p = s, a.fromSun = {}, a.fromSun.vec = _vec.Vec2.direction(this.sunOption.position, s), a.fromSun.len = _vec.Vec2.lengthFn(a.fromSun.vec), a.fromSun.ang = _vec.Vec2.angleHorz(a.fromSun.vec), controlOption.curvePoints.push(a);
	            }
	        }
	    }]);

	    return Meteor;
	}();

/***/ },

/***/ 68:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Vec2 = exports.Vec2 = function () {
	    function Vec2() {
	        _classCallCheck(this, Vec2);
	    }

	    _createClass(Vec2, null, [{
	        key: 'direction',
	        value: function direction(e, t) {
	            return [t[0] - e[0], t[1] - e[1]];
	        }
	    }, {
	        key: 'lengthFn',
	        value: function lengthFn(e) {
	            return Math.sqrt(e[0] * e[0] + e[1] * e[1]);
	        }
	    }, {
	        key: 'distance',
	        value: function distance(e, t) {
	            var n = Vec2.direction(e, t);
	            return Vec2.length(n);
	        }
	    }, {
	        key: 'normalize',
	        value: function normalize(e, t) {
	            return t === undefined && (t = Vec2.length(e)), [e[0] / t, e[1] / t];
	        }
	    }, {
	        key: 'scale',
	        value: function scale(e, t) {
	            return [e[0] * t, e[1] * t];
	        }
	    }, {
	        key: 'add',
	        value: function add(e, t) {
	            return [e[0] + t[0], e[1] + t[1]];
	        }
	    }, {
	        key: 'subtract',
	        value: function subtract(e, t) {
	            return [e[0] - t[0], e[1] - t[1]];
	        }
	    }, {
	        key: 'angleVert',
	        value: function angleVert(e) {
	            return Math.atan2(e[0], e[1]);
	        }
	    }, {
	        key: 'angleHorz',
	        value: function angleHorz(e) {
	            return Math.atan2(e[1], e[0]);
	        }
	    }, {
	        key: 'interpolate',
	        value: function interpolate(e, t, n) {
	            return [e[0] + (t[0] - e[0]) * n, e[1] + (t[1] - e[1]) * n];
	        }
	    }, {
	        key: 'fromAngle',
	        value: function fromAngle(e, t) {
	            return [Math.cos(e) * t, Math.sin(e) * t];
	        }
	    }]);

	    return Vec2;
	}();

/***/ }

/******/ });