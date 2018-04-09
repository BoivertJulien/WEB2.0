window.onload = init;

let audioCtx = window.AudioContext || window.webkitAudioContext;
let canvas, ctx, audioContext, introPlayer, Player;
let etoiles = [];
let analyser;
let dataArray, bufferLength;
let gradient;
let state; //0 : paused OR 1 : playing
//menu var
let cpt = 0;
let txtA = "$> PRE$S 'SPACE' : |";
let txtB = "$> PRES$ 'SPACE' : /";
let txtC = "$> PRESS '$PACE' : -";
let txtD = "$> PRESS 'SPACE' : \\";

let me;
let badboy;

// main.js
function init() {
    // 1 On recupere un pointeur sur le canvas
    canvas = document.querySelector("#myCanvas");
    Player = new Audio('songs/voodooo.mp3');
    introPlayer = new Audio('songs/intro.mp3');
    introPlayer.loop = true;
    introPlayer.play();

    // 2 On recupere le contexte graphique et audio pour dessiner
    // dans le canvas
    ctx = canvas.getContext("2d");
    audioContext = new audioCtx();
    buildAudioGraph();

    // 3 on dessine pour verifier que ca marche
    //ctx.fillStyle = 'red';
    //ctx.fillRect(10, 10, 100, 100);

    // Draw canvas border for the first time.
    resizeCanvas();
    me=new Me();
    badboy= new Badboy();

    defineGameListeners();

    // on demarre l'animation
    state = 0;
    requestAnimationFrame(menu);
}


// Boucle d'animation
// typiquement dans game.js
function animation(time) {
    clearCanvas();

    dessineEtDeplaceLesEtoiles();
    drawVolumeMeter();
    visualize();
    measureFPS(time);

    me.draw(ctx);
    badboy.draw(ctx);
    me.update();
    badboy.update();

    var rand = Math.random();
    rect1 = new Etoile();
    etoiles.push(rect1);

    // 4 on rappelle la boucle d'animation 60 fois / s
    if (state == 1){
        requestAnimationFrame(animation);
    } else {
        // c'etait la derniere iteration de l'anim , on repasse au menu
        etoiles=[]; 
    }
}

// Boucle d'animation
// typiquement dans game.js
function menu(time) {
    clearCanvas();

    dessineEtDeplaceLesEtoiles();
    drawVolumeMeter();
    visualize();
    measureFPS(time);

    cpt += 1 ;cpt %= 64;
    drawAnimatedTextMenu();

    var rand = Math.random();
    rect1 = new Etoile();
    etoiles.push(rect1);

    // 4 on rappelle la boucle d'animation 60 fois / s
    if (state == 0){
        requestAnimationFrame(menu);
    }else {
        // c'etait la derniere iteration de l'anim , on repasse au menu
        etoiles=[]; 
    }
}


function dessineEtDeplaceLesEtoiles() {
    var toRemove = [];
    var index = 0;
    etoiles.forEach((el) => {
        el.draw(ctx);
        el.move();
        if ((Math.abs(el.x - (canvas.width / 2)) < 20 && Math.abs(el.y - (canvas.height / 4)) < 20) || (el.x > canvas.width || el.x < 0)) {
            toRemove.push(index);
        } else {
            index++;
        }
    });
    for (var i=0; i < toRemove.length; i++){
        delete etoiles[toRemove[i]];
        etoiles.splice(toRemove[i], 1);
    }
}
