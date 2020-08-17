/**
 * Déclaration de la variable "article" par défault vide
 */
let articles = [];

/**
 * le mot cle 'async' dit a la fonction qu'elle est asynchrone.
 * Création de la fonction 'GetArticle' pour récupérer la liste des articles.
 */
const getArticles = async (article) => {

    /**
     * essai d'executer 'discuterAvecLapi', 
     */
    try {
        let html = '';
        /**
         * le mot cle 'await' permet de faire apel à une fonction asyncrone et attendre le resultat.
         * Apel la fonction Globale "discuterAvecLapi" pour recupéreer la liste d'article Teddies
         * * si c'est ok afficher les articles,
         * 
         */
        articles = await discuterAvecLapi(`http://localhost:3000/api/teddies`, "GET");


        /**
         * Pour chaque article dans la liste d'article les elements vont être crée et afficher l'image, 
         * l'ID, et le nom de l'article.
         * 
         * le tout est égale = html.
         */
        articles.forEach(article => {
            html += `
                <div class="col-lg-3 col-md-6 mb-4">
                    <div class="card h-100">
                        <div class="view overlay">
                            <img src="${article.imageUrl}" class="card-img-top">
                            <a href="article.html?article=${article._id}">
                                <div class="mask rgba-white-slight waves-effect waves-light"></div>
                            </a>
                        </div>
                        <div class="card-body text-center">
                            <h5>
                                <strong>
                                    <a href="article.html?article=${article._id}" class="dark-grey-text">
                                        ${article.name}
                                    </a>
                                </strong>
                            </h5>
                        </div>
                    </div>
                </div>
            `;
        })


/**
 * Récupère l'element avec l'ID carte
 * Change le contenu de l'Id 'carte' avec 'html' grace à .innerHtml 
 */
        document.getElementById('carte').innerHTML = html;
/**
 * sinon redirige vers la page d'accueil.
 */
    } catch {
        redirectHome();
    }
};

/**
 * Apel de la fonction 'getArticle' pour afficher les articles sur la page index.
 */
getArticles();
