'use strict';

let $ = require('jquery');

let _ = require('lodash');

import * as svg from './svg.js';

import {Viewport} from './viewport.js';

let ARROW = require('./svg/arrow.txt');


export class TreeRiver {

    constructor(params) {

        this.params = _.extend(params, {
            width: 350,
            height: 350
        });

        this.params = _.defaults(this.params, {
            normalize: true,
            fullsize: true,
            padding: 100,
            width: 500,
            height: 500,
            minScale: 0.0002,
            id: false,
            silent: false
        });

        console.log(this.params);
    }

    grow() {
        this.drafts = [];
        this.interest = [];

        //this.seedSize = this.params.seedSize;
        
        
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

        // this.id = params.id;
        // this.owner = params.user_name;
        // this.moderated = params.moderated;
        //this.curate = new Curate();
        
        this.viewport = new Viewport(this);

        this.setSize(this.params.width, this.params.height);

        
        /* ===== Add defs ===== */
        this.defs = svg.createElement('path');

        var g = svg.createElement('g');
        g.setAttribute('transform', 'translate( -0.5 -0.5 )');

        var path = svg.createElement('path');
        path.setAttribute('d', ARROW);
        g.setAttribute('id', 'arrow');
        g.appendChild(path);

        this.defs.appendChild(g);
        
        this.svgElement.appendChild(this.defs);


        /* ===== Fruit ===== */

        //this.hoverPlayer = new HoverPlayer(this);

        this.playhead = svg.createElement('rect',{
            width: 12,
            height: 5,
            x: -6,
            y: -2.5,
            rx: 2,
            ry: 2 });
        svg.addClass(this.playhead, 'playhead-pos');

        this.playhead2 = svg.createElement('g');
        svg.addClass(this.playhead2, 'playhead-path');
        

        window.document.body.appendChild(this.domElement);

    }

    setSize(width, height) {

        this.width = width;
        this.height = height;

        this.domElement.style.width = this.width + 'px';
        this.domElement.style.height = this.height + 'px';

        if( this.viewport ){
            
            
        }

        return this;
    }
    
}

 
