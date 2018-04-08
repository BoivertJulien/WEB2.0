
function drawMe() {
  ctx.save();
  ctx.fillStyle="pink";

  ctx.translate(me.x, me.y);
  ctx.rotate(me.angle);
  ctx.translate(-me.size/2, -me.size/2);
  ctx.strokeRect(0, 0, me.size, me.size);
  ctx.fillRect(me.size/4, me.size/4, me.size/2, me.size/2);

  ctx.restore();
}

function drawBadBoy() {
  ctx.save();
  ctx.fillStyle = "#193467";
  ctx.beginPath();
  ctx.arc(badboy.x, badboy.y, badboy.size*2,0, 2 * Math.PI);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(badboy.x, badboy.y+badboy.size*2, badboy.size/2,0, 2 * Math.PI);
  ctx.fill();
  ctx.fillStyle="lightblue";
  ctx.beginPath();
  ctx.arc(badboy.x, badboy.y+badboy.size*2, badboy.size/3,0, 2 * Math.PI);
  ctx.fill();
  ctx.fillStyle="white";
  ctx.beginPath();
  ctx.arc(badboy.x - badboy.size, badboy.y, badboy.size,0, 2 * Math.PI);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(badboy.x + badboy.size, badboy.y, badboy.size,0, 2 * Math.PI);
  ctx.fill();
  ctx.fillStyle="#990000";

  var angle = Math.atan2((me.y - badboy.y),(me.x - badboy.x));
  ctx.beginPath();
  ctx.arc(badboy.x - badboy.size + badboy.size/2*Math.cos(angle), badboy.y+badboy.size/2*Math.sin(angle), badboy.size/4,0, 2 * Math.PI);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(badboy.x + badboy.size + badboy.size/2*Math.cos(angle), badboy.y+badboy.size/2*Math.sin(angle), badboy.size/4,0, 2 * Math.PI);
  ctx.fill();

  ctx.restore();
}

function drawAttacksOfPerso(player){
  ctx.save();
  ctx.fillStyle="pink"; 
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
