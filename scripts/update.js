function updateMe(){
  if (me.inputStates.left) {me.x -= 6;}
  if (me.inputStates.right) {me.x += 6;}
  if (me.inputStates.down) {me.y += 6;}
  if (me.inputStates.up) {me.y -= 6;}
  if (me.y >= h-10){me.y = h-10;}
  if (me.y < 10){me.y = 10;}
  if(j1){
    if (me.x >= (w/2)-10){me.x = (w/2)-10;}
    if (me.x < 10){me.x = 10;}
  } else {
    if (me.x >= w){me.x = w;}
    if (me.x < (w/2)+10){me.x = (w/2)+10;}
  }
  var posMouse = me.inputStates.mousePos;
  if (posMouse) {
    var angle = Math.atan2((me.y - posMouse.y),(me.x - posMouse.x));
    me.angle = angle;
  }
  //Chaque joueur determine si lui meurt
  if (playerCollideAttacks(me,adversaire.attacks)) me.dead = true;
}

function playerCollideAttacks(joueur,atks){
  var collide = false;
  atks.forEach(function(atk){
    if ((Math.abs(joueur.x - atk.x)<(joueur.size+atk.size)) && (Math.abs(joueur.y - atk.y)<(joueur.size+atk.size))) {
      collide = true;
    }
  });
  return collide;
}

function updateMyAttacks(){
  var toremove = [];
  var i=0;
  me.attacks.forEach(function(item){
    if (isOutOfScreenAndNeverReFall(item)){
      toremove.push(i);
    }
    item.x += item.dx;
    item.y += item.dy;
    //item.dy += 0.05;   GRAVITE
    i++;
  });
  for(i=0;i<toremove.length;i++){
    me.attacks.splice(toremove[i],1);
  }
}

function isOutOfScreenAndNeverReFall(pos){
  return (pos.x > w || pos.x < 0 || pos.y > h);
}
function isOutOfScreen(pos){
  return (isOutOfScreenAndNeverReFall(pos) || pos.y < 0);
}

function updatePlayers(j1,player){
  if (spectateur){
    if (j1) player1 = player;
    else player2 = player;
  }
  else adversaire = player; // car on est donc a l'index 1 de la liste
}
