const form = document.getElementById('userForm');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const address = document.getElementById('address');
const city = document.getElementById('city');

const CreeListePanier = () => {
    cart = localStorage.cart ? JSON.parse(localStorage.cart) : [];
    console.log(cart);
    let totalPrice = 0;

    if (cart.length > 0) {
        cart.forEach(article => {
            const listeArticlePanier = document.createElement("li");
            listeArticlePanier.className = 'list-group-item d-flex flex-column justify-content-between lh-condensed item-cart';

            const div = document.createElement("div");
            div.className = 'nom-article';

            div.appendChild(createElement("h6", article.name, "my-0"));
            listeArticlePanier.appendChild(div);

            const color = createElement("p", article.color);
            listeArticlePanier.appendChild(color);

            const quantite = createElement("p", article.quantity);
            listeArticlePanier.appendChild(quantite);

            listeArticlePanier.appendChild(createElement("span", showPrice(article.price * article.quantity), "text-muted"));
            document.getElementById('panier').prepend(listeArticlePanier);

            totalPrice += (article.price * article.quantity);

        });
    }


    document.getElementById("totalPrice").children[1].innerHTML = showPrice(totalPrice);
    document.getElementById("vignetteNbArticles").innerHTML = getTotalArticles();
};

const updateList = (clearStorage = false) => {
    if (clearStorage) {
        localStorage.clear();
    }

    document.location.reload(true);
};

const isValidForm = () => firstName.checkValidity()
    && lastName.checkValidity()
    && email.checkValidity()
    && address.checkValidity()
    && city.checkValidity();

document.getElementById("supp").addEventListener("click", () => {
    updateList(true);
});

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log("validation de la commande");

    console.log(firstName.checkValidity());
    if (isValidForm()) {
        const body = {
            contact: {
                firstName: firstName.value,
                lastName: lastName.value,
                address: address.value,
                city: city.value,
                email: email.value
            },
            products: cart.map(article => article._id)
        };

        try {
            const result = await discuterAvecLapi(`http://localhost:3000/api/teddies/order`, "POST", body);
            console.log(result);
        } catch (err) {
            console.error(err);
        }
    }
});


            // Récupération de la réponse du serveur à la suite de la requête

            const params = new URLSearchParams(window.location.search);
            const id = params.get('article');
            const url = `http://localhost:3000/api/teddies/order`;

            discuterAvecLapi(url, "GET", {})
            .then(response => response.json()) // response.json nous donnera l'orderId
            .then( (response) => {
            if (form.checkValidity() === false) {   // On vérifie la validité du formulaire, ici s'il est incomplet ou incorrect
                swal("Oups ! Quelque chose ne va pas", "Merci de bien vouloir vérifier le formulaire et réessayer", "error");
            } else if (form.checkValidity() ===true) {  // Ici, le formulaire est validé
                let getOrderId = response.orderId;  // On récupère l'orderId (identifiant de commande)
                let getTotalCost = showPrice(totalPrice).innerHTML; // On récupère le coût total du panier
                localStorage.clear();   // On vide le localStorage
                let orderRecap = { getOrderId, getTotalCost };
                
                // On crée un objet "orderRecap" contenant l'orderId et le prix du panier
                localStorage.setItem("orderIsConfirmed", JSON.stringify(orderRecap));   
                // On crée un nouveau localStorage "orderIsConfirmed" et on lui donne les informations de l'objet orderRecap
                swal("Merci pour votre commande !", "Vous allez être redirigé vers la page de confirmation dans quelques secondes", "success");
                setTimeout(function() {window.location = 'remer.html'; }, 3000);
                // On ajoute une fonction setTimeout pour ajouter un délai de 3 secondes entre l'apparition du message swal
                // Et la redirection de la page vers notre page de confirmation de commande 
            } 
        });

CreeListePanier();
