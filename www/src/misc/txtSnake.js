'use strict';

let $ = require('jquery'),
    _ = require('lodash'),
    R = require('ramda');



let getTxt = (dom) => {
    return dom.innerHTML;
};

let isUpper = (char) => {
    return char === char.toUpperCase();
};

let shake = _.curry((txt, i) => {
    let chars = txt.split('');
    let cf = isUpper(chars[i]) ?
        String.prototype.toLowerCase : String.prototype.toUpperCase;
    chars[i] = cf.apply(chars[i]);
    return chars.join('');
});



let setTxt = _.curry((dom, txt) => {
    dom.innerHTML = txt;
});


let txtSnake = (dom, interal) => {
    let txt = getTxt(dom),
        len = txt.length;

    let shakeTxt = shake(txt),
        setDomTxt = setTxt(dom);
    
    let setShake = R.compose(setDomTxt, shakeTxt);
    
    let i = 0;
    let timer = setInterval(() => {
        let ii = (i++) % len;
        setShake(ii);
    }, interal);
    
    return () => {
        if( timer ){
            setDomTxt(txt);
            clearInterval(timer);
        }
    };
};

export {txtSnake};
