// Clears the canvas content
function clearCanvas() {
   ctx.clearRect(0, 0, canvas.width, canvas.height);
  gradient = ctx.createLinearGradient(0, 0, canvas.width,0);
    gradient.addColorStop(0, 'black');
    gradient.addColorStop(0.5, '#000033');
    gradient.addColorStop(1, 'black');
    ctx.fillStyle = gradient;
   ctx.fillRect(0,0,canvas.width, canvas.height)
      // create a vertical gradient of the height of the canvas
    gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, 'black');
    gradient.addColorStop(0.20, 'blue');
    gradient.addColorStop(0.24, 'lightblue');
    gradient.addColorStop(0.25, 'pink');
    gradient.addColorStop(0.5, 'magenta');
    gradient.addColorStop(1, 'blue');

    ctx.save();
 
    // set the fill style to a nice gradient
    ctx.fillStyle = gradient;

    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(0,canvas.height/3*2);
    ctx.lineTo(canvas.width/2,canvas.height/4);
    ctx.lineTo(canvas.width,canvas.height/3*2);
    ctx.lineTo(canvas.width,0);
    ctx.fill();

    ctx.restore();
}


function drawAnimatedTextMenu(){
        //dessine l'instruction d'ecran d'acceuil
    ctx.save();
    ctx.font="40px sans-serif";
    ctx.fillStyle="white";    
    if(cpt < 16){
        ctx.fillText(txtA,canvas.height/3,canvas.height/3*2);
    } else if (cpt < 32){
        ctx.fillText(txtB,canvas.height/3,canvas.height/3*2);
    }else if (cpt < 48){
        ctx.fillText(txtC,canvas.height/3,canvas.height/3*2);
    }else {
        ctx.fillText(txtD,canvas.height/3,canvas.height/3*2);
    }
    ctx.restore();
}