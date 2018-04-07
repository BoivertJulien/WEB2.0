window.onload = init;

let audioCtx = window.AudioContext || window.webkitAudioContext;
let canvas, ctx, audioContext, player;
let etoiles = [];
let analyser;
let dataArray, bufferLength;
let gradient;

// main.js
function init() {

    // 1 On recupere un pointeur sur le canvas
    canvas = document.querySelector("#myCanvas");
    player = document.querySelector("#player");

    // 2 On recupere le contexte graphique et audio pour dessiner
    // dans le canvas
    ctx = canvas.getContext("2d");
    audioContext = new audioCtx();
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
    canvas.height = window.innerHeight / 100 * 95;
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
    etoiles.forEach((el, index, object) => {
        el.draw(ctx);
        el.move();
        if ((Math.abs(el.x - (canvas.width / 2)) < 20 && Math.abs(el.y - (canvas.height / 4)) < 20) || (el.x > canvas.width || el.x < 0)) {
            object.splice(index, 1);
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

    var centerX = canvas.width / 2;
    var centerY = canvas.height / 4;
    var angleWidth = Math.PI / bufferLength;
    var rayon = 250;

    for (var i = 0; i < bufferLength; i++) {
        var angle = i * angleWidth;
        // normalize the value, now between 0 and 1
        var v = dataArray[i] / 510;

        // We draw from y=0 to height
        var x = rayon * Math.sin(angle) * v;
        var y = rayon * Math.cos(angle) * v;

        if (i === 0) {
            //ctx.moveTo(centerX, centerY+rayon/2);
        } else {
            ctx.lineTo(centerX + x, centerY + y);
        }
    }

    //ctx.lineTo(centerX, centerY+rayon/2);

    // draw the path at once
    ctx.stroke();

    ctx.strokeStyle = 'lightblue';
    ctx.beginPath();

    for (var i = 0; i < bufferLength; i++) {
        var angle = (i * angleWidth) + Math.PI;
        // normalize the value, now between 0 and 1
        var v = dataArray[i] / 510;

        // We draw from y=0 to height
        var x = rayon * Math.sin(angle) * v;
        var y = rayon * Math.cos(angle) * v;

        if (i === 0) {
            //ctx.moveTo(centerX, centerY+rayon/2);
        } else {
            ctx.lineTo(centerX + x, centerY + y);
        }
    }
    //ctx.lineTo(centerX, centerY+rayon/2);
    // draw the path at once
    ctx.stroke();

    // call again the visualize function at 60 frames/s

}