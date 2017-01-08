import $ from 'jquery';

const resizeFns = [];
let centerX, centerY, minToEdge;

const resizewbind = () => {
  centerX = $(window).width() / 2;
  centerY = $(window).height() / 2;
  minToEdge = Math.min(centerX, centerY);
};
$('window').resize(() => {
  registerResizeFn(resizewbind)
});
resizewbind();

export function registerResizeFn(fn) {
  resizeFns.push(fn)
  return function() {
    const index = resizeFns.indexOf(fn);
    resizeFns.splice(index, 1);
  }
}

export function getCenterPoint() {
  return {centerX, centerY};
}

export function getMintoEdge() {
  return minToEdge;
}
