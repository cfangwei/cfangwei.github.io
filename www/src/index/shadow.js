import $ from 'jquery';
import {getCenterPoint, getMintoEdge} from './helper';

const shadowunit = 5,
      shadowarea = 30;

export function startCircleShadow() {
  const $circle = $('#circle'), $circleOutside = $circle.find('.circle--outside'),
        $circleInner = $circle.find('.circle--inner');
  
  $('body').on('mousemove', (event) => {
    const x = event.pageX, y = event.pageY;

    const {centerX, centerY} = getCenterPoint();
    const minToEdge = getMintoEdge();
    
    const dx = x - centerX, dy = y - centerY;
    const dis = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    const dd = (minToEdge - dis) / minToEdge * shadowunit;
    const angle = Math.atan2(dy, dx);
    const unit = shadowunit + dd;
    const tx = unit * Math.cos(angle), ty = unit * Math.sin(angle);
    
    $circleInner.css('box-shadow', `${tx}px ${ty}px ${shadowarea}px #999 inset`);
    $circleOutside.css('box-shadow', `${tx}px ${ty}px ${shadowarea}px #999`);
  });
};
