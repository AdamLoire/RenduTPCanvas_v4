export default class Objet {
    constructor(x, y, width, height, couleur, type, type2, animationDirection) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = type;
        this.type2 = type2;
        this.direction = 1;
        this.animationDirection = animationDirection;
        if(couleur!==undefined) {
            this.couleur = couleur;
        }
    }

    AffichageObstacle(contexte) {
        contexte.save();
        if(!this.IsJoueur) {
            if(this.couleur) {
                contexte.fillStyle = this.couleur;
                
            }
            
            else {
                contexte.strokeStyle = "black";
            }
            contexte.fillRect(this.x, this.y, this.width, this.height);
            
        }
        else if(this.IsJoueur) {
            // contexte.fillStyle = "yellow";
            // contexte.fillRect(this.x, this.y, this.width, this.height);
            // Dessin d'une tête de "creeper" inspiré par un bout de code généré par chatGPT
            const creeperFace = [
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 1, 1, 0, 0, 1, 1, 0],
                [0, 1, 1, 0, 0, 1, 1, 0],
                [0, 0, 0, 1, 1, 0, 0, 0],
                [0, 0, 1, 1, 1, 1, 0, 0],
                [0, 0, 1, 1, 1, 1, 0, 0],
                [0, 0, 1, 0, 0, 1, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0]
              ];
              
              // Chaque "pixel" aura une largeur et une hauteur calculées
              const pixelWidth  = this.width  / 8;
              const pixelHeight = this.height / 8;
              
              // Parcours de la matrice et dessin de chaque carré
              for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                  // Choix de la couleur selon la valeur (1 = noir, 0 = vert)
                  contexte.fillStyle = creeperFace[i][j] === 1 ? "black" : "green";
                  // On dessine chaque petit carré dans le carré global
                  contexte.fillRect(this.x + j * pixelWidth, this.y + i * pixelHeight, pixelWidth, pixelHeight);
                }
              }
            
        }
        contexte.beginPath();
        
        contexte.stroke();
    }

    IsJoueur(ctx) {
        if(this.type === "joueur") {
            return true;
        }
        return false;
    }

    animer(canvas, animation) {
        if(this.type2 == "animer") {
            if(animation =="GaucheDroite") {
                this.x += this.direction *2;
                if(this.x + this.width > canvas.width || this.x < 0) {
                    this.direction *= -1;
                }
            }
            else if(animation == "HautBas") {
                this.y += this.direction * 2;
                if(this.y + this.height > canvas.height || this.y > 0) {
                    this.direction *= -1;
                }
            }
        }
    }
}