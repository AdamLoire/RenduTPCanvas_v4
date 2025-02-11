import Joueur from "./Joueur.js";
import Objet from "./Objet.js";
import Block from "./Block.js";
import {rectsOverlap, Collision2Objets, checkCollisionWithCanvasBorders} from "./Collision.js";
import { initListeners } from "./Keybinds.js";

export default class Jeu {

    listObjets = [];
    niveau = [];
    niveauActuel = 0;
    

    constructor(canvas) {
        this.canvas = canvas;
        this.inputStates = {
            mouseX: 0,
            mouseY: 0
        }
    }

    async init(canvas) {
        this.ctx = this.canvas.getContext("2d");
        
        


        let block1 = new Block(200, 0, 50, 450, "red", "obstacle");
        // this.listObjets.push(block1);
        let block2 = new Block(400, 150, 50, 500, "blue", "obstacle");
        // this.listObjets.push(block2);
        let block3 = new Block(700, 500, 100, 100, "green", "fin");
        // thwis.listObjets.push(block3);
        let block4 = new Block(200, 200, 50, 100, "blue", "obstacle", "animer");
        // this.block4.type2 = "animer";
        block4.animationDirection = "GaucheDroite";
        
        let block5 = new Block(200, 200, 50, 100, "blue", "obstacle", "animer");
        
        //Niveau 2 après block 4 est généré par copilot, les niveau 3 à 5 à la main inspiré du niveau 2 (pas d'instanciation d'objet propre comment block1, ...)
        
        this.niveaux = [
            [
                block1,
                block2,
                block3
            ],
            [
                block4,
                { x: 200, y: 80, width: 50, height: 350, couleur: "purple", type: "obstacle"},
                { x: 500, y: 200, width: 50, height: 400, couleur: "orange", type: "obstacle"},
                { x: 700, y: 500, width: 100, height: 100, couleur: "green", type: "fin" }
            ],
            [
                { x: 250, y:300, width:350, height: 50, couleur: "beige", type: "obstacle", type2: "animer", animationDirection: "GaucheDroite"},
                { x: 200, y: 0, width: 50, height: 350, couleur: "purple", type: "obstacle"},
                { x: 500, y: 200, width: 50, height: 400, couleur: "orange", type: "obstacle"},
                { x: 700, y: 500, width: 100, height: 100, couleur: "green", type: "fin" }
            ],
            [
                { x: 250, y:300, width:50, height: 100, couleur: "beige", type: "obstacle", type2: "animer", animationDirection: "HautBas"},
                { x: 0, y: 150, width: 600, height: 50, couleur: "purple", type: "obstacle"},
                { x: 200, y: 350, width: 650, height: 50, couleur: "orange", type: "obstacle"},
                { x: 700, y: 500, width: 100, height: 100, couleur: "green", type: "fin" }
            ],
            [
                { x: 250, y:300, width:50, height: 100, couleur: "beige", type: "obstacle", type2: "animer", animationDirection: "GaucheDroite"},
                { x: 150, y: 0, width: 50, height: 480, couleur: "purple", type: "obstacle"},
                { x: 500, y: 120, width: 50, height: 480, couleur: "blue", type: "obstacle"},
                { x: 200, y: 430, width: 150, height: 50, couleur: "black", type: "obstacle"},
                { x: 350, y: 200, width: 150, height: 50, couleur: "yellow", type: "obstacle", type2: "animer", animationDirection: "HautBas"},
                { x: 350, y: 200, width: 150, height: 50, couleur: "orange", type: "obstacle"},
                { x: 700, y: 500, width: 100, height: 100, couleur: "green", type: "fin" }
            ]

        ];

        this.joueur = new Joueur();
        this.joueur.x = 10;
        this.joueur.y = 10;
        this.joueur.type = "joueur";
        this.listObjets.push(this.joueur);
        // niveauActuel = 0;
        this.chargerNiveau(this.niveauActuel);
        initListeners(this.inputStates, this.canvas);
        console.log("Game initialisé");
        
    }

    start() {
        console.log("Game démarré");

        requestAnimationFrame(this.mainAnimationLoop.bind(this));
    }

    mainAnimationLoop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.AfficheObjets();
        this.update();
        this.animerObjets();
        
        requestAnimationFrame(this.mainAnimationLoop.bind(this));
    }

    AfficheObjets() {
        this.listObjets.forEach(objet => {
            objet.Affichage(this.ctx);
        });
    }

    update() {
        this.mouvementJoueur();
    }

    mouvementJoueur() {
        this.joueur.vitesseX = 0;
        this.joueur.vitesseY = 0;

        if(this.inputStates.ArrowUp || this.inputStates.z) {
            this.joueur.vitesseY = -2;
        }

        if(this.inputStates.ArrowDown || this.inputStates.s) {
            this.joueur.vitesseY = 2;
        }

        if(this.inputStates.ArrowLeft || this.inputStates.q) {
            this.joueur.vitesseX = -2;
        }

        if(this.inputStates.ArrowRight || this.inputStates.d) {
            this.joueur.vitesseX = 2;
        }

        this.joueur.vitesse();
        this.testCollisionsPlayer();
    }

    testCollisionsPlayer() {
        // Teste collision avec les bords du canvas
        this.testCollisionPlayerBordsEcran();

        // Teste collision avec les obstacles
        this.testCollisionPlayerObstacles();

        checkCollisionWithCanvasBorders(this.joueur, this.canvas);
       
    }



    testCollisionPlayerBordsEcran() {
        // Raoppel : le x, y du joueur est en son centre, pas dans le coin en haut à gauche!
        if(this.joueur.x - this.joueur.w/2 < 0) {
            // On stoppe le joueur
            this.joueur.vitesseX = 0;
            // on le remet au point de contaxct
            this.joueur.x = this.joueur.w/2;
            console.log("il sort");
        }
        if(this.joueur.x + this.joueur.w/2 > this.canvas.width) {
            this.joueur.vitesseX = 0;
            // on le remet au point de contact
            this.joueur.x = this.canvas.width - this.joueur.w/2;
        }

        if(this.joueur.y - this.joueur.h/2 < 0) {
            this.joueur.y = this.joueur.h/2;
            this.joueur.vitesseY = 0;

        }
       
        if(this.joueur.y + this.joueur.h/2 > this.canvas.height) {
            this.joueur.vitesseY = 0;
            this.joueur.y = this.canvas.height - this.joueur.h/2;
        }
    }

    testCollisionPlayerObstacles() {
        this.listObjets.forEach(obj => {
            if(obj instanceof Block) {
                if(rectsOverlap(this.joueur.x-this.joueur.w/2, this.joueur.y - this.joueur.h/2, this.joueur.w, this.joueur.h, obj.x, obj.y, obj.w, obj.h)) {
                    // collision

                    // ICI TEST BASIQUE QUI ARRETE LE JOUEUR EN CAS DE COLLIION.
                    // SI ON VOULAIT FAIRE MIEUX, ON POURRAIT PAR EXEMPLE REGARDER OU EST LE JOUEUR
                    // PAR RAPPORT A L'obstacle courant : il est à droite si son x est plus grand que le x de l'obstacle + la largeur de l'obstacle
                    // il est à gauche si son x + sa largeur est plus petit que le x de l'obstacle
                    // etc.
                    // Dans ce cas on pourrait savoir comment le joueur est entré en collision avec l'obstacle et réagir en conséquence
                    // par exemple en le repoussant dans la direction opposée à celle de l'obstacle...
                    // Là par défaut on le renvoie en x=10 y=10 et on l'arrête
                    //console.log("Collision avec obstacle");
                    // this.joueur.x = 100;
                    // this.joueur.y = 100;
                    // this.joueur.vitesseX = 0;
                    // this.joueur.vitesseY = 0;
                }
                if(Collision2Objets(this.joueur, obj)) {
                    if(obj.type == "obstacle") {
                        console.log("Collision avec obstacle", obj.type);
                        this.joueur.x = 10;
                        this.joueur.y = 10;
                    }
                    else {
                        this.checkFinNiveau();
                    }
                }
            }
        });
    }

    checkFinNiveau() {
        this.listObjets.forEach(obj => {
            if(obj.type === "fin" && Collision2Objets(this.joueur, obj)) {
                console.log("Fin du niveau");
                this.niveauActuel++;
                if(this.niveauActuel < this.niveaux.length) {
                    this.chargerNiveau(this.niveauActuel);
                    this.joueur.x = 10;
                    this.joueur.y = 10;
                }
                else {
                    console.log("Fin du jeu");
                    let fin = document.getElementById("fin");
                    fin.style.display = "block";
                }
            }
        });
    }

    // On instancie les objets 
    chargerNiveau(i) {
        this.listObjets =[this.joueur];
        const niveau = this.niveaux[i];
        niveau.forEach(obj => {
            let block = new Block(obj.x, obj.y, obj.width, obj.height, obj.couleur, obj.type, obj.type2, obj.animationDirection);
            this.listObjets.push(block);
        });
    }

    animerObjets() {
        // console.log("Appel animerobjets")
        // console.log(this.listObjets)
        // console.log(this.listObjets[1])
        this.listObjets.forEach(obj => {
            if(obj.type2 == "animer") {
                // console.log("test");
                this.animerObjet(obj);
            }
        })
    }

    animerObjet(obj) {
        if (obj.animationDirection === "GaucheDroite") {
            // Animation de gauche à droite
            obj.x += obj.direction * 2;
            // o,n fait en sorte que ça ne sorte pas du canvas 
            if (obj.x + obj.width > this.canvas.width || obj.x < 0) {
                obj.direction *= -1; 
            }
        } else if (obj.animationDirection === "HautBas") {
            // Animation de haut en bas
            obj.y += obj.direction * 2;
            if (obj.y + obj.height > this.canvas.height || obj.y < 0) {
                obj.direction *= -1; // Inverser la direction
            }
        }
    }

}
