import express from "express";
import products from "../src/api/products/products";

const app = express();

app.use("/api/items", products);

app.listen(3000, () => {
  console.log("The application is listening on port 3000!");
});
