
const params = new URLSearchParams(window.location.search);
const order = params.get('order');

console.log(order);

if (order) {
    const contenuCommande = localStorage[order] ? JSON.parse(localStorage[order]) : null;
    console.log(contenuCommande);

    if (contenuCommande) {
        // ajouter les infos a la page
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
        redirectHome();
    }
} else {
    redirectHome();
}