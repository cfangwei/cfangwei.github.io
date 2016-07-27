'use strict';

let $ = require('jquery');

let centerX, centerY, minToEdge;

let sin = Math.sin,
    cos = Math.cos;

const shadowunit = 5,
      shadowarea = 30;

let bindWindowResize = () => {
  let resizewbind = () => {
    centerX = $(window).width() / 2;
    centerY = $(window).height() / 2;
    minToEdge = Math.min(centerX, centerY);
  };
  
  
  $('window').resize(resizewbind);
  resizewbind();
  
};


let startCircleShadow = () => {
  let $circle = $('#circle'),
      $circleOutside = $circle.find('.circle--outside'),
      $circleInner = $circle.find('.circle--inner');
  
  $('body').on('mousemove', (event) => {
    let x = event.pageX, 
        y = event.pageY;

    let dx = x - centerX,
        dy = y - centerY;

    let dis = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

    let dd = (minToEdge - dis) / minToEdge * shadowunit;

    let angle = Math.atan2(dy, dx);

    let unit = shadowunit + dd;
    
    let tx = unit * cos(angle),
        ty = unit * sin(angle);
    
    $circleInner.css('box-shadow', `${tx}px ${ty}px ${shadowarea}px #999 inset`);
    $circleOutside.css('box-shadow', `${tx}px ${ty}px ${shadowarea}px #999`);
  });
};

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

let init = () => {
  bindWindowResize();
  startCircleShadow();
  startRightNavCtrl();
};

init();
