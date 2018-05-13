window.onload = init;

let audioCtx = window.AudioContext || window.webkitAudioContext;
let canvas, ctx, audioContext, introPlayer, Player,bqf,meShotPlayer,badboyShotPlayer,meImpactPlayer,badboyImpactPlayer,bulletOSC,bulletGAIN;
let etoiles = [];
let analyser;
let dataArray, bufferLength;
let gradient;
let state; //0 : paused OR 1 : playing
let distanceMax;
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
    meShotPlayer = new Audio('songs/meShot.mp3');
    meShotPlayer.volume = 0.4;
    badboyShotPlayer = new Audio('songs/badboyShot.mp3');
    badboyShotPlayer.volume = 0.4;


    meImpactPlayer = new Audio('songs/meImpact.mp3');
    badboyImpactPlayer = new Audio('songs/badboyImpact.mp3');

    introPlayer.loop = true;
    introPlayer.play();

    // 2 On recupere le contexte graphique et audio pour dessiner
    // dans le canvas
    ctx = canvas.getContext("2d");
    audioContext = new audioCtx();
    buildAudioGraph();

    // CHARGEMENT DES IMAGES
    COP=document.getElementById("COP");
    SHIP=document.getElementById("SHIP");
    WIN=document.getElementById("WIN");
    LOOSE=document.getElementById("LOOSE");
    meIMG=document.getElementById("ME");
    // Draw canvas border for the first time.
    resizeCanvas();

    me=new Me();
    badboy= new Badboy();

    defineGameListeners();

    // on demarre l'animation
    state = 0;
    setInterval(animateGradient, 50);
    animateGradient();
    requestAnimationFrame(menu);
}


// Boucle d'animation
// typiquement dans game.js
function animation(time) {
    clearCanvas();

    updateAudioEffects();
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
