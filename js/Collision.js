// Collisions between two circles
function circleCollide(x1, y1, r1, x2, y2, r2) {
    var dx = x1 - x2;
    var dy = y1 - y2;
    return ((dx * dx + dy * dy) < (r1 + r2) * (r1 + r2));
}

// Collisions between two rectangles aligned with the axes
function rectsOverlap(x1, y1, w1, h1, x2, y2, w2, h2) {

    if ((x1 > (x2 + w2)) || ((x1 + w1) < x2))
        return false; // No horizontal axis projection overlap
    if ((y1 > (y2 + h2)) || ((y1 + h1) < y2))
        return false; // No vertical axis projection overlap
    return true;    // If previous tests failed, then both axis projections
    // overlap and the rectangles intersect
}

// inspiré de rectsOverLap pour la collision, mais dans le cas de chaque type de collision (chaque côté, que ce soit horizontal ou vertical)
function Collision2Objets(objet1, objet2) {
    if(objet1.x + objet1.width > objet2.x && objet1.x < objet2.x + objet2.width && objet1.y + objet1.height > objet2.y && objet1.y < objet2.y + objet2.height) {
        return true;
    }
    return false;
}

// généré par Copilot pour régler 1. les bordures du canvas et ne pas en sortir (problème avec la hitbox de départ), 2. régler un problème de hitbox (utilisation de offset)
function checkCollisionWithCanvasBorders(objet, canvas) {
    let collision = { top: false, right: false, bottom: false, left: false };

    const offsetTopLeft = -50; // Décalage de 10 pixels pour le haut et la gauche
    const offsetBottomRight = 50; // Décalage de 10 pixels pour le bas et la droite

    if (objet.x - objet.width / 2 < offsetTopLeft) {
        objet.x = objet.width / 2 + offsetTopLeft;
        collision.left = true;
    }

    if (objet.x + objet.width / 2 > canvas.width - offsetBottomRight) {
        objet.x = canvas.width - objet.width / 2 - offsetBottomRight;
        collision.right = true;
    }

    if (objet.y - objet.height / 2 < offsetTopLeft) {
        objet.y = objet.height / 2 + offsetTopLeft;
        collision.top = true;
    }

    if (objet.y + objet.height / 2 > canvas.height - offsetBottomRight) {
        objet.y = canvas.height - objet.height / 2 - offsetBottomRight;
        collision.bottom = true;
    }

    return collision;
}


// Collisions between rectangle and circle
function circRectsOverlap(x0, y0, w0, h0, cx, cy, r) {
    var testX = cx;
    var testY = cy;
    if (testX < x0) testX = x0;
    if (testX > (x0 + w0)) testX = (x0 + w0);
    if (testY < y0) testY = y0;
    if (testY > (y0 + h0)) testY = (y0 + h0);
    return (((cx - testX) * (cx - testX) + (cy - testY) * (cy - testY)) < r * r);
}

export { circleCollide, rectsOverlap, circRectsOverlap, Collision2Objets, checkCollisionWithCanvasBorders };