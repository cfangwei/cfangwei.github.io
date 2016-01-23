'use strict';

import {isObject, randomFloat, randomInteger} from '../../../src/lib/util';

const Pi = Math.PI,
      angleUnit = Pi / 180,
      d = 60;

let linePaths = {};


class Point {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    static create(x, y) {
        if ( isObject(x) ) {
            return new Point(x.x, x.y);
        }
        return new Point(x, y);
    }
    static add(point, target) {
        return new Point(point.x + target.x, point.y + target.y);
    }
    static subtract(point, target) {
        return new Point(point.x - target.x, point.y - target.y);
    }
    static interpolate(start, end, n) {
        let bx = end.x - start.x,
            by = end.y - start.y;
        return new Point(start.x + bx * n,
                         start.y + by * n);
    }
    add(target) {
        
        return Point.add(this, target);
    }
    subtract(target) {        
        return Point.subtract(this, target);
    }
    length(){
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    set(x = 0, y = 0) {
        this.x = x;
        this.y = y;
        return this;
    }
    offset(x = 0, y = 0) {
        this.x += x;
        this.y += y;
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
        return Point.create(this);
    }
}


class Brance {
    constructor(startX, startY,
                length = 1, angle = -90, speed = 3, depth = 1, generation = 1) {

        
        this._complete = false;
        this._angleOffsetRange = 90;
        
        this._start = new Point(startX, startY);
        this._length = length;
        this._angle = angle;
        this._speed = speed;
        this._depth = depth;
        this._generation = generation;
        this._speed *= 60 / d;

        
        let angleOffset = this._angle * angleUnit;
        
        
        this._end = new Point(this._start.x + this._length * Math.cos(angleOffset),
                              this._start.y + this._length * Math.sin(angleOffset));
        
        this._v = this._end.subtract(this._start); // vector
        this._v.normalize(this._speed);
        this._current = this._start.add(this._v);
        this._latest = this._start.clone();
        this._currentLength = this._speed;
    }
    generation() {
        return this._generation;
    }
    complete() {
        return this._complete;
    }
    // interpolate sub branch
    interpolate(n) {
        return Point.interpolate(this._end, this._start, n);
    }
    createNext(generation) {
        let depth = Math.max(this._depth - 1, 0);
        if ( !depth ) {
            return null;
        }
        let y =[],
            angleOffsetRange = this._angleOffsetRange,
            k = angleOffsetRange / generation;
        for (let i = 0; i < generation; i++) {
            let r = k * i - angleOffsetRange / 2,
                z = r + k;
            y[i] = (randomFloat(r, z)) | 0;
        }
        y.sort(function(a, b){
            return (a > 0 ? a : -a) - (b > 0 ? b : -b);
        });
        let nextBrances = [],
            nextGeneration = this._generation + 1,
            B  = 0.55 / generation;
        for (let i = 0; i < generation; i++) {
            let interpolate = i === 0 ? 0 : randomFloat(B * i, B * (i + 1)),
                interpolatePoint = this.interpolate(interpolate),
                angle = this._angle + y[i],
                nextLenRatio = 0.3 * Math.abs(Math.cos((angle + 90) * angleUnit)),
                length = this._length * randomFloat(0.25 + nextLenRatio,
                                                    0.65 + nextLenRatio);
            
            nextBrances[i] = new Brance(interpolatePoint.x, interpolatePoint.y, length, angle,
                              randomFloat(3, 5), depth, nextGeneration);

        }
        console.log('nextBrances', nextBrances);
        return nextBrances;
    }
    update() {
        let complete = this._complete;
        if (complete) {
            return;
        }
        let current = this._current,
            latest = this._latest;


        
        if ( this._length <= this._currentLength ) {
            console.log('bobobobobobobo');
            current = this._end;
            complete = this._complete = true;
        }
        //let
        console.log(this._depth, 'this._depth');
        let lineWidth = this._depth * this._depth * 0.2,
            l = 'CM' + lineWidth,
            n = linePaths[l];

        if ( !n ) {
            n = linePaths[l] = {
                lineWidth: lineWidth,
                lines: []
            };
        }
        n.lines.push([[latest.x, latest.y],
                      [current.x, current.y]]);
        //console.log(current.x, current.y);
        if (complete) {
            return;
        }
        latest.set(current.x, current.y);
        current.offset(this._v.x, this._v.y);
        this._currentLength += this._speed;
        
    }
}


export default class TreeClass {
    
    constructor(startX, startY, length, angle, color, depth, isDay) {
        this._color = color;
        this._complete = false;
        
        this._isDay = isDay;
        this._brances = [];
        this._changeColor = 90;
        this._brances.push(new Brance(startX, startY, length, angle,
                                      randomFloat(3, 6), depth, 1));
    }

    complete() {
        return this._complete;
    }
    
    draw(context) {
        let brances = this._brances,
            branceLen = brances.length;

        if ( !branceLen ) {
            this._complete = true;
            return;
        }
        
        for (let i = 0; i < branceLen; i++) {
            let brance = brances[i];
            brance.update();

            if ( brance.complete() ) {
                brances.splice(brance, 1);
                i--;
                let generation = brance.generation() < 3 ? randomInteger(3, 4) :
                        randomInteger(2, 4),
                    next = brance.createNext(generation);
                if ( next ) {
                    brances = this._brances = brances.concat(next);
                }
                branceLen = brances.length;
            }

        }

        if (this._isDay === 1) {
            context.strokeStyle = 'hsl(0%, 100%, 0%)';
        } else {
            context.strokeStyle = `hsl("${this._color}", 100%, ${this._changeColor}%)`;
            if (this._changeColor > 50) {
                this._changeColor = this._changeColor - 0.4;
            }
        }
        
        for (let lineKey in linePaths) {
            let line = linePaths[lineKey],
                linePositions = line.lines;
            context.beginPath();
            context.lineWidth = line.lineWidth;
            for (let i = 0, max = linePositions.length; i < max; i++) {
                let linePosition = linePositions[i];
                context.moveTo(linePosition[0][0], linePosition[0][1]);
                context.lineTo(linePosition[1][0], linePosition[1][1]);
            }
            context.stroke();
            delete linePaths[lineKey];
        }
    }
}

