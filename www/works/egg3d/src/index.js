'use strict';

import {Box} from './box.js';

let createLights = (scene) => {
    let globalLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.5);
    
    let shadowLight = new THREE.DirectionalLight(0xffffff, 0.9);
    shadowLight.position.set(200, 200, 200);
    shadowLight.castShadow = true;
    shadowLight.shadowDarkness = 0.2;
    shadowLight.shadowMapWidth = shadowLight.shadowMapHeight = 2048;
    
    let backLight = new THREE.DirectionalLight(0xffffff, 0.4);
    backLight.position.set(-100, 100, 100);
    backLight.castShadow = true;
    backLight.shadowDarkness = 0.1;
    backLight.shadowMapWidth = shadowLight.shadowMapHeight = 2048;
    
    scene.add(globalLight);
    scene.add(shadowLight);
    scene.add(backLight);
};

let createFloor = (scene) => {
    let floor = new THREE.Mesh(new THREE.PlaneBufferGeometry(1000,1000),
                               new THREE.MeshBasicMaterial({color: 0xf3c37e}));
    
    floor.rotation.x = - Math.PI / 1.5;
    floor.position.y = 0;
    floor.receiveShadow = true;
    scene.add(floor);
};

let createBox = (scene) => {

    let box = new Box();
    scene.add(box);
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
    camera.position.y = 250;
    camera.lookAt(new THREE.Vector3(0, 60, 0));
    
    let renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMap = true;
    
    let container = document.getElementById('world');
    container.appendChild(renderer.domElement);

    createLights(scene);
    createFloor(scene);

    let render = () => {
        renderer.render(scene, camera);
    };

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
