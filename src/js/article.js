let article;

const getTeddy = async () => {
    try {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('article');
        const url = `http://localhost:3000/api/teddies/${id}`;

        article = await discuterAvecLapi(url, "GET", {});
        document.getElementById('img-url').src = article.imageUrl;
        document.getElementById("name").innerHTML = article.name;
        document.getElementById('price').innerHTML = (article.price / 100).toFixed(2) + '€';
        document.getElementById('description').innerHTML = article.description;
        document.getElementById('product-id').value = article._id;
        choixColors(article.colors);
    } catch (err) {
        //afficherErreur()
        console.error(err);
    }
};

const afficherProduit = (article) => {
    var carteArticle = document.createElement("div");
    carteArticle.className = 'card shadow col-md-4 m-3 p-3';

    var nomDeLarticle = createElement("p", article.name, 'text-center m-0');
    carteArticle.appendChild(nomDeLarticle);

    var imageDeLarticle = createArticleImage(article);
    carteArticle.appendChild(imageDeLarticle);

    var descriptionDeLarticle = createElement("p", article.description, 'text-center mt-2');
    carteArticle.appendChild(descriptionDeLarticle);

    choixColors(article.colors);

    var prixDeLarticle = createElement("p", article.price, 'text-center m-0');
    carteArticle.appendChild(prixDeLarticle);

    document.getElementById('carte').appendChild(carteArticle);
}

const choixColors = (color) => {
    const select = document.getElementById('list');

    for (var i = 0; i < color.length; i++) {
        var option = document.createElement("option");
        option.value = color[i];
        option.text = color[i];
        select.appendChild(option);
    };
};



const createArticleImage = (article) => {
    var monImage = document.createElement('img');
    monImage.src = article.imageUrl;
    monImage.style.width = "200px";
    monImage.className = 'm-auto';
    return monImage;
}

document.getElementById("articleForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const quantity = document.getElementById("quantity").value
    const color = document.getElementById("list").value
    const line = {
        name: article.name,
        quantity: +quantity,
        _id: article._id,
        price: article.price,
        color: color
    };
    let exist = false;
    let i = 0;

    while (article && exist === false && i < cart.length) {
        if (cart[i]._id === article._id && cart[i].color === color) {
            cart[i].quantity = cart[i].quantity + +quantity;
            exist = true;
        }

        i++;
    }

    if (exist === false) {
        cart.push(line);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    showCartLength();
    toastr.success('Article ajouter à votre panier!')
})

getTeddy();
