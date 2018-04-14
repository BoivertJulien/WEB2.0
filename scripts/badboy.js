class Badboy {
    constructor() {
        this.init();
    }
    init(){
        this.x = canvas.width / 2;
        this.y = canvas.height/4;
        this.size = 30;
        this.life = 100;
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

          ctx.fillStyle = "orange";
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size*2,0, 2 * Math.PI);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(this.x, this.y+this.size*2, this.size/2,0, 2 * Math.PI);
          ctx.fill();
          ctx.fillStyle="lightblue";
          ctx.beginPath();
          ctx.arc(this.x, this.y+this.size*2, this.size/3,0, 2 * Math.PI);
          ctx.fill();
          ctx.fillStyle="white";
          ctx.beginPath();
          //ctx.arc(this.x - this.size, this.y, this.size,2*Math.PI-Math.PI/8,Math.PI); pleure
          ctx.arc(this.x - this.size, this.y, this.size,Math.PI/8,Math.PI+Math.PI/8);//colere
          ctx.fill();
          ctx.beginPath();
          //ctx.arc(this.x + this.size, this.y, this.size,0, Math.PI+Math.PI/8); pleure
          ctx.arc(this.x + this.size, this.y, this.size,2*Math.PI-Math.PI/8,Math.PI-Math.PI/8);//colere
          ctx.fill();
          ctx.fillStyle="gray";

          var angle = Math.atan2((me.y - this.y),(me.x - this.x));
          ctx.beginPath();
          ctx.arc(this.x - this.size + this.size/2*Math.cos(angle), this.y+this.size/2*Math.sin(angle), this.size/4,0, 2 * Math.PI);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(this.x + this.size + this.size/2*Math.cos(angle), this.y+this.size/2*Math.sin(angle), this.size/4,0, 2 * Math.PI);
          ctx.fill();

          ctx.restore();


          this.attacks.forEach(function(item){
            ctx.save();
            //ctx.translate(item.x-25, item.y-25);
            //ctx.fillRect(0,0,50,50);
                    ctx.fillStyle="yellow";

            ctx.beginPath();
            ctx.arc(item.x - 20, item.y - 20, 40, 0, 2 * Math.PI);
            ctx.fill();
                    ctx.fillStyle = "orange";

            ctx.beginPath();
            ctx.arc(item.x -15, item.y - 15, 30, 0, 2 * Math.PI);
            ctx.fill();
            ctx.restore();
          });
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

          if (this.life <= 0){ }
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
