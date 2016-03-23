'use strict';






let canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hsla = 'hsla(22.5, 100%, 50%, 1)';

ctx.globalCompositeOperation = 'source-over';
ctx.fillStyle = 'rgb(17, 17, 17)';
ctx.fillRect(0, 0,
                 window.innerWidth,
                 window.innerHeight);
ctx.globalCompositeOperation = 'lighter';

let grd = ctx.createRadialGradient(300, //坐标
                                   300,
                                   0,// 半径
                                   300, // 渐变坐标
                                   300,
                                   300 // 渐变半径
                                  );

grd.addColorStop(0, hsla);
grd.addColorStop(1, 'rgba(0,0,0,0)');

ctx.shadowColor = "white";
ctx.shadowOffsetX = 0; 
ctx.shadowOffsetY = 0; 
ctx.shadowBlur = 7;

ctx.beginPath(); // begin draw
ctx.font = '100px _sans';
ctx.fillStyle = grd;
//ctx.fillStyle = '#777';
ctx.textBaseline = 'top';

ctx.fillText('TIGTER', 300, 300);
ctx.fill(); // 实心
