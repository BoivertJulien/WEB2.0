
function drawPerso(player) {
  ctx.save();
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

function drawEnding(text){
  ctx.save();
  ctx.font="40px Verdana";
  ctx.fillStyle="magenta";
  ctx.fillText(text,w/3,h/2);
  ctx.restore();
}

function drawDecompte(number){
  ctx.save();
  ctx.font="75px Verdana";
  // Create gradient
  switch (number){
    case 1:
      ctx.fillStyle="magenta";
      break;
    case 2:
      ctx.fillStyle="blue";
      break;
    case 3:
      ctx.fillStyle="red";
      break;
  }
  ctx.fillText(number,w/2,h/2);
  ctx.restore();
}

drawTease = function(numberOfParticipant){ //J1 is aalways the first participant
  ctx.save();
  ctx.font="40px Verdana";
  // Create gradient
  if(numberOfParticipant === 1){
      ctx.fillStyle="red";
      ctx.fillText("Joueur 1 Pret !",10,h/2);
  } else if (numberOfParticipant === 2){
        ctx.fillStyle="red";
        ctx.fillText("Joueur 1 Pret !",10,h/2);
        ctx.fillStyle="blue";
        ctx.fillText("Joueur 2 Pret !",(w/3)*2,h/2);
  }else{
    ctx.fillStyle="magenta";
    ctx.fillText("Nobody Yet",w/2,h/2);
  }
  ctx.restore();
}


// Clears the canvas content
function clearCanvas() {
   ctx.clearRect(0, 0, w, h);
}
