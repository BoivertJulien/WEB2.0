// useful to have them as global variables
var canvas, ctx, w, h,spectateur,j1;
var player1,player2,me,adversaire; // me = ref vers le joueur que l'on joue
var inputStates;

var GF = function () {

    var mainLoopSpectateur =function(time){
      measureFPS(time);
      if (player1.dead || player2.dead){
        clearCanvas();
        if (player1.dead) drawEnding("J2");
        else drawEnding("J1");
        setTimeout(function(){
          start();
        },1000);
        return; //interromp le mainloop
      }

      clearCanvas();
      drawPerso(player1);
      drawPerso(player2);
      drawAttacksOfPerso(player1);
      drawAttacksOfPerso(player2);

      requestAnimationFrame(mainLoopSpectateur);
    };

    var mainLoop = function(time){
      measureFPS(time);

      if (me.dead || adversaire.dead){
        socket.emit("imdead",j1,me);
        clearCanvas();
        if (me.dead) drawEnding("I Loose !");
        else drawEnding("I Win !");
        setTimeout(function(){
          start();
        },1000);
        return; //interromp le mainloop
      }
      clearCanvas();

      drawPerso(me);
      drawPerso(adversaire);
      drawAttacksOfPerso(me);
      drawAttacksOfPerso(adversaire);
      updateMe();
      updateMyAttacks();
      sendMyPos();

      requestAnimationFrame(mainLoop);
    };


    var start = function(){
      // FPS
      fpsContainer = document.createElement('div');
      document.getElementById("LeftPanel").appendChild(fpsContainer);
      //CANVAS
      canvas = document.querySelector("#myCanvas");
      w = canvas.width;
      h = canvas.height;
      ctx = canvas.getContext('2d');
      //PLAYER
      me = null;
      adversaire = null;
      joueur1 = null;
      joueur2 = null;

      clearCanvas();
      drawTease(0);
      socket.on('joueur1',function(desc){
          player1 = desc;
          drawTease(1);
      });
      socket.on('joueur2',function(desc){
        player2 = desc;
        clearCanvas();
        drawTease(2);
        //Si on est pas spectateur, on utilise me et adversaire
        spectateur = false;
        if (player1.pseudo===username){
            me = player1; j1=true;
            adversaire = player2;
            player1 = null; player2=null;
        } else if (username === desc.pseudo){
          me = player2;j1=false;
          adversaire = player1;
          player1 = null; player2=null;
        } else {spectateur = true;}
          setTimeout(function(){
            clearCanvas();
            drawDecompte(3);
            setTimeout(function(){
              clearCanvas();
              drawDecompte(2);
              setTimeout(function(){
                clearCanvas();
                drawDecompte(1);
                setTimeout(function(){
                  if (!spectateur){
                      defineGameListeners();
                      requestAnimationFrame(mainLoop);
                  } else {
                      requestAnimationFrame(mainLoopSpectateur);
                }
                },1000);
              },1000);
            },1000);
          },500);
      });
    };

    return {
      start: start
    };
};
