export async function getProducts() {
    return await fetch("http://localhost:3000/api/products").then((res) => res.json());
}

export async function getProduct(id) {
    return await fetch(`http://localhost:3000/api/products/${id}`).then((res) => res.json());
}

export async function postOrder(order) {
    return await fetch(`http://localhost:3000/api/products/order`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
        },
        body: JSON.stringify(order),
    }).then((res) => res.json());
}
