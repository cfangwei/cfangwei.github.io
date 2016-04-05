

var HEIGHT = window.innerHeight,
    WIDTH = window.innerWidth,
    windowHalfX = WIDTH / 2,
    windowHalfY = HEIGHT / 2;

var scene = new THREE.Scene();

var aspectRatio = WIDTH / HEIGHT,
fieldOfView = 50,
nearPlane = 1,
farPlane = 2000;

var camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane
);

camera.position.x = 0;
camera.position.z = 300;
camera.position.y = 450;
camera.lookAt(new THREE.Vector3(0, 60, 0));

var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

renderer.setSize(WIDTH, HEIGHT);
renderer.shadowMap = true;

var container = document.getElementById('world');
container.appendChild(renderer.domElement);




var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.minPolarAngle = -Math.PI / 2; 
controls.maxPolarAngle = Math.PI / 2;
controls.noZoom = true;
controls.noPan = true;

var render = () => {
    renderer.render(scene, camera);
};
