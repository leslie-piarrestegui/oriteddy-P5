
const params = new URLSearchParams(window.location.search);
const order = params.get('order'); // recupère "order" //

console.log(order);

if (order) {
    const contenuCommande = localStorage[order] ? JSON.parse(localStorage[order]) : null; // Donne à la variable "contenuCommande" la valeur "order du localStorage"
    console.log(contenuCommande);

    if (contenuCommande) {

        /**
         * Modifie le DOM avec les éléments (n° de commande et montant de la commande)
         */
        document.getElementById('contenuCommande').innerHTML = `
            <p>Nous vous remercions pour votre commande</p>
            <p>
                Votre commande n° ${contenuCommande.orderId} d'un montant de ${showPrice(contenuCommande.totalPrice || 0)}
                a bien été prise en compte et sera traitée dans les meilleurs délais.
                Vous recevrez un email de confirmation, vérifiez votre boîte mail. 

                À bientôt sur notre site <a class="text-dark" href="index.html">OriTeddy </a>
            </p>
        `;
    } else {
        redirectHome(); // redirige vers la page d'accueil si erreur //
    }
} else {
    redirectHome(); // redirige vers la page d'accueil si erreur //
}