import Objet from "./Objet.js";

export default class Block extends Objet {
    constructor(x, y, width, height, couleur, type, type2, animationDirection) {
        super(x, y, width, height, couleur, type, type2, animationDirection);
    }

    Affichage(contexte) {
        contexte.save();
        contexte.fillStyle = this.couleur;
        contexte.fillRect(this.x, this.y, this.width, this.height);
        contexte.restore();
    }
        
}