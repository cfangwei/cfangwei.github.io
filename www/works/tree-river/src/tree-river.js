'use strict';

let $ = require('jquery');

class TreeRiver {

    constructor() {
        
    }

    grow() {        
        this.domElement = document.createElement('div');
        this.domElement.setAttribute('class', 'tree-container');

        // Tree displayer itself.
        this.svgElement = svg.createElement('svg');
        this.svgElement.setAttribute('class', 'tree');
        this.domElement.appendChild(this.svgElement);

        // Group that is translated to simulate viewport manipulation.
        // Nodes are appended here.
        this.viewportGroup = svg.createElement('g');
        this.svgElement.appendChild(this.viewportGroup);

        this.id = params.id;
        this.owner = params.user_name;
        this.moderated = params.moderated;
        this.curate = new Curate();



    }
    
}

 
