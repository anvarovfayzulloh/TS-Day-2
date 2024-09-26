const productForm = document.querySelector("#productForm");
const productList = document.querySelector("#productList");
const nameInput = productForm.querySelector("#name");
const priceInput = productForm.querySelector("#price");
const typeInput = productForm.querySelector("#type");
const unitInput = productForm.querySelector("#unit");
const dateInput = productForm.querySelector("#date");
const senderInput = productForm.querySelector("#sender");
const searchInput = document.querySelector("#searchInput");
class Product {
    name;
    price;
    type;
    unit;
    date;
    sender;
    constructor(name, price, type, unit, date, sender) {
        this.name = name;
        this.price = price;
        this.type = type;
        this.unit = unit;
        this.date = date;
        this.sender = sender;
    }
}
let products = JSON.parse(localStorage.getItem("products") || "[]");
productForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newProduct = new Product(nameInput.value, priceInput.value, typeInput.value, unitInput.value, dateInput.value, senderInput.value);
    products.push(newProduct);
    localStorage.setItem("products", JSON.stringify(products));
    nameInput.value = "";
    priceInput.value = "";
    typeInput.value = "";
    unitInput.value = "";
    dateInput.value = "";
    senderInput.value = "";
    renderProducts(products);
});
const renderProducts = (productsToRender) => {
    productList.innerHTML = "";
    productsToRender.forEach((product, index) => {
        const li = document.createElement("li");
        li.classList.add("product-card");
        li.innerHTML = `
      <h3>${product.name}</h3>
      <span>Price: $${product.price}</span>
      <p>Type: ${product.type}</p> 
      <p>Unit: ${product.unit}</p>
      <p>Sending Date: ${product.date}</p>
      <p>Sender: ${product.sender}</p>
      <button class="clear-button" data-index="${index}">Clear</button>
    `;
        productList.append(li);
    });
    document.querySelectorAll(".clear-button").forEach((button) => {
        button.addEventListener("click", (e) => {
            const index = parseInt(e.target.getAttribute("data-index") || "0");
            products.splice(index, 1);
            localStorage.setItem("products", JSON.stringify(products));
            renderProducts(products);
        });
    });
};
renderProducts(products);
searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm) ||
        product.type.toLowerCase().includes(searchTerm) ||
        product.sender.toLowerCase().includes(searchTerm));
    renderProducts(filteredProducts);
});
