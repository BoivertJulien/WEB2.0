class Badboy {
    constructor() {
        this.init();
    }
    init(){
        this.x = canvas.width / 2;
        this.y = canvas.height/4;
        this.size = 120;
        this.life = 50;
        this.inputStates={};
        this.attacks = [];
        this.vitesseX = 0; // en pixels par image d'animation
        this.vitesseY = 0; // en pixels par image d'animation
        this.xTarget=0;
        this.yTarget = 0;
        this.moving = false;
    }

    draw(ctx) {
        // Bonne pratique : si on modifie le contexte
        // couleur, epaisseur du trait, repere geometrique etc
        // on sauvegarde au debut de la fonction, on restaure a
        // la fin
        ctx.save();

       gradient = ctx.createRadialGradient(this.x,this.y,0,this.x,this.y,this.size/2);
       gradient.addColorStop(0, 'rgba(0,0,0,1)');
       gradient.addColorStop(0.70, 'rgba(255, 0, 0,0.8)');
       gradient.addColorStop(1, 'rgba(255, 200, 200,0.6)');
       ctx.fillStyle = gradient;          

          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size/2,0, 2 * Math.PI);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(this.x, this.y+this.size/2, this.size/8,0, 2 * Math.PI);
          ctx.fill();

          ctx.fillStyle="red";
          ctx.beginPath();
          ctx.arc(this.x, this.y+this.size/2, this.size/16,0, 2 * Math.PI);
          ctx.fill();

          var angle = Math.atan2((me.y - this.y),(me.x - this.x));
          ctx.fillStyle="white";
          ctx.beginPath();
          //ctx.arc(this.x - this.size, this.y, this.size,2*Math.PI-Math.PI/8,Math.PI); pleure
          ctx.arc(this.x - this.size/3, this.y, this.size/3,Math.PI/8,Math.PI+Math.PI/8);//colere
          ctx.fill();
          ctx.clip();
          ctx.fillStyle="green";
          ctx.beginPath();
          ctx.arc(this.x - this.size/3 + this.size/6*Math.cos(angle), this.y+this.size/4*Math.sin(angle), this.size/12,0, 2 * Math.PI);
          ctx.fill();

          ctx.restore();
          ctx.save();
          ctx.fillStyle="white";
          ctx.beginPath(); 
          //ctx.arc(this.x + this.size, this.y, this.size,0, Math.PI+Math.PI/8); pleure
          ctx.arc(this.x + this.size/3, this.y, this.size/3,2*Math.PI-Math.PI/8,Math.PI-Math.PI/8);//colere
          ctx.fill();
          ctx.clip();
          ctx.fillStyle="green";
          ctx.beginPath();
          ctx.arc(this.x + this.size/3 + this.size/6*Math.cos(angle), this.y+this.size/4*Math.sin(angle), this.size/12,0, 2 * Math.PI);
          ctx.fill();

          ctx.restore();


          this.attacks.forEach(function(item){
            ctx.save();
            //ctx.translate(item.x-25, item.y-25);
            //ctx.fillRect(0,0,50,50);
            ctx.fillStyle="yellow";

            ctx.beginPath();
            ctx.arc(item.x, item.y, 30, 0, 2 * Math.PI);
            ctx.fill();
            ctx.fillStyle = "orange";

            ctx.beginPath();
            ctx.arc(item.x, item.y, 20, 0, 2 * Math.PI);
            ctx.fill();
            ctx.restore();
          });

          ctx.fillStyle = "red";
          for (var i=0;i<this.life;i++){
            drawHeart(10*i+50, 50, 20, 20,"red");
          }
          ctx.fillStyle = "white";
          ctx.font="40px sans-serif";
          ctx.fillText(this.life,30,115);


    }

    update(){
        //move
        if (this.moving == true){
          this.x += this.vitesseX;
          this.y += this.vitesseY;
          if (Math.abs(this.x-this.xTarget)<10 && Math.abs(this.y-this.yTarget)<10){
            this.moving = false;
                var newAtk = {x:this.x,y:this.y};
                var dxUnorm=me.x - this.x;
                var dyUnorm= me.y - this.y;
                var vectorNormalize = Math.sqrt((dxUnorm*dxUnorm)+(dyUnorm*dyUnorm));
                newAtk.dx = (dxUnorm/vectorNormalize)*20;
                newAtk.dy = (dyUnorm/vectorNormalize)*20;
                newAtk.size=10;
                this.attacks.push(newAtk);

                badboyShotPlayer.currentTime = 0;
                badboyShotPlayer.play();
          }
        } else {
            //on definit nouvelle destination
            this.xTarget = Math.floor(Math.random()*(canvas.width-this.size*2))+this.size;
            this.yTarget = Math.floor(Math.random()*(canvas.height/4-this.size*2))+this.size;
            var dxUnorm=this.xTarget - this.x;
            var dyUnorm= this.yTarget - this.y;
            var vectorNormalize = Math.sqrt((dxUnorm*dxUnorm)+(dyUnorm*dyUnorm));
            this.vitesseX = (dxUnorm/vectorNormalize)*8;
            this.vitesseY = (dyUnorm/vectorNormalize)*8;
            this.moving = true;
        }

        var indexCollision = playerCollideAttacks(this,me.attacks);

        if (indexCollision != -1) {
          this.life -= 1;
          delete me.attacks[indexCollision];
          me.attacks.splice(indexCollision,1);

            badboyImpactPlayer.currentTime = 0;
            badboyImpactPlayer.play();
          if (this.life <= 0){
            win = true;
            stopAnimation();
          }
        }


      var toremove = [];
      var i=0;
      this.attacks.forEach(function(item){
        if (isOutOfScreen(item)){
          toremove.push(i);
        } else {i++;}
        item.x += item.dx;
        item.y += item.dy;
        //i++;
      });
      for(i=0;i<toremove.length;i++){
        delete this.attacks[toremove[i]];
        this.attacks.splice(toremove[i],1);
      }

    }

    ajustWhenResize(oldW,oldH){
        console.log("->",this.x)

        this.x = this.x / oldW * canvas.width;
        this.y = this.y / oldH * canvas.height;
        this.attacks.forEach(function(el){
            el.x = el.x /oldW * canvas.width;
            el.y = el.y / oldH * canvas.height;
        });
        this.moving = false;
        console.log("fin->",this.x);
    }
}

