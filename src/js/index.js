let articles = [];

/**
 * le mot cle 'async' dit a la fonction qu'elle est asynchrone.
 */
const getArticles = async (article) => {

    /**
     * essai d'executer getArticlesFromApi mais attend qu'elle soit terminer avant.
     * si c'est ok fait le et affiche le message dans la console
     * sinon affiche une erreur dans la console.
     */
    try {
        /**
         * le mot cle 'await' permet de faire apel à une fonction asyncrone et attendre le resultat.
         */
        articles = await discuterAvecLapi(`http://localhost:3000/api/teddies`, "GET");

        for (let i = 0; i < articles.length; i++) {
            functionQuiCreeLesCartesArticle(articles[i]);
        };
    } catch (err) {
        console.error(err);
    }
};

const functionQuiCreeLesCartesArticle = (article) => {
    const carteArticle = document.createElement("div");
    carteArticle.className = 'col-lg-3 col-md-6 mb-4';

    const card = document.createElement("div");
    card.className = 'card h-100';

    const imageDeLarticle = createArticleImage(article);
    card.appendChild(imageDeLarticle);

    const cardBody = document.createElement("div");
    cardBody.className = 'card-body text-center';

    const nomDeLarticle = document.createElement("h5");
    const strong = document.createElement('strong');

    const link = document.createElement("a");
    link.href = `article.html?article=${article._id}`;
    link.className = 'dark-grey-text';
    const textNomArticle = document.createTextNode(article.name);
    link.appendChild(textNomArticle);
    strong.appendChild(link);
    nomDeLarticle.appendChild(strong);
    cardBody.appendChild(nomDeLarticle);

    card.appendChild(cardBody);
    carteArticle.appendChild(card);

    document.getElementById('carte').appendChild(carteArticle);
}

const createElements = (tag, text, className) => {
    var balise = document.createElement(tag);
    balise.className = className;
    var textbalise = document.createTextNode(text);

    balise.appendChild(textbalise);

    return balise;
}

const createArticleImage = (article) => {
    const img = document.createElement("div");
    img.className = 'view overlay';

    const monImage = document.createElement('img');
    monImage.src = article.imageUrl;
    monImage.className = 'card-img-top';

    img.appendChild(monImage);

    const link = document.createElement("a");
    link.href = `article.html?article=${article._id}`;

    const mask = document.createElement("div");
    mask.className = 'mask rgba-white-slight waves-effect waves-light';

    link.appendChild(mask);
    img.appendChild(link);

    return img;
}

getArticles();
