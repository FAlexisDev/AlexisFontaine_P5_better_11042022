import * as ProductController from "./controllers/controllers.js";

function getUrlId() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    return id;
}

function getProductData(product) {
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

function addProductToCart(productToAdd) {
    let cart = JSON.parse(localStorage.getItem("data"));
    let productExist = false;

    if (cart) {
        cart.forEach((product) => {
            if (product.id === productToAdd.id && product.color === productToAdd.color) {
                productExist = true;
            }
        });
    } else {
        let cartArray = [];
        cartArray.push(productToAdd);
        localStorage.setItem("data", JSON.stringify(cartArray));
    }
    if (productExist) {
        cart.forEach((product) => {
            if (product.id === productToAdd.id && product.color === productToAdd.color) {
                product.quantity = Number(product.quantity) + Number(productToAdd.quantity);
                localStorage.setItem("data", JSON.stringify(cart));
            }
        });
    } else {
        cart.push(productToAdd);
        localStorage.setItem("data", JSON.stringify(cart));
    }
}
const productId = getUrlId();
const product = await ProductController.getProduct(productId);
const productImgContainer = document.querySelector(".item__img");
const productNameContainer = document.querySelector("#title");
const productPriceContainer = document.querySelector("#price");
const productDescriptionContainer = document.querySelector("#description");
const productColorContainer = document.querySelector("#colors");

productImgContainer.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}"></img>`;
productNameContainer.innerText = product.name;
productPriceContainer.innerText = product.price;
productDescriptionContainer.innerText = product.description;

// Add color options

product.colors.forEach((color) => {
    const addColorOption = document.createElement("option");

    addColorOption.setAttribute("value", color);
    addColorOption.innerText = color;

    productColorContainer.appendChild(addColorOption);
});

// Add to cart
const addToCartButton = document.querySelector("#addToCart");
addToCartButton.addEventListener("click", () => {
    let productData = getProductData(product);
    addProductToCart(productData);
});
