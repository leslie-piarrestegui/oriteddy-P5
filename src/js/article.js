let article;
const params = new URLSearchParams(window.location.search);
const id = params.get('article');

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
    const select = document.getElementById('list');

    for (var i = 0; i < color.length; i++) {
        var option = document.createElement("option");
        option.value = color[i];
        option.text = color[i];
        select.appendChild(option);
    };
};

document.getElementById("articleForm")
    .addEventListener("submit", (event) => {
        event.preventDefault();
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
            if (cart[i]._id === article._id && cart[i].color === color) {
                cart[i].quantity = cart[i].quantity + +quantity;
                exist = true;
            }
        }

        if (exist === false) {
            cart.push(line);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        showCartLength();
        toastr.success(`"${article.name}" à bien été ajouté à votre panier!`)
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
