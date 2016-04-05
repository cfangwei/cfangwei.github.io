'use strict';

import {Box} from './box.js';
import {Creeper} from './creeper.js';


let createLights = (scene) => {
    let globalLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.5);
    
    let shadowLight = new THREE.DirectionalLight(0x314924, 0.9);
    shadowLight.position.set(-20, -20, 150);
    shadowLight.castShadow = true;
    shadowLight.shadowDarkness = 1;
    shadowLight.shadowMapWidth = shadowLight.shadowMapHeight = 2048;
    
    let backLight = new THREE.DirectionalLight(0xff00ff, 0.9);
    backLight.position.set(-100, 100, 200);
    backLight.castShadow = true;
    backLight.shadowDarkness = 0.1;
    backLight.shadowMapWidth = shadowLight.shadowMapHeight = 2048;

    var light1 = new THREE.PointLight( 0xff0040, 1, 5000 );
    light1.position.set( 100, 100, 100 );
    
    //scene.add(globalLight);
    scene.add(shadowLight);
    scene.add(backLight);
    scene.add(light1);
};

let createFloor = (scene) => {
    let floor = new THREE.Mesh(new THREE.PlaneBufferGeometry(1000,1000),
                               new THREE.MeshBasicMaterial({color: 0xcbbbbb}));
    
    floor.rotation.x = - Math.PI / 2;
    floor.position.y = 0;
    floor.receiveShadow = true;
    scene.add(floor);
};

let createBox = (scene) => {
    let box = new Box();
    box.threeGroup.rotation.x = - Math.PI / 2;
    box.threeGroup.position.y = 1;
    scene.add(box.threeGroup);
};

let createCreeper = (scene) => {
    let creeper = new Creeper();

    creeper.threeGroup.position.y = 150;
    creeper.threeGroup.position.x = 150;
    scene.add(creeper.threeGroup);
};

let main = () => {
    let HEIGHT = window.innerHeight,
        WIDTH = window.innerWidth,
        windowHalfX = WIDTH / 2,
        windowHalfY = HEIGHT / 2;

    let scene = new THREE.Scene();

    let aspectRatio = WIDTH / HEIGHT,
        fieldOfView = 50,
        nearPlane = 1,
        farPlane = 2000;
    
    let camera = new THREE.PerspectiveCamera(
        fieldOfView,
        aspectRatio,
        nearPlane,
        farPlane
    );
    
    camera.position.x = 0;
    camera.position.z = 300;
    camera.position.y = 450;
    camera.lookAt(new THREE.Vector3(0, 60, 0));
    
    let renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMap = true;
    
    let container = document.getElementById('world');
    container.appendChild(renderer.domElement);
    
    //createLights(scene);
    createFloor(scene);
    createBox(scene);
    createCreeper(scene);

    
    let controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.minPolarAngle = -Math.PI / 2; 
    controls.maxPolarAngle = Math.PI / 2;
    controls.noZoom = true;
    controls.noPan = true;
    
    let render = () => {
        renderer.render(scene, camera);
    };

    render();

    let t = 0;
    let control = {
        loop: () => {
            render();
            t += 0.05;
            requestAnimationFrame(control.loop);
        }
    };
    return control;
};



let control = main();
control.loop();
