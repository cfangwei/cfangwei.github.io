let canvas;

export function startCanvasStage() {
  canvas = document.getElementById('canvas-stage');
  canvas.height = canvas.offsetHeight;
  canvas.width = canvas.offsetWidth;  

  startAvatar();
}

export function startAvatar() {
  const avatorImg = document.getElementById('canvas-stage--meterial-avator');
  const ctx = canvas.getContext('2d');
  ctx.drawImage(avatorImg, 0, 0, canvas.width, canvas.height);
}
