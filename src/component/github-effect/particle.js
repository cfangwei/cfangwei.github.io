

var Particle = {

    create: function (cfg) {
        var particle = Object.create(this);
        particle.x = cfg.x;
        particle.y = cfg.y;
        particle.color = cfg.color;
        particle.context = cfg.context;
        particle.finalX = cfg.finalX;
        particle.finalY = cfg.finalY;

        var divider = Math.max(1, parseInt(Math.random() * 40));
        particle.vx = (particle.finalX - particle.x) / divider;
        particle.vy = (particle.finalY - particle.y) / divider;
        return particle;
    },

    update: function () {
        if( this.done ){
            return;
        }

        if (Math.abs(this.x - this.finalX) < 1 && Math.abs(this.y - this.finalY) < 1) {
            this.x = this.finalX;
            this.y = this.finalY;
            this.done = true;
            return;
        }
        this.x += this.vx;
        this.y += this.vy;
    },

    draw: function (offsetX, offsetY) {
        this.context.fillStyle = this.color;
        this.context.fillRect(offsetX + this.x, offsetY + this.y, 1, 1);
    }
};

export {Particle};
