export function getUrlId() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    return id;
}
export function getProductData(product) {
    const colorValue = document.querySelector("#colors").value;
    const quantityValue = document.querySelector("#quantity").value;

    let productToAdd = {
        name: product.name,
        imgUrl: product.imageUrl,
        id: product._id,
        color: colorValue,
        quantity: Number(quantityValue),
    };
    return productToAdd;
}

export function buttonStyleAddProduct() {
    const addToCartButton = document.querySelector("#addToCart");
    addToCartButton.style.background = "green";
    addToCartButton.innerText = "Produit ajouté ! ";

    setTimeout(() => {
        addToCartButton.style.background = "#2c3e50";
        addToCartButton.innerText = "Ajouter au panier";
    }, 1000);
}

export function addProductToCart(productToAdd) {
    let cart = JSON.parse(localStorage.getItem("data"));
    let productExist = false;
    if (productToAdd.color === "" || productToAdd.quantity === 0) {
        alert("Merci de bien vouloir choisir la couleur et la quantité de votre choix.");
    } else {
        if (cart) {
            cart.forEach((product) => {
                if (product.id === productToAdd.id && product.color === productToAdd.color) {
                    productExist = true;
                }
            });
        } else {
            cart = [];
        }
        if (productExist) {
            cart.forEach((product) => {
                if (product.id === productToAdd.id && product.color === productToAdd.color) {
                    product.quantity = Number(product.quantity) + Number(productToAdd.quantity);
                    localStorage.setItem("data", JSON.stringify(cart));
                    buttonStyleAddProduct();
                }
            });
        } else {
            cart.push(productToAdd);
            localStorage.setItem("data", JSON.stringify(cart));
            buttonStyleAddProduct();
        }
    }
}

export function formValidation(regexVar, e) {
    let errorMsg = e.target.name + "ErrorMsg";
    if (regexVar.test(e.target.value) === false) {
        document.getElementById(errorMsg).style.color = "#ff6961";
        document.getElementById(errorMsg).innerText = "Le champ saisi est incorrect ou incomplet!";
        e.target.style.border = "3px solid #ff6961";
    } else {
        e.target.style.border = "3px solid #77dd77";
        document.getElementById(errorMsg).innerText = "";
    }
}

export function onSubmit(orderId) {
    localStorage.clear();
    window.location.href = window.location.origin + "/front/confirmation.html?id=" + orderId;
}
