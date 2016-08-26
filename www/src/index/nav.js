import $ from 'jquery';

export function startRightNavCtrl() {
  const $nav = $('.right-side-nav');
  let hasClick = false;
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
