const productForm = document.querySelector("#productForm") as HTMLFormElement;
const productList = document.querySelector("#productList") as HTMLUListElement;
const nameInput = productForm.querySelector("#name") as HTMLInputElement;
const priceInput = productForm.querySelector("#price") as HTMLInputElement;
const typeInput = productForm.querySelector("#type") as HTMLInputElement;
const unitInput = productForm.querySelector("#unit") as HTMLInputElement;
const dateInput = productForm.querySelector("#date") as HTMLInputElement;
const senderInput = productForm.querySelector("#sender") as HTMLInputElement;
const searchInput = document.querySelector("#searchInput") as HTMLInputElement;

class Product {
  name: string;
  price: string;
  type: string;
  unit: string;
  date: string;
  sender: string;

  constructor(name: string, price: string, type: string, unit: string, date: string, sender: string) {
    this.name = name;
    this.price = price;
    this.type = type;
    this.unit = unit;
    this.date = date;
    this.sender = sender;
  }
}

let products: Product[] = JSON.parse(localStorage.getItem("products") || "[]");

productForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newProduct = new Product(
    nameInput.value,
    priceInput.value,
    typeInput.value,
    unitInput.value,
    dateInput.value,
    senderInput.value
  );

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

const renderProducts = (productsToRender: Product[]) => {
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
      <button class="delete-button" data-index="${index}">Clear</button>
    `;
    productList.append(li);
  });

  document.querySelectorAll(".delete-button").forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = parseInt((e.target as HTMLButtonElement).getAttribute("data-index") || "0");
      products.splice(index, 1);
      localStorage.setItem("products", JSON.stringify(products));
      renderProducts(products);
    });
  });
};

renderProducts(products);

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm) ||
    product.type.toLowerCase().includes(searchTerm) ||
    product.sender.toLowerCase().includes(searchTerm)
  );

  renderProducts(filteredProducts);
});
