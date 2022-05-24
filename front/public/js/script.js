import * as ProductController from "./controllers/controllers.js";

addEventListener("DOMContentLoaded", async () => {
    const productsArray = await ProductController.getProducts();

    productsArray.forEach((product) => {
        let productsDisplay = document.querySelector("#items");
        let productLink = document.createElement("a");

        productsDisplay.appendChild(productLink);
        productLink.setAttribute("href", `./product.html?id=${product._id}`);

        productLink.innerHTML = ` 
            <article>
            <img src="${product.imageUrl}" alt="${product.altTxt}">
            <h3 class="productName">${product.name}</h3>
            <p class="productDescription">${product.description}</p>
            </article>
        `;
    });
});
