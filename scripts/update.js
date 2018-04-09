function playerCollideAttacks(joueur,atks){
  var collide = -1;
  atks.every(function(atk,index){
    if ((Math.abs(joueur.x - atk.x)<(joueur.size/2+atk.size/2)) && (Math.abs(joueur.y - atk.y)<(joueur.size/2+atk.size/2))) {
      collide = index;
    }
  });
  return collide;
}

function isOutOfScreen(pos){ //approximation pour missiles
  return (pos.x > canvas.width || pos.x < 0 || pos.y > canvas.height || pos.y < 0);
}