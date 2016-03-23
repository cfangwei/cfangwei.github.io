'use strict';

let stringRandom = (len) => {
    return Math.random().toString(36).substring(len || 8);
};


export {stringRandom};
