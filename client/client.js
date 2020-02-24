console.log("hello world");

const form = document.querySelector("form");
const loadingElement = document.querySelector(".loading");
const forSaleTable = document.querySelector(".tableone");
const soldTable = document.querySelector(".tabletwo");
const tableItem = document.querySelector(".product-contain");
const soldTableItem = document.querySelector(".sold-contain");
const negative = document.getElementsByClassName(".am-i-negative");

const API_URL = "http://localhost:3000/tableone";
const ID_URL = "http://localhost:3000/tableone/:id";
const SOLDID_URL = "http://localhost:3000/tableone/:soldid";

loadingElement.style.display = "none";
listForSale();
listSold();

function profitIs(itemCost, itemSoldFor) {
  let total = itemSoldFor - itemCost;
  return total;
}

function profitPercentage(profit, revenue) {
  return (100 * profit) / revenue;
}

function marginIs(itemType) {
  if (itemType === "cpu" || itemType === "mobo") {
    return 10;
  } else if (itemType === "gpu" || itemType === "case") {
    return 15;
  } else if (itemType === "psu") {
    return 8;
  } else if (itemType === "other") {
    return 5;
  } else {
    return "item type not defined.";
  }
}

function calcMargin(itemType, itemCost) {
  if (itemType === "cpu" || itemType === "mobo") {
    return Math.fround((marginIs(itemType) / 100 + 1) * itemCost).toFixed(2);
  } else if (itemType === "gpu" || itemType === "case") {
    return Math.fround((marginIs(itemType) / 100 + 1) * itemCost).toFixed(2);
  } else if (itemType === "psu") {
    return Math.fround((marginIs(itemType) / 100 + 1) * itemCost).toFixed(2);
  } else if (itemType === "other") {
    return Math.fround((marginIs(itemType) / 100 + 1) * itemCost).toFixed(2);
  } else {
    return "no margin is defined.";
  }
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const formData = new FormData(form);
  const itemName = formData.get("itemName");
  const itemType = formData.get("itemType");
  const itemCost = formData.get("itemCost");

  const product = {
    itemName,
    itemType,
    itemCost
  };

  loadingElement.style.display = "";
  form.style.display = "none";

  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(product),
    headers: {
      "content-type": "application/json"
    }
  })
    .then(response => response.json())
    .then(tableOne => {
      form.reset();
      loadingElement.style.display = "none";
      form.style.display = "";
      listForSale();
      listSold();
    });
});

function listForSale() {
  forSaleTable.innerHTML = "";
  fetch(API_URL)
    .then(response => response.json())
    .then(products => {
      products.forEach(product => {
        const soldStatus = product.itemSold;
        if (soldStatus === true) {
          return;
        } else {
          const id = product._id;
          const tr = document.createElement("tr");
          tr.setAttribute("class", "product-contain");
          tr.setAttribute("id", id);

          const itemName = document.createElement("td");
          itemName.textContent = product.itemName.toUpperCase();

          const itemType = document.createElement("td");
          itemType.textContent = product.itemType.toUpperCase();

          const itemCost = document.createElement("td");
          itemCost.textContent = product.itemCost.toFixed(2);

          const margin = document.createElement("td");
          margin.textContent = marginIs(product.itemType);

          const sellFor = document.createElement("td");
          sellFor.textContent = calcMargin(product.itemType, product.itemCost);

          const soldValue = document.createElement("td");
          const soldValueInput = document.createElement("input");
          soldValueInput.setAttribute("class", "soldvalue");
          soldValueInput.setAttribute("name", "soldvalue");
          soldValueInput.setAttribute("type", "number");
          soldValueInput.setAttribute("required", "");

          soldValue.appendChild(soldValueInput);

          const sold = document.createElement("td");
          const soldBtn = document.createElement("button");
          soldBtn.textContent = "Sold";
          soldBtn.setAttribute("class", "soldBtn");
          soldBtn.setAttribute("id", id);
          soldBtn.setAttribute("type", "submit");
          soldBtn.setAttribute("onclick", "soldItem(id)");

          sold.appendChild(soldBtn);

          const Delete = document.createElement("td");
          const DeleteBtn = document.createElement("button");
          DeleteBtn.textContent = "Delete";
          DeleteBtn.setAttribute("class", "deleteBtn");
          DeleteBtn.setAttribute("id", id);
          DeleteBtn.setAttribute("type", "submit");
          DeleteBtn.setAttribute("onclick", "deleteItem(id)");

          Delete.appendChild(DeleteBtn);

          tr.appendChild(itemName);
          tr.appendChild(itemType);
          tr.appendChild(itemCost);
          tr.appendChild(margin);
          tr.appendChild(sellFor);
          tr.appendChild(soldValue);
          tr.appendChild(sold);
          tr.appendChild(Delete);

          forSaleTable.appendChild(tr);
        }
      });
      loadingElement.style.display = "none";
    });
}

function soldItem(e) {
  const tableItem = document.getElementById(e);
  const value = tableItem.cells[5].firstChild.value;
  const id = tableItem.id;
  if (!value) {
    alert("Sold value must be entered entered");
  } else {
    const itemId = {
      id,
      value,
      sold: true
    };

    fetch(ID_URL, {
      method: "POST",
      body: JSON.stringify(itemId),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(response => response.json())
      .then(item => {
        listForSale();
        listSold();
      });
  }
}

// DELETE FUNCTION!!
function deleteItem(e) {
  const tableItem = document.getElementById(e);
  const id = tableItem.id;

  const row = {
    id
  };

  fetch(ID_URL, {
    method: "DELETE",
    body: JSON.stringify(row),
    headers: {
      "content-type": "application/json"
    }
  })
    .then(response => response.json())
    .then(jsonResponse => {
      listForSale();

      listSold();
    });
}
// List items to sold table, works by calling on the api and if returns false table 2 is filled.
function listSold() {
  soldTable.innerHTML = "";
  fetch(API_URL)
    .then(response => response.json())
    .then(products => {
      products.reverse();
      products.forEach(product => {
        const soldStatus = product.itemSold;
        if (soldStatus === false) {
          return;
        } else {
          const id = product._id;
          const tr = document.createElement("tr");
          tr.setAttribute("class", "sold-contain");
          tr.setAttribute("id", id);

          const itemName = document.createElement("td");
          itemName.textContent = product.itemName.toUpperCase();

          const itemType = document.createElement("td");
          itemType.textContent = product.itemType.toUpperCase();

          const itemCost = document.createElement("td");
          itemCost.textContent = product.itemCost;

          const soldValue = document.createElement("td");
          soldValue.textContent = product.itemSoldFor;

          const profit = document.createElement("td");
          profit.setAttribute("class", "am-i-negative");
          profit.textContent = profitIs(product.itemCost, product.itemSoldFor);

          const profitP = document.createElement("td");
          profitP.setAttribute("class", "am-i-negative");
          profitP.textContent = Math.fround(
            profitPercentage(
              profitIs(product.itemCost, product.itemSoldFor),
              product.itemSoldFor
            )
          ).toFixed(2);

          // function to check if elements are negative.
          function negativeVal() {
            if (
              parseInt(profitP.textContent, 10) <= 0 ||
              parseInt(profit.textContent, 10) <= 0
            ) {
              console.log("zero");
              return (
                profitP.setAttribute("class", "negative"),
                profit.setAttribute("class", "negative")
              );
            } else {
              console.log("?");
              console.log(profitP);
            }
          }
          // calling function
          negativeVal();

          const unsold = document.createElement("td");
          const unsoldBtn = document.createElement("button");
          unsoldBtn.textContent = "unsold";
          unsoldBtn.setAttribute("class", "unsoldBtn");
          unsoldBtn.setAttribute("id", id);
          unsoldBtn.setAttribute("type", "submit");
          unsoldBtn.setAttribute("onclick", "unsoldItem(id)");

          unsold.appendChild(unsoldBtn);

          const Delete = document.createElement("td");
          const DeleteBtn = document.createElement("button");
          DeleteBtn.textContent = "Delete";
          DeleteBtn.setAttribute("class", "deleteBtn");
          DeleteBtn.setAttribute("id", id);
          DeleteBtn.setAttribute("type", "submit");
          DeleteBtn.setAttribute("onclick", "deleteItem(id)");

          Delete.appendChild(DeleteBtn);

          tr.appendChild(itemName);
          tr.appendChild(itemType);
          tr.appendChild(itemCost);
          tr.appendChild(soldValue);
          tr.appendChild(profit);
          tr.appendChild(profitP);
          tr.appendChild(unsold);
          tr.appendChild(Delete);

          soldTable.appendChild(tr);
        }
      });
      loadingElement.style.display = "none";
    });
}
// sets item sold status to false and value to 0
function unsoldItem(e) {
  const tableItem = document.getElementById(e);
  const id = tableItem.id;

  const itemId = {
    id,
    value: 0,
    sold: false
  };

  fetch(ID_URL, {
    method: "POST",
    body: JSON.stringify(itemId),
    headers: {
      "content-type": "application/json"
    }
  })
    .then(response => response.json())
    .then(item => {
      listForSale();
      listSold();
    });
}
