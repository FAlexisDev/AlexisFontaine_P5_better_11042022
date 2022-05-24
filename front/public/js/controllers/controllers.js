export async function getProducts() {
    return await fetch("http://localhost:3000/api/products").then((res) => res.json());
}

export async function getProduct(id) {
    return await fetch(`http://localhost:3000/api/products/${id}`).then((res) => res.json());
}

export async function order(order) {
    fetch(`http://localhost:3000/api/products/${order}`).then((res) => res.json());
}
