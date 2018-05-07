var gi = [0, 0.24, 0.30,0.46,0.59,0.71,0.88,1];
var gc = ['rgba(248,12,18,1)', "#ff9933", "#e0d510", "#69d025","#12bdb9", "#5555ee", "#3311bb", "#f80c12"];
var offset = 0.02;
var grdFloor;
var win;
var COP,SHIP,WIN,LOOSE; // images

// Clears the canvas content
function clearCanvas() {
   // create a vertical gradient to draw sky
 gradient = ctx.createLinearGradient(0, 0, 0, canvas.height/4);
 gradient.addColorStop(0, 'rgba(0,0,0,0.3)');
 gradient.addColorStop(0.80, 'rgba(0, 0, 255,0.3)');
 gradient.addColorStop(1, 'rgba(173, 216, 230,0.3)');
 ctx.fillStyle = gradient;
 ctx.fillRect(0,0,canvas.width, canvas.height/4);

  gradient = ctx.createLinearGradient(0, 0, canvas.width,0);
    gradient.addColorStop(0, 'rgba(0,0,0,0.8)');
    gradient.addColorStop(0.5, 'rgba(0, 0, 51,0.8)');
    gradient.addColorStop(1, 'rgba(0,0,0,0.8)');
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
        ctx.fillText(txtA,canvas.width/3,canvas.height/8*7);
    } else if (cpt < 32){
        ctx.fillText(txtB,canvas.width/3,canvas.height/8*7);
    }else if (cpt < 48){
        ctx.fillText(txtC,canvas.width/3,canvas.height/8*7);
    }else {
        ctx.fillText(txtD,canvas.width/3,canvas.height/8*7);
    }
    ctx.font="60px sans-serif";  
    ctx.fillStyle="white";
    if (win === undefined){
        ctx.fillText("ALLONS Y",canvas.width/2,canvas.height/4);
            ctx.drawImage(COP,canvas.width/8,canvas.height/8);
    } else if(win){
        ctx.fillText("YOU DO IT",canvas.width/2,canvas.height/4);
            ctx.drawImage(WIN,canvas.width/2,canvas.height/8);  
    }else{
        ctx.fillText("AH L'ECHEC",canvas.width/2,canvas.height/4);
        ctx.drawImage(LOOSE,0,canvas.height/8);  
    }
    ctx.restore();
}


function drawHeart(x, y, width, height,color){
    ctx.save();
    ctx.beginPath();
    var topCurveHeight = height * 0.3;
    ctx.moveTo(x, y + topCurveHeight);
    // top left curve
    ctx.bezierCurveTo(
      x, y, 
      x - width / 2, y, 
      x - width / 2, y + topCurveHeight
    );
            
    // bottom left curve
    ctx.bezierCurveTo(
      x - width / 2, y + (height + topCurveHeight) / 2, 
      x, y + (height + topCurveHeight) / 2, 
      x, y + height
    );
            
    // bottom right curve
    ctx.bezierCurveTo(
      x, y + (height + topCurveHeight) / 2, 
      x + width / 2, y + (height + topCurveHeight) / 2, 
      x + width / 2, y + topCurveHeight
    );
            
    // top right curve
    ctx.bezierCurveTo(
      x + width / 2, y, 
      x, y, 
      x, y + topCurveHeight
    );
           
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
}