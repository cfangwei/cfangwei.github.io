'use strict';

import * as math from './math.js';

export class Viewport{
    constructor(tree) {
        this.tree = tree;

        this.changed = true;

        this.inflation = 1.2;
    }

    set(x, y, rotation, scale) {
        this.prevScale = this.scale;

        this.changed = true;

        this.scaleIncreased = scale > this.scale;
        this.scale = scale;

        this.rotationChanged = rotation !== this.rotation;
        this.contains = Math.abs(rotation % math.TWO_PI) > this.rotationTolerance
            ? this.containsWhileRotated : this.containsWhileStraight;
        this.rotation = rotation;

        this.x = x;
        this.y = y;

        this.updateWidthAndHeight();

        if (!(this.tree.tweening)) {

            if (this.width >= this.tree.maxX - this.tree.minX) {
                this.x = 0;
            } else {
                this.x = math.clamp(this.x, this.tree.minX + this.width/2, this.tree.maxX - this.width/2);
            }

        }


        if (this.height >= this.tree.maxY - this.tree.minY) {
            this.y = this.tree.restY;
        } else {
            this.y = math.clamp(this.y, this.tree.minY + this.height/2, this.tree.maxY - this.height/2);
        }


        // extremities

        var w = this.width * this.inflation / 2;
        var h = this.height * this.inflation / 2;

        this.x1 = this.x + math.pivotX(-w, -h, this.rotation);
        this.y1 = this.y + math.pivotY(-w, -h, this.rotation);

        this.x3 = this.x + math.pivotX(w, h, this.rotation);
        this.y3 = this.y + math.pivotY(w, h, this.rotation);

        this.x1r = this.x + math.pivotX(this.x1 - this.x, this.y1 - this.y, -this.rotation);
        this.y1r = this.y + math.pivotY(this.x1 - this.x, this.y1 - this.y, -this.rotation);

        this.x3r = this.x + math.pivotX(this.x3 - this.x, this.y3 - this.y, -this.rotation);
        this.y3r = this.y + math.pivotY(this.x3 - this.x, this.y3 - this.y, -this.rotation);

        this.nsr = Math.sin(-this.rotation);
        this.ncr = Math.cos(-this.rotation);

        this.xr = this.x + this.y * this.nsr - this.x * this.ncr;
        this.yr = this.y - this.y * this.ncr - this.x * this.nsr;
    }


    calculateRotatedPosition(obj) {
        obj.x1r = obj.x1 * this.ncr - obj.y1 * this.nsr;
        obj.y1r = obj.x1 * this.nsr + obj.y1 * this.ncr;
        obj.x2r = obj.x2 * this.ncr - obj.y2 * this.nsr;
        obj.y2r = obj.x2 * this.nsr + obj.y2 * this.ncr;
    }

    containsWhileRotated(obj) {
        return this.xr + obj.x1r >= this.x1r &&
            this.xr + obj.x2r <= this.x3r &&
            this.yr + obj.y1r >= this.y1r &&
            this.yr + obj.y2r <= this.y3r;
    }

    containsWhileStraight(obj) {
        return obj.x1 >= this.x1 &&
            obj.x2 <= this.x3 &&
            obj.y1 >= this.y1 &&
            obj.y2 <= this.y3;
    }

    updateWidthAndHeight() {
        this.width = this.tree.width / this.scale;
        this.height = this.tree.height / this.scale;

    }
    
}
