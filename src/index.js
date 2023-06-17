function updateSubtotal(product) {
  const price = Number(product.querySelector(".price>span").innerText);
  const quantity = Number(product.querySelector(".quantity>input").value);

  let subtotalValue = price * quantity;

  const subtotal = product.querySelector(".subtotal>span");
  subtotal.innerHTML = subtotalValue.toString();

  return subtotalValue;
}

function calculateAll() {
  const rowProduct = document.getElementsByClassName("product");

  let totalValue = 0;
  for (let i = 0; i < rowProduct.length; i++) {
    totalValue += updateSubtotal(rowProduct[i]);
  }

  const total = document.querySelector("#total-value>span");
  total.innerHTML = totalValue.toString();
}

// ITERATION 4

function removeProduct(event) {
  const target = event.currentTarget;

  let product = target.parentNode;
  if(product) {
    product.remove();
  }

  calculateAll();
}

// ITERATION 5

function createProduct() {
  console.log("createeeeeeeeeeeee");

}

window.addEventListener("load", () => {
  const calculatePricesBtn = document.getElementById("calculate");
  calculatePricesBtn.addEventListener("click", calculateAll);

  const removeBtns = document.getElementsByClassName("action");
  for (const btn of removeBtns) {
    btn.addEventListener("click", removeProduct);
  }

  const createBtn = document.getElementById("create");
  createBtn.addEventListener("click", createProduct);
});
