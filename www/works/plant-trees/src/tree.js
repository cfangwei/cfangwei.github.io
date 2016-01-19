'use strict';

import {isObject, randomFloat} from '../../../src/lib/util';

let Pi = Math.PI,
    angleUnit = Pi / 180;
var d = 60;


class TreeClass {
    
    constructor(startX, startY, length, angle, color, isDay, depth) {
        this._brances = null;
        this._complete = false;
        
        this._color = color;
        this._isDay = isDay;
        this._brances = [];
        this._changeColor = 90;
        this._brances.push(new Brance(startX, startY, length, angle,
                                      randomFloat(3, 6), depth, 1));
    }
    
    draw() {
        let brances = this._brances,
            branceLen = brances.length;

        if ( !branceLen ) {
            this._complete = true;
            return;
        }

        for (let i = 0; i < branceLen; i++) {
            let brance = brances[i];
            brance.update();
        }

    }
    
};


class Position {
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }
    static create(x, y) {
        if ( isObject(x) ) {
            return new Position(x.x, x.y);
        }
        return new Position(x, y);
    }
    static add(position, target) {
        return new Position(position.x + target.x, position.y + target.y);
    }
    static subtract(position, target) {
        return new Position(position.x - target.x, position.y - target.y);
    }
    static interpolate(position, ) {
        
    }
    add(target) {
        return Position.add(this, target);
    }
    subtract(target) {
        return Position.subtract(this, target);
    }
    length(){
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    set(x, y) {
        this.x = x || 0;
        this.y = y || 0;
        return this;
    }
    offset(x, y) {
        this.x += x || 0;
        this.y += y || 0;
        return this;
    }
    normalize(speed) {
        if ( (speed === null) || (speed === 'undefined') ) {
            speed = 1;
        }
        let length = this.length();
        if ( length > 0 ) {
            this.x = this.x / length * speed;
            this.y = this.y / length * speed;
        }
        return this;
    }
    clone() {
        return Position.create(this);
    }
}


class Brance {
    constructor(startX, startY,
                length = 1, angle = -90, speed = 3, depth = 1, generation) {
        this._complete = false;
        
        this._start = new Position(startX, startY);
        this._length = length || 1;
        this._angle = angle || -90;
        this._speed = speed || 3;
        this._depth = depth || 1;
        this._generation = generation;
        this._speed *= 60 / d;

        let angleOffset = this._angle * angleUnit;
        this._end = new Position(this._start.x + this._length * Math.cos(angleOffset),
                                 this._start.y + this._length * Math.cos(angleOffset));
        this._v = this._end.subtract(this._start); // vector
        this._v.normalize(this._speed);
        this._current = this._start.add(this._v.x, this._v.y);
        this._latest = this.start.clone();
        this._currentLength = this._speed;
    }
    

    generation() {
        return this._generation;
    }
    complete() {
        return this.complete;
    }
    // interpolate sub branch
    interpolate(target) {
        return Position.interpolate(this._end, this._start, target);
    }
    createNext() {
        let o = Math.max(this._depth - 1, 0);
        
    }
    update() {
        let complete = this._complete;
        if (complete) {
            return;
        }
        let current = this._current,
            latest = this._latest;
        if ( this.length <= this._currentLength ) {
            current = this._end;
            complete = this._complete = true;
        }
        
    }
    
};
