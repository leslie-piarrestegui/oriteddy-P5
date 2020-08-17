const form = document.getElementById('userForm');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const address = document.getElementById('address');
const city = document.getElementById('city');


/**
 * La fonction "CreeListePanier" permet d'afficher la liste d'articles du panier
 */
const CreeListePanier = () => {
    cart = localStorage.cart ? JSON.parse(localStorage.cart) : [];
    let innerHTML = '';

    if (cart.length > 0) { // si longueur du panier est suppérieur à 0 //
        cart.forEach(article => { // Pour chaque article du panier modifier le DOM avec le nom, la couleur, la quantité...//
            innerHTML += `
                <li class="list-group-item d-flex flex-column justify-content-between lh-condensed item-cart">
                    <div class="nom-article">
                        <h6 class="my-0">${article.name}</h6> 
                    </div>
                    <p class="text-muted">${article.color}</p>
                    <p class="text-muted">${article.quantity}</p>
                    <span class="text-muted">${showPrice(article.price * article.quantity)}</span>
                </li>
            `;
        });
    }

    innerHTML += `
        <li class="list-group-item d-flex justify-content-between">
            <span>Total</span>
            <strong>${showPrice(getTotalPrice())}</strong>
        </li>
    `;


    document.getElementById("panier").innerHTML = innerHTML;
    document.getElementById("vignetteNbArticles").innerHTML = getTotalArticles();
};

/**
 * 
 * La fonction "updateList" permet de vider le localStorage 
 */
const updateList = (clearStorage = false) => {
    if (clearStorage) {
        localStorage.clear();
    }

    document.location.reload(true); // recharger la page //
};

/**
 * La fonction "isValidForm" permet de vérifier la validité du formulaire
 */
const isValidForm = () => firstName.checkValidity()
    && lastName.checkValidity()
    && email.checkValidity()
    && address.checkValidity()
    && city.checkValidity();

/**
 * Au clic sur le bouton de validation du formulaire la fonction "updateList" est appelé
 */
document.getElementById("supp").addEventListener("click", () => {
    updateList(true);
});

/**
 * Cette fonction permet de validé la commande
 */
form.addEventListener('submit', async (event) => {
    event.preventDefault();

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
            const result = await discuterAvecLapi(`http://localhost:3000/api/teddies/order`, "POST", body); // apel de fonction "discuterAvecLapi" avec l'URL de order //
            const commande = `commande-${result.orderId}`; // recupère "orderId" pour la valoidation de la commande //
            result.totalPrice = getTotalPrice();
            localStorage.setItem(commande, JSON.stringify(result)); // ajout au localStorage //
            console.log(localStorage.getItem(commande));
            localStorage.removeItem('cart'); // Va supprimer la ressource avec le nom de clé correspondant du storage (cart).
            window.location.href = `confirmation.html?order=${commande}`; // redirection vers la page "confirmation.html" //

        } catch {
            redirectHome(); // redirige vers la page d'accueil si erreur //
        }
    }
});

CreeListePanier(); // Apel de la fonction "CreeListePanier" //
