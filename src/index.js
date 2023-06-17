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
  if (product) {
    product.remove();
  }

  calculateAll();
}

// ITERATION 5

function validateCreateProduct(
  inputProduct,
  inputPrice,
  productName,
  productPrice
) {
  let isInvalid = false;

  inputProduct.addEventListener("input", function () {
    if (inputProduct.classList.contains("invalid")) {
      inputProduct.removeAttribute("class");
    }
  });

  inputPrice.addEventListener("input", function () {
    if (inputPrice.classList.contains("invalid")) {
      inputPrice.removeAttribute("class");
    }
  });

  if (!productName) {
    inputProduct.classList.add("invalid");
    inputProduct.focus();
    isInvalid = true;
  } else if (productPrice === "0") {
    inputPrice.classList.add("invalid");
    inputPrice.focus();
    isInvalid = true;
  }

  return isInvalid;
}

function createProduct() {
  const inputProduct = document.querySelector(".create-product input");
  const inputPrice = document.querySelector(
    ".create-product input[type='number']"
  );
  const productName = inputProduct.value;
  const productPrice = inputPrice.value;

  if (
    validateCreateProduct(inputProduct, inputPrice, productName, productPrice)
  )
    return;

  const tr = document.createElement("tr");
  tr.className = "product";

  const nameTd = document.createElement("td");
  nameTd.className = "name";

  const priceTd = document.createElement("td");
  priceTd.className = "price";
  priceTd.innerText = "$";

  const quantityTd = document.createElement("td");
  quantityTd.className = "quantity";

  const subtotalTd = document.createElement("td");
  subtotalTd.className = "subtotal";
  subtotalTd.innerText = "$";

  const actionTd = document.createElement("td");
  actionTd.className = "action";

  const nameSpan = document.createElement("span");
  nameSpan.innerText = productName;
  nameTd.appendChild(nameSpan);

  const priceSpan = document.createElement("span");
  priceSpan.innerText = productPrice;
  priceTd.appendChild(priceSpan);

  const quantityInput = document.createElement("input");
  quantityInput.type = "number";
  quantityInput.value = "0";
  quantityInput.min = "0";
  quantityInput.placeholder = "Quantity";
  quantityTd.appendChild(quantityInput);

  const subtotalSpan = document.createElement("span");
  subtotalSpan.innerText = "0";
  subtotalTd.appendChild(subtotalSpan);

  const removeButton = document.createElement("button");
  removeButton.className = "btn btn-remove";
  removeButton.innerText = "Remove";
  actionTd.appendChild(removeButton);

  tr.appendChild(nameTd);
  tr.appendChild(priceTd);
  tr.appendChild(quantityTd);
  tr.appendChild(subtotalTd);
  tr.appendChild(actionTd);

  const table = document.querySelector("table");
  const tbody = table.querySelector("tbody");
  tbody.appendChild(tr);

  inputProduct.value = "";
  inputPrice.value = "";
}

window.addEventListener("load", () => {
  const calculatePricesBtn = document.getElementById("calculate");
  calculatePricesBtn.addEventListener("click", calculateAll);

  const removeBtns = document.getElementsByClassName("action");
  for (const btn of removeBtns) {
    btn.addEventListener("click", removeProduct);
  }

  const createBtn = document.getElementById("create");
  createBtn.addEventListener("click", () => {
    createProduct();
    lastBtn = removeBtns[removeBtns.length-1];
    lastBtn.addEventListener("click", removeProduct);
  });
});
