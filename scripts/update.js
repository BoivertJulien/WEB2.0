function updatePlayer(joueur){
  if (joueur.inputStates.left) {joueur.x -= 6;}
  if (joueur.inputStates.right) {joueur.x += 6;}
  if (joueur.inputStates.down) {joueur.y += 6;}
  if (joueur.inputStates.up) {joueur.y -= 6;}
  if (joueur.y >= canvas.height-joueur.size/2){joueur.y = canvas.height-joueur.size/2;}
  if (joueur.y < joueur.size/2){joueur.y = 10;}
  if (joueur.x >= canvas.width-joueur.size/2){joueur.x = canvas.width-joueur.size/2;}
  if (joueur.x < joueur.size/2){joueur.x = (canvas.width/2)+joueur.size/2;}

  var posMouse = joueur.inputStates.mousePos;
  if (posMouse) {
    var angle = Math.atan2((joueur.y - posMouse.y),(joueur.x - posMouse.x));
    joueur.angle = angle;
  }
  //Chaque joueur determine si lui meurt
  if (playerCollideAttacks(joueur,badboy.attacks)) joueur.dead = true;
}

function playerCollideAttacks(joueur,atks){
  atks.forEach(function(atk){
    if ((Math.abs(joueur.x - atk.x)<(joueur.size+atk.size)) && (Math.abs(joueur.y - atk.y)<(joueur.size+atk.size))) {
      return true;
    }
  });
  return false;
}

function updateAttacks(joueur){
  var toremove = [];
  var i=0;
  joueur.attacks.forEach(function(item){
    if (isOutOfScreen(item)){
      toremove.push(i);
    }
    item.x += item.dx;
    item.y += item.dy;
    //item.dy += 0.05;   GRAVITE
    i++;
  });
  for(i=0;i<toremove.length;i++){
    joueur.attacks.splice(toremove[i],1);
  }
}

function isOutOfScreen(pos){ //approximation pour missiles
  return (pos.x > canvas.width || pos.x < 0 || pos.y > canvas.height || pos.y < 0);
}
