
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
}
