class Me {
    constructor() {
        this.x = canvas.width / 2;
        this.y = canvas.height/4*3;
        this.size = 75;
        this.life = 100;
        this.inputStates={};
        this.attacks = [];

    }

    draw(ctx) {
      //draw perso
        ctx.save();
        ctx.fillStyle="pink";
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.translate(-this.size/2, -this.size/2);
        ctx.strokeRect(0, 0, this.size, this.size);
        ctx.fillRect(this.size/4, this.size/4, this.size/2, this.size/2);

        ctx.restore();

      //Draw all attacks
        ctx.fillStyle="yellow"; 
        this.attacks.forEach(function(item){
          ctx.save();
          ctx.translate(item.x-8, item.y-8);
          ctx.fillRect(0,0,16,16);
          ctx.restore();
        });
    }

    update(){
        //move
        if (this.inputStates.left) {this.x -= 14;}
        if (this.inputStates.right) {this.x += 14;}
        if (this.inputStates.down) {this.y += 8;}
        if (this.inputStates.up) {this.y -= 8;}
        if (this.y >= canvas.height-this.size/2){this.y = canvas.height-this.size/2;}
        if (this.y < canvas.height/3*2){this.y = canvas.height/3*2;}
        if (this.x >= canvas.width-this.size/2){this.x = canvas.width-this.size/2;}
        if (this.x < this.size/2){this.x = this.size/2;}

        var posMouse = this.inputStates.mousePos;
        if (posMouse) {
          var angle = Math.atan2((this.y - posMouse.y),(this.x - posMouse.x));
          this.angle = angle;
        }

        var indexCollision = playerCollideAttacks(this,badboy.attacks);
        if (indexCollision != -1) {
          this.life -= 1; 
          delete badboy.attacks[indexCollision];
          badboy.attacks.splice(indexCollision,1);
          if (this.life <= 0){}
        }

          var toremove = [];
          var i=0;
          this.attacks.forEach(function(item){
            if (isOutOfScreen(item)){
              toremove.push(i);
            } else {i++;}
            item.x += item.dx;
            item.y += item.dy;
          });
          for(i=0;i<toremove.length;i++){
            delete this.attacks[toremove[i]];
            this.attacks.splice(toremove[i],1);
          }
    }

    ajustWhenResize(oldW,oldH){
      this.x = this.x / oldW * canvas.width;
      this.y = this.y / oldH * canvas.height;
      this.attacks.forEach(function(el){
        el.x = el.x /oldW * canvas.width;
        el.y = el.y / oldH * canvas.height;
      });
    }

}