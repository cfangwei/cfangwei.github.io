'use strict';

require('./main.scss');


let $ = require('jquery');

import TreeClass from '../../../works/plant-trees/src/tree.js';
import {randomFloat, randomInteger} from '../../../src/lib/util.js';

module.exports = {
    template: require('./template.html'),
    data: function(){
        
    },
    ready: function(){
        let self = this;

        window.addEventListener('load', function(){
            self.setup(self.$el);
        });

        
    },
    methods: {
        setup: function($container){
            let conHeight = $container.clientHeight,
                conWidth = $container.clientWidth;
            
            var offsetTop = $($container).offset().top;
            console.log("offsetTop = ", offsetTop);
            
            
            let canvas = $container.getElementsByTagName('canvas')[0];

            this.context = canvas.getContext('2d');
            
            canvas.height = conHeight;
            canvas.width = conWidth;
            
            this.done = false;
            

            let self = this;


            let $window = $(window),
                drawing = false;
            var listen = function(event){
                if ($window.scrollTop() > offsetTop - conHeight / 4) {
                    if( !drawing ){
                        self.addTree();
                        self.draw();
                        drawing = true;
                    }
                    $window.off('scroll', listen);
                }  
            };
            $window.on('scroll', listen);
            listen();
            
        },

        addTree: function(conWidth, conHeight){
            let self = this;
            let treeN = 15;
            this.trees = new Array(treeN);
            var addTreef = function(){
                if( treeN === 0 ){
                    return;
                }
                
                let x = randomInteger(0, conWidth);
                self.trees.push(TreeClass.generatTree(x, conHeight));
                treeN--;
                setTimeout(addTreef, 2000);
            };
            setTimeout(addTreef, 2000);
            addTreef();
        },

        draw: function(){
            if( this.done ){
                return;
            }
            requestAnimationFrame(this.draw.bind(this));
            this.drawTreeTick();
        },

        checkdone: function(){
            this.done = this.trees.every((tree) => {
                return !tree;
            });
            console.log(this.done);
        },

        drawTreeTick: function(){
            let self = this;
            this.trees.map((tree, i) => {
                if( !tree ){
                    return;
                }
                tree.draw(self.context);
                if( tree.complete() ){
                    self.trees[i] = null;
                    self.checkdone();
                }
            });
        }
    }
};
