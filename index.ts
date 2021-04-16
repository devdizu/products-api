import express from "express";
import items from "./src/api/items/items";

const app = express();

app.use("/api/items", items);

app.listen(3000, () => {
  console.log("The application is listening on port 3000!");
});
