function playerCollideAttacks(joueur,atks){
  atks.forEach(function(atk){
    if ((Math.abs(joueur.x - atk.x)<(joueur.size+atk.size)) && (Math.abs(joueur.y - atk.y)<(joueur.size+atk.size))) {
      return true;
    }
  });
  return false;
}

function isOutOfScreen(pos){ //approximation pour missiles
  return (pos.x > canvas.width || pos.x < 0 || pos.y > canvas.height || pos.y < 0);
}