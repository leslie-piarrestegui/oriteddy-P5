/**
 * Ce fichier doit être inclu dans toute les page HTML pour évider la duplication du code
 */

let cart = localStorage.cart ? JSON.parse(localStorage.cart) : [];


/**
 * La fonction "showCartLength" permet d'indiquer le nombres d'articles dans la panier
 */
const showCartLength = () => {// récupère l'élément dont l'ID est "nbArticles"
    cart = localStorage.cart ? JSON.parse(localStorage.cart) : [];

    if (indicateurNbArticle) {
        if (cart.length === 0) { // si il n'y a pas d'article dans le panier //
            indicateurNbArticle.classList.add('d-none'); // la class 'd-none' s'ajoute à indicateurNbArticle //
        } else {
            indicateurNbArticle.classList.remove('d-none'); // retire la class 'd-none'
            indicateurNbArticle.innerHTML = getTotalArticles(); // apel la fonction "getTotalArticles" pour ajouter le nombre d'article à "indicateurNbArticle"  
        }
    }
}


/**
 * La fonction "getTotalArticles" permet de savoir le nombre total d'article enregistrer dans le localStorage
 */
const getTotalArticles = () => {
    let total = 0;
    cart = localStorage.cart ? JSON.parse(localStorage.cart) : [];

    for (let i = 0; i < cart.length; i++) {
        total += cart[i].quantity;
    }

    return total;
}

/**
 * La fonction "createElement" permet de crée des élements à l'apel de cette fonction
 */
const createElement = (tag, text, className) => {
    const balise = document.createElement(tag);

    if (className) {
        balise.className = className;
    }

    if (text) {
        balise.innerHTML = text;
    }

    return balise;
}

const showPrice = price => ((price / 100).toFixed(2) + '€'); // permet de retourner un le prix d'un article en euros avec 2 chiffres aprés la virgule //

const discuterAvecLapi = (url, method, body = {}) => {
    /**
     * renvoyer une promise permet d'attendre la fin de l'execution de la requete,
     * de resolve le resultat si tout c'est bien passer
     * ou de reject le code http de la reponse API
     */

     /**
      * Permet de faire une requète à l'API et de la réutiliser dans les autres pages
      */
    return new Promise((resolve, reject) => {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('article');

        const request = new XMLHttpRequest();
        request.open(method, url);
        request.setRequestHeader("Content-Type", "application/json");

        request.onreadystatechange = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status > 199 && this.status < 300) {
                resolve(JSON.parse(this.responseText));
            } else if (this.readyState == XMLHttpRequest.DONE && this.status >= 400) {
                reject(this.status);
            }
        };
        request.send(JSON.stringify(body));
    });
};


/**
 * Permet d'avoir le prix total
 */
const getTotalPrice = () => {

    let totalPrice = 0;

    cart.forEach(article => { // Pour chaque articles du panier //
        totalPrice += (article.price * article.quantity); // Multiplier le prix de l'article par la quantité //
    });

    return totalPrice; // retourner le résultat //
};


/**
 * Permet de faire une redirection vers la page d'accueil 
 */
const redirectHome = () => { 
    window.location.href = 'index.html';
}

showCartLength();