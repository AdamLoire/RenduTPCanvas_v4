import Objet from "./Objet.js";
import Figure from "./Figure.js";

export default class Joueur extends Objet {

    constructor(x, y) {
        super(x, y, 100, 100);
        this.vitesseX = 0;
        this.vitesseY = 0;
        this.angle = 0;
    }

    Affichage(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.translate(-this.width / 2, -this.height / 2);
        //this.drawMonstre(ctx);
        //this.drawFigure(ctx);
        ctx.restore();
        super.AffichageObstacle(ctx);

        // Dessiner la hitbox en bleu
        // ctx.save();
        // ctx.strokeStyle = 'blue';
        // ctx.lineWidth = 2;
        // ctx.strokeRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
        ctx.restore();
    }

    drawJoueur(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.translate(-this.width / 2, -this.height / 2);
        ctx.restore();
    }

    drawFigure(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.translate(-this.width / 2, -this.height / 2);
        ctx.fillStyle = "red";
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.restore();
    }


    // pour régler des problèmes de hitbox, J'ai essayer de regénérer le monstre avec copilot (ça s'est mal passé, abandon et dessin du monstre dans objet)
    drawMonstre(ctx) {
        // Ici on dessine un monstre centré dans la hitbox
        ctx.save();
        ctx.scale(0.3, 0.3);
        ctx.translate(this.width / 2, this.height / 2); // Centrer le dessin du monstre

        // Dessiner le corps du monstre
        ctx.fillStyle = "green";
        ctx.fillRect(-50, -50, 100, 100);

        // Dessiner les bras
        this.drawLeftArm(ctx);
        this.drawRightArm(ctx);

        // Dessiner les mains
        this.drawLeftHand(ctx);
        this.drawRightHand(ctx);

        ctx.restore();
    }

    drawLeftArm(ctx) {
        ctx.save();
        ctx.translate(-75, 0); // Ajuster la position du bras gauche
        ctx.fillStyle = "darkblue";
        ctx.fillRect(0, -50, 25, 100);
        ctx.restore();
    }

    drawRightArm(ctx) {
        ctx.save();
        ctx.translate(50, 0); // Ajuster la position du bras droit
        ctx.fillStyle = "darkblue";
        ctx.fillRect(0, -50, 25, 100);
        ctx.restore();
    }

    drawLeftHand(ctx) {
        ctx.save();
        ctx.translate(-75, 50); // Ajuster la position de la main gauche
        ctx.fillStyle = "beige";
        ctx.fillRect(0, 0, 25, 20);
        ctx.restore();
    }

    drawRightHand(ctx) {
        ctx.save();
        ctx.translate(75, 50); // Ajuster la position de la main droite
        ctx.fillStyle = "beige";
        ctx.fillRect(0, 0, 25, 20);
        ctx.restore();
    }

    vitesse() {
        this.x += this.vitesseX;
        this.y += this.vitesseY;
    } 

    drawCircleImmediat(ctx, x, y, r, color) {
        // BONNE PRATIQUE : on sauvegarde le contexte
        // des qu'une fonction ou un bout de code le modifie
        // couleur, épaisseur du trait, systeme de coordonnées etc.
        ctx.save();
    
        // AUTRE BONNE PRATIQUE : on dessine toujours
        // en 0, 0 !!!! et on utilise les transformations
        // géométriques pour placer le dessin, le tourner, le rescaler
        // etc.
        ctx.fillStyle = color;
        ctx.beginPath();
    
        // on translate le systeme de coordonnées pour placer le cercle
        // en x, y
        ctx.translate(x, y);     
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.fill();
    
        // on restore le contexte à la fin
        ctx.restore();
    }
}