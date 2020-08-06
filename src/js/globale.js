let cart = localStorage.cart ? JSON.parse(localStorage.cart) : [];

const showCartLength = () => {
    const indicateurNbArticle = document.getElementById('nbArticles');
    cart = localStorage.cart ? JSON.parse(localStorage.cart) : [];
    console.log(cart);

    if (indicateurNbArticle) {
        if (cart.length === 0) {
            indicateurNbArticle.classList.add('d-none');
        } else {
            indicateurNbArticle.classList.remove('d-none');
            indicateurNbArticle.innerHTML = getTotalArticles();
        }
    }
}

const getTotalArticles = () => {
    let total = 0;
    cart = localStorage.cart ? JSON.parse(localStorage.cart) : [];

    for (let i = 0; i < cart.length; i++) {
        total += cart[i].quantity;
    }

    return total;
}

const createElement = (tag, text, className) => {
    var balise = document.createElement(tag);
    balise.className = className;
    var textbalise = document.createTextNode(text);

    balise.appendChild(textbalise);

    return balise;
}

const showPrice = price => ((price / 100).toFixed(2) + '€');

const discuterAvecLapi = (url, method, body = {}) => {
    /**
     * renvoyer une promise permet d'attendre la fin de l'execution de la requete,
     * de resolve le resultat si tout c'est bien passer
     * ou de reject le code http de la reponse API
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

showCartLength();