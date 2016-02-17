'use strict';

import * as _ from 'underscore';


const svgns =  'http://www.w3.org/2000/svg';
const xlinkns =  'http://www.w3.org/1999/xlink';


export function createElement (nodeType, attr) {
    var toReturn = document.createElementNS(svgns, nodeType);
    if (attr) {
        setAttributes(toReturn, attr);
    }
    return toReturn;
}

export function createImage (src) {
    let img = createElement('image');
    img.setAttributeNS(xlinkns, 'href', src);
    return img;
}

export function createUse (id) {
    var use = createElement('use');
    use.setAttributeNS(xlinkns, 'href', '#' + id);
    return use;
}

export function setClass (elem, className) {
    if (elem.getAttribute('class') !== className)
        elem.setAttribute('class', className);
}

export function addClass (elem, className) {
    var classString = elem.getAttribute('class');
    if (classString === null) {
        elem.setAttribute('class', className);
    } else if (classString !== className) {
        var classes = classString.split(/ +/);
        if (classes.indexOf(className) == -1) {
            classes.push(className);
            elem.setAttribute('class', classes.join(' '));
        }
    }
    return exports;
}

export function bezierString (x1, y1, cx1, cy1, cx2, cy2, x2, y2) {
    return 'M' + x1.toFixed(10) + ',' + y1.toFixed(10) + ' C' +
        cx1.toFixed(10) + ',' + cy1.toFixed(10) + ' ' + cx2.toFixed(10) + ',' +
        cy2.toFixed(10) + ' ' + x2.toFixed(10) + ' ' + y2.toFixed(10);
}

export function removeClass (elem, className) {
    var classString = elem.getAttribute('class');
    if (classString === null) {
        return;
    } else if (classString === className) {
        elem.setAttribute('class', '');
    } else {
        var classes = classString.split(/ +/);
        var index = classes.indexOf(className);
        if (index != -1) {
            classes.splice(index, 1);
            elem.setAttribute('class', classes.join(' '));
        }
    }
    return this;
}

export function hasClass (elem, className) {
    var classString = elem.getAttribute('class');
    var patt = new RegExp(className);
    return patt.test(classString);
}

export function setAttributes (elem, attributeMap) {
    _.each(attributeMap, function(value, key) {
        elem.setAttribute(key, value);
    });
    _.extend(elem, attributeMap);
    return this;
}

export function setTransform () {
    arguments[0].setAttribute('transform', this.transformString.apply(this, _.toArray(arguments).splice(1)));
}

export function transformString (commands) {
    if (_.isArray(commands)) {
        var s = [];
        _.each(_.toArray(arguments), function(command) {
            s.push(t(command[0], command.slice(1)));
        });
        return s.join(' ');
    } else {
        return t(arguments[0], _.toArray(arguments).slice(1));
    }

    function t(command, params) {
        return command + '(' + params.join(' ') + ')';
    }

}
