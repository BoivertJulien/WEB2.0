// Une classe pour le rectangle
// typiquement dans rectangle.js
class Etoile {
    constructor() {
        var rand = Math.random() * (-Math.PI);

        this.x = (canvas.width / 2) * Math.cos(rand) + canvas.width / 2;
        this.y = (canvas.width / 2) * Math.sin(rand) + canvas.height / 4;

        this.vitesseX = (canvas.width / 2 - this.x); // en pixels par image d'animation
        this.vitesseY = (canvas.height / 4 - this.y); // en pixels par image d'animation
        var len = Math.sqrt(this.vitesseX * this.vitesseX + this.vitesseY * this.vitesseY);
        this.vitesseX /= len / 4;
        this.vitesseY /= len / 4;
    }

    draw(ctx) {
        // Bonne pratique : si on modifie le contexte
        // couleur, epaisseur du trait, repere geometrique etc
        // on sauvegarde au debut de la fonction, on restaure a
        // la fin
        ctx.save();

        ctx.fillStyle = 'white';
        ctx.fillRect(this.x, this.y, 2, 2);

        ctx.restore();
    }

    move() {
        this.x += this.vitesseX;
        this.y += this.vitesseY;
    }
}
