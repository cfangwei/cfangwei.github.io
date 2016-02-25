'use strict';


const ballNumber = 10;
const ballRadius = 10, g = 9.8, mocali = 0.5, collarg = 0.8;

const areaRadius = 300;


let getRandom = (a, b) => {
    return Math.random() * (b - a) + a;
};

let getRandomInt = (a) => {
    return Math.floor(Math.random() * a);
};

class Ball {

    constructor(x, y, r, color, pxpm) {
        this.x = x;
        this.y = y;
        this.oldx = x;
        this.oldy = y;
        this.vx = 0;
        this.vy = 0;
        this.radius = r;
        this.color = color;

        this.pxpm = pxpm;
    }

    move(t, x, y) {
        this.oldx = this.x;
        this.oldy = this.y;


        this.vx += this.vx > 0 ? -mocali * t : mocali * t;
        this.vy = this.vy + g * t;

        this.x += t * this.vx * this.pxpm;
        this.y += t * this.vy * this.pxpm;

        // if (this.y > height - this.radius || this.y < this.radius) {
        //     this.y = this.y < this.radius ? this.radius : (height - this.radius);
        //     this.vy = -this.vy * collarg;
        // }
        // if (this.x > width - this.radius || this.x < this.radius) {
        //     this.x = this.x < this.radius ? this.radius : (width - this.radius);
        //     this.derectionX = !this.derectionX;
        //     this.vx = -this.vx * collarg;
        // }
        let dx = Math.abs(this.x - x),
            dy = Math.abs(this.y - y),
            dis = Math.sqrt(dx * dx + dy * dy);
        
        if( dis >= areaRadius ){
            this.vy = -this.vy * collarg;
            this.vx = -this.vx * collarg;
        }

        
    }
    
}


let collision = (balls) => {
    balls.map((ball1) => {
        balls.map((ball2) => {
            if( ball1 !== ball2 ){
                var rc = Math.sqrt(Math.pow(ball1.x - ball2.x, 2) + Math.pow(ball1.y - ball2.y, 2));
                if (Math.ceil(rc) < (ball1.radius + ball2.radius)) {

                    //获得碰撞后速度的增量
                    let ax = ((ball1.vx - ball2.vx) * Math.pow((ball1.x - ball2.x), 2) +
                              (ball1.vy - ball2.vy) * (ball1.x - ball2.x) * (ball1.y - ball2.y)) / Math.pow(rc, 2);
                    let ay = ((ball1.vy - ball2.vy) * Math.pow((ball1.y - ball2.y), 2) +
                              (ball1.vx - ball2.vx) * (ball1.x - ball2.x) + (ball1.y - ball2.y)) / Math.pow(rc, 2);

                    //给与小球新的速度
                    ball1.vx = (ball1.vx - ax) * collarg;
                    ball1.vy = (ball1.vy - ay) * collarg;
                    ball2.vx = (ball2.vx + ax) * collarg;
                    ball2.vy = (ball2.vy + ay) * collarg;

                    //获取两球斜切位置并且强制扭转
                    let clength = ((ball1.radius + ball2.radius) - rc) / 2;
                    let cx = clength * (ball1.x - ball2.x) / rc;
                    let cy = clength * (ball1.y - ball2.y) / rc;
                    ball1.x = ball1.x + cx;
                    ball1.y = ball1.y + cy;
                    ball2.x = ball2.x - cx;
                    ball2.y = ball2.y - cy;
                }
            }
            
        });
        
    });
};

let start = (ctx, canvas, balls) => {

    let drawBall = (ball) => {
        ctx.save();
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius - 1, 0, Math.PI * 2);
        ctx.fillStyle = ball.color;
        ctx.fill();
        ctx.strokeStyle = '#FFF';
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,.5)';
        ctx.fill();
        ctx.restore();
        ball.moving = false;
    };
    
    let tick = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fillRect(0,0,canvas.width,canvas.height);
	ctx.restore();

	var t = 16/1000;
	collision(balls);

        balls.map((ball) => {
            ball.move(t, canvas.width / 2, canvas.height / 2);
            drawBall(ball);
        });
    };
    
    let animate = () => {
        requestAnimationFrame(animate);
        tick();
    };
    
    animate();

};

let main = () => {
    let canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

   
    let pxpm = canvas.width / 20, balls = [];

    for (let i = 0; i < ballNumber; i++) {
        let x = Math.random() * 2 * areaRadius - areaRadius,
            ylim = Math.sqrt(areaRadius * areaRadius - x * x),
            y = Math.random() * 2 * ylim - ylim;
        
        balls.push(new Ball(
            x + canvas.width / 2,
            y + canvas.height / 2,
            ballRadius,
            `rgba(${getRandomInt(255)}, ${getRandomInt(255)}, ${getRandomInt(255)}, 1)`,
            pxpm
        ));
    }

    start(ctx, canvas, balls);
    
};


window.onload = () => {
    main();
};
