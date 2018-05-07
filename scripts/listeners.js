defineGameListeners = function(){
    window.addEventListener('resize', resizeCanvas, false);

    // Add the listener to the main, window object, and update the states
    window.addEventListener('keydown', function(event){
    if (event.keyCode === 37) {
     me.inputStates.left = true;
    } else if (event.keyCode === 38) {
     me.inputStates.up = true;
    } else if (event.keyCode === 39) {
     me.inputStates.right = true;
    } else if (event.keyCode === 40) {
     me.inputStates.down = true;
    }
    }, false);

    // If the key is released, change the states object
    window.addEventListener('keyup', function(event){
    if (event.keyCode === 37) {
     me.inputStates.left = false;
    } else if (event.keyCode === 38) {
     me.inputStates.up = false;
    } else if (event.keyCode === 39) {
     me.inputStates.right = false;
    } else if (event.keyCode === 40) {
     me.inputStates.down = false;
    } else if (event.keyCode === 32) {
        if (state == 0){
          startAnimation();
        } else { 
          win = undefined;
          stopAnimation();
        }
    }
    }, false);

    // Mouse event listeners
    canvas.addEventListener('mousemove', function (event) {
      me.inputStates.mousePos = getMousePos(event);
    }, false);
    canvas.addEventListener('mousedown', function (event) {
        if (state == 1){
            var newAtk = {x:me.x,y:me.y};
            var dxUnorm=me.inputStates.mousePos.x - me.x;
            var dyUnorm=me.inputStates.mousePos.y - me.y;
            var vectorNormalize = Math.sqrt((dxUnorm*dxUnorm)+(dyUnorm*dyUnorm));
            newAtk.dx = (dxUnorm/vectorNormalize)*22;
            newAtk.dy = (dyUnorm/vectorNormalize)*22;
            newAtk.size=10;
            me.attacks.push(newAtk);

            meShotPlayer.currentTime = 0;
            meShotPlayer.play();
        }
    }, false);
}
function stopAnimation(){
  state = 0; // FLAG: Arretera l'ancienne animation
  Player.pause();
  Player.currentTime = 0;
  introPlayer.play();
  bulletGAIN.gain.value =0;
  me.init();
  badboy.init();
  requestAnimationFrame(menu);
}
function startAnimation(){
            introPlayer.pause();
            introPlayer.currentTime = 0;
            state = 1; // FLAG: Arretera l'ancienne animation
            Player.play();
            requestAnimationFrame(animation);
}

function getMousePos(evt) {
   // necessary to take into account CSS boudaries
   var rect = canvas.getBoundingClientRect();
   return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
   };
 }

function resizeCanvas() {
    var oldW = canvas.width;
    var oldH = canvas.height;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    etoiles=[];
    distanceMax = Math.sqrt((canvas.width*canvas.width)+(canvas.height*canvas.height));
    if(me){me.ajustWhenResize(oldW,oldH);}
    if(badboy){badboy.ajustWhenResize(oldW,oldH);}
}