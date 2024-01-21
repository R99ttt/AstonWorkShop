// Lior Poterman, Abo Rabia Rami
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
const mongojs = require("mongojs");
const MONGO_USERNAME = "Student";
const MONGO_PWD = "Webdev2023Student";
const MONGO_DB = "webdev2023";
const products = require("./products.js");
// note that the student atlas might not work properly because of write or read limit
// I encountered this problem, I tried in my personal atlas and it works

// const MONGO_CONN =
  // "mongodb+srv://r99ttt:71r7S9bUmxye1XdT@cluster0.ypywzjk.mongodb.net/?retryWrites=true&w=majority";
const MONGO_CONN =
  "mongodb+srv://" +
  MONGO_USERNAME +
  ":" +
  MONGO_PWD +
  "@cluster0.uqyflra.mongodb.net/" +
  MONGO_DB;

const db = mongojs(MONGO_CONN);
let collection = db.collection("carts_314820135");

// Middleware to log incoming requests
const logRequest = (req, res, next) => {
  console.log(`Received request to ${req.url}`);
  next();
};

app.use(logRequest);
app.use(cors());
app.use(express.json());

// Endpoint to retrieve all products
app.get("/products", (req, res) => {
  res.status(200).json(products);
});

// Endpoint to retrieve the cart
app.get("/cart", (req, res) => {
  try {
    collection.findOne({}, (err, cart) => {
      if (err) {
        res
          .status(500)
          .json({ error: "An error occurred while retrieving the cart." });
      } else {
        res.json(cart);
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Endpoint to update or create the cart
app.post("/cart", (req, res) => {
  const newCart = req.body;

  if (newCart._id) {
    // Cart exists in the db, update it
    const cartId = newCart._id;
    delete newCart._id;
    collection.update(
      { _id: mongojs.ObjectId(cartId) },
      { $set: newCart },
      { replace: true },
      (err) => {
        if (err) {
          console.log(err);
          res
            .status(500)
            .json({ error: "An error occurred while updating the cart." });
        } else {
          res.json({ message: "Cart updated successfully." });
        }
      }
    );
  } else {
    // Cart doesn't exist, create a new one
    collection.insert(newCart, (err, insertedCart) => {
      if (err) {
        res
          .status(500)
          .json({ error: "An error occurred while creating the cart." });
      } else {
        console.log(insertedCart);
        res.json({
          message: "Cart created successfully.",
          cart: insertedCart,
        });
      }
    });
  }
});

app.listen(port, () => {
  console.log(`Shop API running on http://localhost:${port}`);
});
