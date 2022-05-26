import * as Utils from "./utils/utils.js";

document.addEventListener("DOMContentLoaded", () => {
    const orderId = document.querySelector("#orderId");
    orderId.innerText = Utils.getUrlId();
});
