var gi = [0, 0.24, 0.30,0.46,0.59,0.71,0.88,1];
var gc = ["#f80c12", "#ff9933", "#e0d510", "#69d025","#12bdb9", "#5555ee", "#3311bb", "#f80c12"];
var offset = 0.02;
var grdFloor;

// Clears the canvas content
function clearCanvas() {
   // create a vertical gradient to draw sky
 gradient = ctx.createLinearGradient(0, 0, 0, canvas.height/4);
 gradient.addColorStop(0, 'black');
 gradient.addColorStop(0.80, 'blue');
 gradient.addColorStop(1, 'lightblue');
 ctx.fillStyle = gradient;
 ctx.fillRect(0,0,canvas.width, canvas.height/4)

  gradient = ctx.createLinearGradient(0, 0, canvas.width,0);
    gradient.addColorStop(0, 'black');
    gradient.addColorStop(0.5, '#000033');
    gradient.addColorStop(1, 'black');
    ctx.fillStyle = gradient;
   ctx.fillRect(0,canvas.height/4,canvas.width, canvas.height/4*3)

    /*gradient.addColorStop(0.25, 'pink');
    gradient.addColorStop(0.5, 'magenta');
    gradient.addColorStop(1, 'blue');*/

    ctx.save();

    // set the fill style to a nice gradient
    ctx.fillStyle = grdFloor;
    ctx.beginPath();
    ctx.moveTo(0,canvas.height/4);
    ctx.lineTo(0,canvas.height/3*2);
    ctx.lineTo(canvas.width/2,canvas.height/4);
    ctx.lineTo(canvas.width,canvas.height/3*2);
    ctx.lineTo(canvas.width,canvas.height/4);
    ctx.fill();

    ctx.restore();
}


 function animateGradient() {
    var nbColors = gi.length;

    grdFloor = ctx.createLinearGradient(0,canvas.height/4, 0, canvas.height/4*3);
   for(var i = 0; i < nbColors; i++) {
      gi[i] = (gi[i] + offset) % 1;
      grdFloor.addColorStop(gi[i], gc[i]);
   }
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
