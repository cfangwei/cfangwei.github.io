!function(e){function n(o){if(t[o])return t[o].exports;var r=t[o]={exports:{},id:o,loaded:!1};return e[o].call(r.exports,r,r.exports,n),r.loaded=!0,r.exports}var t={};return n.m=e,n.c=t,n.p="/build/",n(0)}({0:function(e,n,t){"use strict";var o=t(38),r=t(39),a=function(e){var n=new THREE.Mesh(new THREE.PlaneBufferGeometry(1e3,1e3),new THREE.MeshBasicMaterial({color:13351867}));n.rotation.x=-Math.PI/2,n.position.y=0,n.receiveShadow=!0,e.add(n)},i=function(e){var n=new o.Box;n.threeGroup.rotation.x=-Math.PI/2,n.threeGroup.position.y=1,e.add(n.threeGroup)},s=function(e){var n=new r.Creeper;n.threeGroup.position.y=150,n.threeGroup.position.x=150,e.add(n.threeGroup)},u=function(){var e=window.innerHeight,n=window.innerWidth,t=new THREE.Scene,o=n/e,r=50,u=1,h=2e3,E=new THREE.PerspectiveCamera(r,o,u,h);E.position.x=0,E.position.z=300,E.position.y=450,E.lookAt(new THREE.Vector3(0,60,0));var c=new THREE.WebGLRenderer({alpha:!0,antialias:!0});c.setSize(n,e),c.shadowMap=!0;var d=document.getElementById("world");d.appendChild(c.domElement),a(t),i(t),s(t);var l=new THREE.OrbitControls(E,c.domElement);l.minPolarAngle=-Math.PI/2,l.maxPolarAngle=Math.PI/2,l.noZoom=!0,l.noPan=!0;var p=function(){c.render(t,E)};p();var w=0,f={loop:function(){p(),w+=.05,requestAnimationFrame(f.loop)}};return f},h=u();h.loop()},38:function(e,n){"use strict";function t(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});n.Box=function o(){t(this,o),this.threeGroup=new THREE.Group;var e=new THREE.Group,n=new THREE.PlaneBufferGeometry(100,100),r=new THREE.MeshBasicMaterial({color:10546806}),a=new THREE.Mesh(n,r),i=new THREE.Mesh(n,r),s=new THREE.Mesh(n,r),u=new THREE.Mesh(n,r),h=new THREE.Mesh(n,r);i.rotation.x=Math.PI/2,s.rotation.y=Math.PI/2,u.rotation.y=Math.PI/2,h.rotation.x=Math.PI/2,i.position.y=-50,s.position.x=-50,u.position.x=50,h.position.y=50,e.add(a),e.add(i),e.add(s),e.add(u),e.add(h),this.threeGroup.add(e);var E=new THREE.SphereGeometry(50,100,100),c=new THREE.MeshBasicMaterial({color:16776960}),d=new THREE.Mesh(E,c);d.position.z=40,this.threeGroup.add(d)}},39:function(e,n){"use strict";function t(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var o=function(){function e(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(n,t,o){return t&&e(n.prototype,t),o&&e(n,o),n}}();n.Creeper=function(){function e(){t(this,e),this.threeGroup=new THREE.Group,this.createHead();var n=THREE.Curve.create(function(e){this.scale=void 0===e?1:e},function(e){var n=3*e-1.5,t=Math.sin(2*Math.PI*e),o=0;return new THREE.Vector3(n,t,o).multiplyScalar(this.scale)}),o=new n(20),r=new THREE.TubeGeometry(o,200,20,80,!1),a=new THREE.MeshBasicMaterial({color:4473924});this.threeGroup.add(new THREE.Mesh(r,a))}return o(e,[{key:"createHead",value:function(){var e=new THREE.BoxGeometry(50,50,50),n=new THREE.MeshBasicMaterial({color:4473924});this.head=new THREE.Mesh(e,n),this.head.position.z=100,this.threeGroup.add(this.head)}}]),e}()}});