var PivotPoint = {

    baseOffset: 100,

    step: 1,

    angle: 0,

    kx: 200,

    ky: 200,

    init: function (cfg) {
        this.offset = this.baseOffset + cfg.offset;
        this.x = cfg.x;
        this.y = cfg.y;
    },

    getX: function () {
        return this.x;
    },

    getY: function () {
        return this.y;
    },

    update: function () {
        this.x = this.kx * Math.cos(this.angle);
        this.y = this.ky * Math.sin(this.angle);
        this.kx += this.step;

        if (this.x < this.kx / 2) {
            this.x = this.kx / 2;
        }
        if (this.y < -100) {
            this.y = -100;
        }
        this.angle++;
    }
};

export {PivotPoint};
