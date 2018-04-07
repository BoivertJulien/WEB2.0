
function drawPerso(player) {
  ctx.save();
  ctx.fillStyle="green";

  //ctx.translate(player.x-(player.size/2), player.y-(player.size/2));
  ctx.translate(player.x, player.y);
  ctx.rotate(player.angle);
  ctx.translate(-player.size/2, -player.size/2);
  ctx.strokeRect(0, 0, player.size, player.size);
  ctx.fillRect(player.size/4, player.size/4, player.size/2, player.size/2);

  ctx.restore();
}

function drawAttacksOfPerso(player){
  ctx.save();
  player.attacks.forEach(function(item){
    ctx.translate(item.x-(item.size/2), item.y-(item.size/2));
    ctx.fillRect(0,0,item.size,item.size);
    ctx.restore();
  });
}

// Clears the canvas content
function clearCanvas() {
   ctx.clearRect(0, 0, canvas.width, canvas.height);
      // create a vertical gradient of the height of the canvas
    gradient = ctx.createLinearGradient(0, 0, 0, canvas.height/2);
    gradient.addColorStop(0, 'black');
    gradient.addColorStop(0.40, 'blue');
    gradient.addColorStop(0.48, 'lightblue');
    gradient.addColorStop(0.5, 'pink');
    gradient.addColorStop(1, 'magenta');

    ctx.save();

    // set the fill style to a nice gradient
    ctx.fillStyle = gradient;

    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(0,canvas.height/2);
    ctx.lineTo(canvas.width/2,canvas.height/4);
    ctx.lineTo(canvas.width,canvas.height/2);
    ctx.lineTo(canvas.width,0);
    ctx.fill();


    ctx.restore();
}
