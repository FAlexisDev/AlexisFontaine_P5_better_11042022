import * as ProductController from "./controllers/controllers.js";
import * as utils from "./utils/utils.js";

// Display product properties
const productId = utils.getUrlId();
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

// Add color's option
product.colors.forEach((color) => {
    const addColorOption = document.createElement("option");

    addColorOption.setAttribute("value", color);
    addColorOption.innerText = color;

    productColorContainer.appendChild(addColorOption);
});

// Required quantity value between 0 to 100
const quantityValue = document.querySelector("#quantity");
quantityValue.addEventListener("input", (e) => {
    if (e.target.value < 0 || e.target.value > 100) {
        e.target.value = 1;
    }
});

// Event : Add to cart
const addToCartButton = document.querySelector("#addToCart");
addToCartButton.addEventListener("click", () => {
    let productData = utils.getProductData(product);
    utils.addProductToCart(productData);
    addToCartButton.style.background = "green";
    addToCartButton.innerText = "Produit ajouté ! ";

    setTimeout(() => {
        addToCartButton.style.background = "#2c3e50";
        addToCartButton.innerText = "Ajouter au panier";
    }, 1000);
});
