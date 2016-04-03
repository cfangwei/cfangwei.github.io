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
            face4 = new THREE.Mesh(faceBufferGeometry, meshBasicMaterial);

        face2.rotation.x = Math.PI / 2;
        face3.rotation.y = Math.PI / 2.1;

        face2.position.y = -50;
        face3.position.x = -50;
            
        boxBody.add(face1);
        boxBody.add(face2);
        boxBody.add(face3);
        // boxBody.add(face4);

        

        
        this.threeGroup.add(boxBody);
    }

    
}
