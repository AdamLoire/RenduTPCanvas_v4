// import Game from "./Games.js";
import Figure from "./Figure.js";
import Jeu from "./Jeu.js";
// Bonne pratique : avoir une fonction appelée une fois
// que la page est prête, que le DOM est chargé, etc.
window.onload = init;

async function init() {
   // On recupère le canvas
   let canvas = document.querySelector("#myCanvas");

   // On cree une instance du jeu
    // let game = new Game(canvas);
    //let monstre = new Figure(canvas);
    // ici on utilise await car la méthode init est asynchrone
    // typiquement dans init on charge des images, des sons, etc.
    // await game.init();
    // await monstre.init();
    // monstre.start();
    let jeu = new Jeu(canvas);
    await jeu.init();
    jeu.start();
    // on peut démarrer le jeu
    // game.start();
}

