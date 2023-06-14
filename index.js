import ProductManager from "./productManager.js";

const manager = new ProductManager('./files/products.json');

const product1 = {
  title: "Miel",
  description: "Pequeña descripcion de la miel",
  price: 23,
  thumbnail: "sin imagen",
  code: 100,
  stock: 16,
};

const product2 = {
  title: "Mermelada",
  description: "Pequeña descripcion de la mermelada",
  price: 27,
  thumbnail: "sin imagen",
  code: 200,
  stock: 11,
};

const product3 = {
  title: "Stevia",
  description: "Pequeña descripcion de la stevia",
  price: 15,
  thumbnail: "sin imagen",
  code: 300,
  stock: 7,
};

const product4 = {
  title: "Crema",
  description: "Pequeña descripcion de la crema",
  price: 30,
  thumbnail: "sin imagen",
  code: 400,
  stock: 20,
};

const newProducts = async () => {
  await manager.addProduct(product1);
  await manager.addProduct(product2);
  await manager.addProduct(product3);
  await manager.addProduct(product4);

  console.log(await manager.getProducts());

  console.log(await manager.getProductsById(1));

  console.log(await manager.updateProduct({id:1 , stock:100}))

  console.log(await manager.deleteProduct(1))

  await manager.addProduct(product1);
}

newProducts();