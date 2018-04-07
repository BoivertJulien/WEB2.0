window.onload = init;

let audioCtx = window.AudioContext || window.webkitAudioContext;
let canvas, ctx, audioContext, player;
let etoiles = [];
let analyser;
let dataArray, bufferLength;
let gradient;
let state; //0 : paused OR 1 : playing

let me;
let badboy;

// main.js
function init() {
    // 1 On recupere un pointeur sur le canvas
    canvas = document.querySelector("#myCanvas");
    player = document.querySelector("#player");
    //player.play();

    // 2 On recupere le contexte graphique et audio pour dessiner
    // dans le canvas
    ctx = canvas.getContext("2d");
    audioContext = new audioCtx();
    buildAudioGraph();

    // 3 on dessine pour verifier que ca marche
    //ctx.fillStyle = 'red';
    //ctx.fillRect(10, 10, 100, 100);
    defineGameListeners();

    // Draw canvas border for the first time.
    resizeCanvas();
    me={x:canvas.width/2,y:canvas.height/8*7,size:25,angle:0,dead:false,inputStates:{},attacks:[]};
    badboy= {x:canvas.width/2,y:canvas.height/2,size:25,angle:0,dead:false,inputStates:{},attacks:[]};
    // on demarre l'animation
    state = 0;
    requestAnimationFrame(menu);
}


// Boucle d'animation
// typiquement dans game.js
function animation(time) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    dessineEtDeplaceLesEtoiles();
    drawVolumeMeter();
    visualize();
    measureFPS(time);

    drawPerso(me);
    drawPerso(badboy);
    drawAttacksOfPerso(me);
    drawAttacksOfPerso(badboy);
    updatePlayer(me);
    updatePlayer(badboy);
    updateAttacks(me);
    updateAttacks(badboy);

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
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    dessineEtDeplaceLesEtoiles();
    drawVolumeMeter();
    visualize();
    measureFPS(time);

    //dessine l'instruction d'ecran d'acceuil
    ctx.save();
    ctx.font="30px sans-serif";
    ctx.fillStyle="white";
    ctx.fillText("Press 'Space' to Pause/Re-Start Animation",10,canvas.height/10*9);
    ctx.restore();

    // 4 on rappelle la boucle d'animation 60 fois / s
    if (state == 0){
        requestAnimationFrame(menu);
    }
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
