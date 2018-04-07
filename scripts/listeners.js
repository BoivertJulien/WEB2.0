

defineGameListeners = function(){
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
    } else if (event.keyCode === 32) {
     me.inputStates.space = true;
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
     me.inputStates.space = false;
    }
    }, false);

    // Mouse event listeners
    canvas.addEventListener('mousemove', function (event) {
      me.inputStates.mousePos = getMousePos(event);
    }, false);
    canvas.addEventListener('mousedown', function (event) {
        var newAtk = {x:me.x,y:me.y};
        var dxUnorm=me.inputStates.mousePos.x - me.x;
        var dyUnorm=me.inputStates.mousePos.y - me.y;
        var vectorNormalize = Math.sqrt((dxUnorm*dxUnorm)+(dyUnorm*dyUnorm));
        newAtk.dx = (dxUnorm/vectorNormalize)*10;
        newAtk.dy = (dyUnorm/vectorNormalize)*10;
        newAtk.size=10;
        me.attacks.push(newAtk);
    }, false);
}


function getMousePos(evt) {
   // necessary to take into account CSS boudaries
   var rect = canvas.getBoundingClientRect();
   return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
   };
 }
