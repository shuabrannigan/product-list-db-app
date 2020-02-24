const express = require("express");
const cors = require("cors");
const monk = require("monk");

const app = express();

const db = monk(

);

const sellFor = db.get("tableone");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "working?"
  });
});

// Get request for information to fill the table client side.
app.get("/tableone", (req, res) => {
  sellFor.find().then(item => {
    res.json(item);
  });
});

// Validate content being submitted.
function isValidProduct(item) {
  return (
    item.itemName &&
    item.itemName.toString().trim() !== "" &&
    item.itemType &&
    item.itemType.toString().trim() !== ""
  );
}
// Post product into table one [products to sell table]
app.post("/tableone", (req, res) => {
  if (isValidProduct(req.body)) {
    const dbItem = {
      itemName: req.body.itemName.toString(),
      itemType: req.body.itemType.toString(),
      itemCost: parseInt(req.body.itemCost, 10),
      itemSoldFor: 0,
      itemSold: false,
      created: new Date()
    };

    sellFor.insert(dbItem).then(createddbItem => {
      res.json(createddbItem);
    });
  } else {
    res.status(422);
    res.json({
      message: "product name, type and cost is required."
    });
  }
});

// Add sold for value
app.post("/tableone/:id", (req, res) => {
    const dbItem = {
        id: req.body.id,
        itemSoldFor: parseInt(req.body.value, 10),
        itemSold: req.body.sold
    };
    console.log(dbItem)
    sellFor
    .findOneAndUpdate({_id: dbItem.id}, { $set: {itemSoldFor: dbItem.itemSoldFor, itemSold: dbItem.itemSold}})
    .then(item => {
        res.json(item);
    });
    
});



app.delete("/tableone/:id", (req, res) => {
    const dbItem = {
        id: req.body.id
    };

    sellFor
    .remove(dbItem.id)
    .then(result => {
        res.json(result);
    });
});

app.listen(3000, () => {
  console.log("listening on localhost:3000");
});
