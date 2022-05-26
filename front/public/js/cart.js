import * as ProductController from "./controllers/controllers.js";
import * as Utils from "./utils/utils.js";

function calculateCartPrice() {
    let totalQuantity = 0;
    let totalPrice = 0;
    const productsInCart = JSON.parse(localStorage.getItem("data")) || [];
    const totalPriceContainer = document.querySelector("#totalPrice");
    const totalQuantityContainer = document.querySelector("#totalQuantity");

    if (productsInCart.length === 0) {
        totalPriceContainer.innerHTML = totalPrice;
        totalQuantityContainer.innerHTML = totalQuantity;
    } else {
        productsInCart.forEach(async (product) => {
            const productPrice = (await ProductController.getProduct(product.id)).price;
            totalPrice += productPrice * Number(product.quantity);
            totalQuantity += Number(product.quantity);
            totalPriceContainer.innerHTML = totalPrice;
            totalQuantityContainer.innerHTML = totalQuantity;
        });
    }
}

(() => {
    const productsInCart = JSON.parse(localStorage.getItem("data")) || [];
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
    calculateCartPrice();
})();

document.addEventListener("change", (e) => {
    if (e.target && e.target.name == "itemQuantity") {
        const productsInCart = JSON.parse(localStorage.getItem("data"));
        const closestParent = e.target.closest(".cart__item");
        const quantityDomContainer = closestParent.querySelector(".cart__item__content__settings__quantity p");

        quantityDomContainer.innerText = `Qté : ${e.target.value}`;
        productsInCart.forEach((product) => {
            if (closestParent.getAttribute("data-id") === product.id && closestParent.getAttribute("data-color") === product.color) {
                product.quantity = e.target.value;
                localStorage.setItem("data", JSON.stringify(productsInCart));
                calculateCartPrice();
            }
        });
    }
});

document.addEventListener("click", (e) => {
    if (e.target.classList == "deleteItem") {
        const productsInCart = JSON.parse(localStorage.getItem("data"));
        const closestParent = e.target.closest(".cart__item");

        closestParent.remove();

        productsInCart.forEach((product) => {
            if (closestParent.getAttribute("data-id") === product.id && closestParent.getAttribute("data-color") === product.color) {
                let productToDelete = productsInCart.indexOf(product);
                productsInCart.splice(productToDelete, 1);
                localStorage.setItem("data", JSON.stringify(productsInCart));
                calculateCartPrice();
            }
        });
    }
});
// Event : Cart form validation
const cartForm = document.querySelector(".cart__order__form");
const regex = {
    lastName: /^\D+$/,
    firstName: /^\D+$/,
    city: /^\D+$/,
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    address: /./,
};

cartForm.addEventListener("input", (e) => {
    Utils.formValidation(regex[e.target.name], e);
});

//Event : Cart form submit
cartForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(cartForm);
    const productsInCart = JSON.parse(localStorage.getItem("data"));

    let contact = {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        address: formData.get("address"),
        city: formData.get("city"),
        email: formData.get("email"),
    };
    let productObject = productsInCart.map((product) => product.id);
    let order = {
        contact: contact,
        products: productObject,
    };

    // Form validation before post order request.
    if (
        regex.lastName.test(formData.get("lastName")) &&
        regex.firstName.test(formData.get("firstName")) &&
        regex.city.test(formData.get("city")) &&
        regex.email.test(formData.get("email")) &&
        regex.address.test(formData.get("address"))
    ) {
        const postOrder = await ProductController.postOrder(order);
        Utils.onSubmit(postOrder.orderId);
    } else {
        alert("Merci de bien vouloir compléter correctement les champs du formulaire.");
    }
});
