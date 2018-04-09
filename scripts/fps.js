// vars for counting frames/s, used by the measureFPS function
var frameCount = 0;
var lastTime;
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

    ctx.save();
    ctx.font="16px sans-serif";
    if (fps > 59){
      ctx.fillStyle="green";
      ctx.fillText(fps+" FPS :D",10,30);
    } else if (fps > 55) {
      ctx.fillStyle="orange";
      ctx.fillText(fps+" FPS :|",10,30);
    } else {
      ctx.fillStyle="red";
      ctx.fillText(fps+" FPS ;(",10,30);
    }
    ctx.restore();

   frameCount++;
};
