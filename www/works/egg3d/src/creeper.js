'use strict';



export class Creeper {
    constructor() {
        this.threeGroup = new THREE.Group();

        this.createHead();

        var CustomSinCurve = THREE.Curve.create(
            function ( scale ) { //custom curve constructor
                this.scale = (scale === undefined) ? 1 : scale;
            },

            function ( t ) { //getPoint: t is between 0-1
                var tx = t * 3 - 1.5,
                ty = Math.sin( 2 * Math.PI * t ),
                tz = 0;

                return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
            }
        );

        var path = new CustomSinCurve( 20 );

        var geometry = new THREE.TubeGeometry(
            path,  //path
            200,    //segments
            20,     //radius
            80,     //radiusSegments
            false  //closed
        );

        let material = new THREE.MeshBasicMaterial( {color: 0x444444} );

        this.threeGroup.add(new THREE.Mesh(geometry, material));
    }

    createHead() {
        let geometry = new THREE.BoxGeometry(50, 50, 50);
        let material = new THREE.MeshBasicMaterial( {color: 0x444444} );
        this.head = new THREE.Mesh(geometry, material);
        this.head.position.z = 100;

        this.threeGroup.add(this.head);
    }
}
