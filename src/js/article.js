let article;
const params = new URLSearchParams(window.location.search);
const id = params.get('article'); 

/**
 * La fonction getTeddy recupère les ID des articles (avec la fonction "discuterAvecLapi")
 * Modifie le DOM pour y ajouter les renseignement correspondant à l'article choisi
 * ou redirige vers la page d'accueil si erreur (bloc catch)
 */
const getTeddy = async () => {
    try {
        const url = `http://localhost:3000/api/teddies/${id}`;
        article = await discuterAvecLapi(url, "GET", {});
        document.getElementById('img-url').src = article.imageUrl;
        document.getElementById("name").innerHTML = article.name;
        document.getElementById('price').innerHTML = (article.price / 100).toFixed(2) + '€';
        document.getElementById('description').innerHTML = article.description;
        document.getElementById('product-id').value = article._id;
        choixColors(article.colors);
    } catch {
        redirectHome();
    }
};


const choixColors = (color) => {
    const select = document.getElementById('list'); // recupère l'élément qui à comme ID "list" qui sera = select //

    for (var i = 0; i < color.length; i++) {
        var option = document.createElement("option"); //  crée un élement "option" // 
        option.value = color[i]; // ajoute la valeur de color[i] à l'élément option //
        option.text = color[i]; // ajoute le text de color[i] à l'élément option //
        select.appendChild(option); // ajout de l'élément option à select //
    };
};

/**
 * Cette fonction récupère l'élément qui à l'ID "articleForm"
 * Permet d'enregistrer dans le localStorage les articles choisis
 * De rajouter l'article à la quantité déjà existant ou de l'ajouter si nouvelle ajout 
 */
document.getElementById("articleForm") 
    .addEventListener("submit", (event) => { // "submit" = soumettre un formulaire //
        event.preventDefault(); // Son action par défaut ne doit pas être prise en compte comme elle le serait normalement //
        let i = -1;
        let exist = false;
        const quantity = document.getElementById("quantity").value
        const color = document.getElementById("list").value
        const line = {
            name: article.name,
            quantity: +quantity,
            _id: article._id,
            price: article.price,
            color: color
        };

        while (article && exist === false && ++i < cart.length) {
            if (cart[i]._id === article._id && cart[i].color === color) { // Si la couleur et l'id de l'article ajouter sont les mêmes //
                cart[i].quantity = cart[i].quantity + +quantity;          // Augmenter la quantité //
                exist = true;                                             // Exist devient "true" //
            }
        }

        if (exist === false) { // si il n'est pas existant //
            cart.push(line); // l'ajouter //
        }

        localStorage.setItem("cart", JSON.stringify(cart));                   // Enregistrer dans le localStorage //
        showCartLength();                                                     // Apel de la fonction "showCartLength" du fichier globale.js //
        toastr.success(`"${article.name}" à bien été ajouté à votre panier!`) // Affiche la notification d'ajout au panier //
    });

/**
 * cette condition permet de vérifier la présence du paramètre (article) dans la requete.
 * si le parametre est absent l'utilisateur est redirigé vers la page d'accueil
 */
if (id) {
    getTeddy();
} else {
    redirectHome();
}
