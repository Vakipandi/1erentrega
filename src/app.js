import ProductManager, { arrayProd } from "./productManager.js";
import express from "express";

const manager = new ProductManager("./files/products.json");

const newProducts = async () => {
  for (let i = 0; i < arrayProd.length; i++) {
    const element = arrayProd[i];
    await manager.addProduct(element);
  }
};

newProducts();

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/products", async (req, res) => {
  const { limit } = req.query;
  let products = await manager.getProducts();
  if (limit) {
    products = products.slice(0, Number(limit));
  }
  res.send({ products });
});

app.get("/products/:pid", async (req, res) => {
  const productId = Number(req.params.pid);
  const product = await manager.getProductsById(productId);
  res.send(product);
});

app.listen(8080, console.log("Listening on 8080"));
