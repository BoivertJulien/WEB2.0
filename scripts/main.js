window.onload = init;

var audioCtx = window.AudioContext || window.webkitAudioContext;
let canvas, ctx,audioContext,player;
let etoiles = [];
var analyser;
var dataArray, bufferLength;
var gradient;

// main.js
function init() {

  // 1 On recupere un pointeur sur le canvas
  canvas = document.querySelector("#myCanvas");
  player = document.querySelector("#player");

  // 2 On recupere le contexte graphique et audio pour dessiner
  // dans le canvas
  ctx = canvas.getContext("2d");
  audioContext= new audioCtx();
  buildAudioGraph();

  // 3 on dessine pour verifier que ca marche
  //ctx.fillStyle = 'red';
  //ctx.fillRect(10, 10, 100, 100);
  
  window.addEventListener('resize', resizeCanvas, false);
  // Draw canvas border for the first time.
  resizeCanvas();
  // on demarre l'animation
  requestAnimationFrame(animation);

}
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight/100*95;
}

// Une classe pour le rectangle
// typiquement dans rectangle.js
class Etoile {
  constructor() {
    var rand = Math.random()*(-Math.PI);

    this.x = (canvas.width/2) * Math.cos(rand) + canvas.width/2;
    this.y = (canvas.width/2) * Math.sin(rand) + canvas.height/2;
    
    this.vitesseX = (canvas.width/2 - this.x); // en pixels par image d'animation
    this.vitesseY = (canvas.height/4 - this.y); // en pixels par image d'animation
    var len = Math.sqrt(this.vitesseX*this.vitesseX + this.vitesseY*this.vitesseY);
    this.vitesseX /= len/4;
    this.vitesseY /= len/4;
  }
  
  draw(ctx) {
    // Bonne pratique : si on modifie le contexte
    // couleur, epaisseur du trait, repere geometrique etc
    // on sauvegarde au debut de la fonction, on restaure a
    // la fin
    ctx.save();
    
    ctx.fillStyle = 'white';
    ctx.fillRect(this.x, this.y, 2,2);
    
    ctx.restore();
  }
  
  move() {
    this.x += this.vitesseX;
    this.y += this.vitesseY;
    this.vitesseX /= 1.001;
    this.vitesseY /= 1.001;
  }
}

// Boucle d'animation
// typiquement dans game.js
function animation() {
  // 1 on efface
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // 2 on dessine et on deplace
  dessineEtDeplaceLesEtoiles();
  drawVolumeMeter();

  visualize();
  
  var rand = Math.random();
    rect1 = new Etoile();
    etoiles.push(rect1);

  // 4 on rappelle la boucle d'animation 60 fois / s
  requestAnimationFrame(animation);

}

function dessineEtDeplaceLesEtoiles() {
   etoiles.forEach((el,index,object) => {
     el.draw(ctx);
     el.move();
     if ((Math.abs(el.x - (canvas.width/2)) < 20 && Math.abs(el.y - (canvas.height/4)) < 20)||(el.x > canvas.width || el.x < 0)){
        object.splice(index,1);
     }
   })
}

function visualize() {
  // clear the canvas
  // like this: canvasContext.clearRect(0, 0, width, height);

  // Or use rgba fill to give a slight blur effect
  //ctx.fillStyle = 'rgba(0, 0, 0, 0.0)';
  //ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Get the analyser data
  analyser.getByteTimeDomainData(dataArray);

  ctx.lineWidth = 2;
  ctx.strokeStyle = 'pink';

  // all the waveform is in one single path, first let's
  // clear any previous path that could be in the buffer
  ctx.beginPath();
  
  var centerX = canvas.width/2;
  var centerY = canvas.height/4;
  var angleWidth = Math.PI /bufferLength;
  var rayon = 250;

  for(var i = 0; i < bufferLength; i++) {
    var angle = i * angleWidth;
     // normalize the value, now between 0 and 1
     var v = dataArray[i] / 510;
    
     // We draw from y=0 to height
     var x = rayon * Math.sin(angle)*v;
     var y = rayon * Math.cos(angle)*v;

     if(i === 0) {
        //ctx.moveTo(centerX, centerY+rayon/2);
     } else {
        ctx.lineTo(centerX+x, centerY+y);
     }
  }

  //ctx.lineTo(centerX, centerY+rayon/2);
  
  // draw the path at once
  ctx.stroke();  

  ctx.strokeStyle = 'lightblue';
    ctx.beginPath();

  for(var i = 0; i < bufferLength; i++) {
    var angle = (i* angleWidth)+Math.PI;
     // normalize the value, now between 0 and 1
     var v = dataArray[i] / 510;
    
     // We draw from y=0 to height
     var x = rayon * Math.sin(angle)*v;
     var y = rayon * Math.cos(angle)*v;

     if(i === 0) {
        //ctx.moveTo(centerX, centerY+rayon/2);
     } else {
        ctx.lineTo(centerX+x, centerY+y);
     }
  }
  //ctx.lineTo(centerX, centerY+rayon/2);
  // draw the path at once
  ctx.stroke();  
  
  // call again the visualize function at 60 frames/s
  
}

function buildAudioGraph() {
  var mediaElement = document.getElementById('player');
  var sourceNode =   audioContext.createMediaElementSource(mediaElement);
  
  // Create an analyser node
  analyser = audioContext.createAnalyser();
  
  // Try changing for lower values: 512, 256, 128, 64...
  analyser.fftSize = 512;
  bufferLength = analyser.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength);
  
  sourceNode.connect(analyser);
  analyser.connect(audioContext.destination);
}


function drawVolumeMeter() {
    // create a vertical gradient of the height of the canvas
  gradient = ctx.createLinearGradient(0,0, canvas.width,0);
  gradient.addColorStop(0.75,'pink');
  gradient.addColorStop(0.5,'white');
  gradient.addColorStop(0.25,'lightBlue');

  ctx.save();

  // set the fill style to a nice gradient
  ctx.fillStyle=gradient;
  
  analyser.getByteFrequencyData(dataArray);
  var average = getAverageVolume(dataArray);
  ctx.beginPath();
  // draw the center circle meter
  ctx.arc(canvas.width/2, canvas.height/4, 25+(average/4), 0, 2 * Math.PI);
  ctx.fill();

//draw the 2 inversed volume meter
  ctx.beginPath();
  ctx.arc(canvas.width/4, canvas.height/4, 10+((255-average)/8),0,2 * Math.PI, true);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(canvas.width/4*3, canvas.height/4, 10+((255-average)/8),0,2 * Math.PI, true);
  ctx.fill();

  ctx.globalCompositeOperation = 'destination-out';

  ctx.beginPath();
  ctx.arc(canvas.width/4, canvas.height/4, (255-average)/8, 0,2 * Math.PI,true);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(canvas.width/4*3, canvas.height/4, (255-average)/8,0,2 * Math.PI, true);
  ctx.fill();

  ctx.restore();
}


function getAverageVolume(array) {
        var values = 0;
        var average;
 
        var length = array.length;
 
        // get all the frequency amplitudes
        for (var i = 0; i < length; i++) {
            values += array[i];
        }
 
        average = values / length;
        return average;
    }