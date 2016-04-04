'use strict';


export class Box{
    constructor() {
        this.threeGroup = new THREE.Group();
        
        let boxBody = new THREE.Group();

        let faceBufferGeometry = new THREE.PlaneBufferGeometry(100, 100),
            meshBasicMaterial = new THREE.MeshBasicMaterial({color: 0xa0ee76});
        
        let face1 = new THREE.Mesh(faceBufferGeometry, meshBasicMaterial),
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

        var geometry = new THREE.SphereGeometry( 50, 100, 100 );
        var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
        var sphere = new THREE.Mesh( geometry, material );
        sphere.position.z = 40;
        this.threeGroup.add( sphere );
    }

    
}
