// vars for counting frames/s, used by the measureFPS function
var frameCount = 0;
var lastTime;
var fpsContainer;
var fps;

var measureFPS = function(newTime){
   // test for the very first invocation
   if(lastTime === undefined) {
     lastTime = newTime;
     return;
   }
   // calculate the delta between last & current frame
   var diffTime = newTime - lastTime;
   if (diffTime >= 1000) {
     fps = frameCount;
     frameCount = 0;
     lastTime = newTime;
   }
   // and display it in an element we appended to the
   // document in the start() function
   fpsContainer.innerHTML = 'FPS: ' + fps;
   frameCount++;
};
