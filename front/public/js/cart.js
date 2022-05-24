import * as ProductController from "./controllers/controllers.js";

async function getNewProduct() {
    let productsInCart = JSON.parse(localStorage.getItem("data"));

    productsInCart.forEach(async (product) => {
        const productPrice = (await ProductController.getProduct(product.id)).price;
        const productInCartContainer = document.getElementById("cart__items");
        const productInCartArticle = document.createElement("article");

        productInCartArticle.setAttribute("class", "cart__item");
        productInCartArticle.setAttribute("data-id", product.id);
        productInCartArticle.setAttribute("data-color", product.color);

        productInCartArticle.innerHTML = ` 
            <div class="cart__item__img">
                <img src="${product.imgUrl}" alt="${product.altTxt}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${product.name}</h2>
                    <p>${product.color}</p>
                    <p>${productPrice} €</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Qté : ${product.quantity}</p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
                    </div>
                        <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
            </div>
      `;

        productInCartContainer.appendChild(productInCartArticle);
    });
}

getNewProduct();
