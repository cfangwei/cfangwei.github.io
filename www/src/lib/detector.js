import Modernizr from '../vendor/modernizr';

export function isTouch() {
    return !!('ontouchstart' in window);
};

export function cssHead(){
    return Modernizr.prefixed("transform");
};


