const $ = require('jquery');

let centerX, centerY, minToEdge;

const sin = Math.sin,
      cos = Math.cos;

const shadowunit = 5,
      shadowarea = 30;

import {startCircleShadow} from './index/shadow';


let startRightNavCtrl = () => {
  let hasClick = false,
      $nav = $('.right-side-nav');
  
  $('.right-side-nav--arrow, .right-side-nav--toggle-text').on('click', function(){
    if( !hasClick ){
      hasClick = true;
      $nav.addClass('active');
    } else {
      hasClick = false;
      $nav.removeClass('active');
    }
  });  
};

function canvasStage() {
  const canvas = document.getElementById('canvas-stage');
  const avatorImg = document.getElementById('canvas-stage--meterial-avator');

  canvas.height = canvas.offsetHeight;
  canvas.width = canvas.offsetWidth;

  var ctx = canvas.getContext('2d');
  
  ctx.drawImage(avatorImg, 0, 0, canvas.width, canvas.height);
}

let init = () => {
  startCircleShadow();
  startRightNavCtrl();

  canvasStage();
};

init();
