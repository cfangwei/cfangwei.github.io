'use strict';

class Particle{
    constructor(x, y, canvas) {
        this.endX = x;
        this.endY = y;
        //this.canvas = canvas;
        //this.ctx = this.canvas.getContext('2d');
        this.x = Math.random() * canvas.width;
	this.y = Math.random() * canvas.height;

	this.vx = Math.random() * 10 - 5;
	this.vy = Math.random() * 10 - 5;
    }
    move(mouseX, mouseY) {
        let disX = this.endX - this.x;
	let disY = this.endY - this.y;
	let dis = Math.sqrt(Math.pow(disX, 2) + Math.pow(disY, 2));
	let force = dis * 0.01;
	let angle = Math.atan2(disY, disX); // atan2(x, y) 返回点(x, y)到x 轴的弧度
        
        let mouseF = 0, mouseA = 0;
        if (mouseX > 0 && mouseY > 0) {
            let dis = Math.pow((this.x - mouseX), 2) + Math.pow((this.y - mouseY), 2);
            mouseF = Math.min(5000 / dis, 5000);
            mouseA = Math.atan2(this.y - mouseY, this.x - mouseX);

        } else {
            mouseF = 0;
            mouseA = 0;
        }

	this.vx += force * Math.cos(angle) + mouseF * Math.cos(mouseA);
	this.vy += force * Math.sin(angle) + mouseA * Math.sin(mouseA);

	this.vx *= 0.92;
	this.vy *= 0.92;
        
	//
        this.x += this.vx;
        this.y += this.vy;
    }
    render(ctx) {
        ctx.fillStyle = '#111';
        ctx.fillRect(this.x, this.y, 2, 2);
    }
    update(ctx, mouseX, mouseY) {
        this.move(mouseX, mouseY);
        this.render(ctx);
    }
}

let getCanvasData = (canvas) => {
    let ctx = canvas.getContext('2d'),
        imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    let particles = [];
    for (let x = 0, ii = 0; x < imageData.width; x++) {
        for (let y = 0; y < imageData.height; y++) {
            let i = 4 * (y * imageData.width + x);
            if (imageData.data[i + 3] > 128) {
		ii++;
                (ii % 4 === 0) && particles.push(new Particle(x, y, canvas));
            }
        }
    }
    return particles;
};



let canvas = document.getElementById('canvas'),
ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.font = '200px sans-serif';
ctx.fillText('放為', canvas.width / 2, canvas.height / 2.5);

let particles = getCanvasData(canvas);


let mouseX, mouseY;

canvas.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

let frame = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.map((particle) => {
        particle.update(ctx, mouseX, mouseY);
    });
};

let tick = () => {
    frame();
    requestAnimationFrame(tick);
};

tick();


