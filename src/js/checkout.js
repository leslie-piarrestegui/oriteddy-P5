const form = document.getElementById('userForm');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const address = document.getElementById('address');
const city = document.getElementById('city');

const CreeListePanier = () => {
    cart = localStorage.cart ? JSON.parse(localStorage.cart) : [];
    console.log(cart);
    let innerHTML = '';

    if (cart.length > 0) {
        cart.forEach(article => {
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
            const commande = `commande-${result.orderId}`;
            result.totalPrice = getTotalPrice();
            localStorage.setItem(commande, JSON.stringify(result));
            console.log(localStorage.getItem(commande));
            localStorage.removeItem('cart');
            window.location.href = `confirmation.html?order=${commande}`;

        } catch (err) {
            console.error(err);
        }
    }
});

CreeListePanier();
