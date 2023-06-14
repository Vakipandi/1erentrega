import fs from "fs";
// definir la clase product manager

// constructor

export default class ProductManager {
  constructor(path) {
    this.path = path;
  }

  // metodo arreglo de productos
  getProducts = async () => {
    try {
      if (fs.existsSync(this.path)) {
        const data = await fs.promises.readFile(this.path, "utf-8");
        console.log(data);
        const pD = JSON.parse(data);
        return pD;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  };

  // parametros

  addProduct = async (product) => {
    try {
      const products = await this.getProducts();
      const codeRep = products.find(p => p.code == product.code);

      if (
        !product.title ||
        !product.description ||
        !product.price ||
        !product.thumbnail ||
        !product.code ||
        product.stock == undefined
      ) {
        return console.log("complete");
      }

      if (codeRep) {
        return console.log("el codigo ya existe");
      }

      let id;

      if (products.length == 0) {
        id = 1;
      } else {
        id = products[products.length - 1].id + 1;
      }

      products.push({
        ...product,
        id,
      });

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(products, null, "\t")
      );

      return products;
    } catch (error) {
      console.log(error);
    }
  };

  // metodo getProductById

  getProductsById = async (id) => {
    try {
      let resultado = await this.getProducts();
      let product = resultado.find(p => p.id == id);

      if (product) {
        return console.log(product);
      } else {
        return console.error("Not Found");
      }
    } catch (err) {
      console.log(err);
    }
  };

  updateProduct = async (product) => {
    try {
      const products = await this.getProducts();
      const updateProd = products.find((p) => p.id === product.id);
      if (!updateProd) {
        return console.log("no existe producto");
      }
      const indexProd = products.findIndex((p) => p.id === product.id);
      products[indexProd] = { ...updateProd,...product };
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(products, null, "\t")
      );
      return products[indexProd];
    } catch (error) {
      console.log(error);
    }
  };

  deleteProduct = async (id) => {
    try {
      const products = await this.getProducts();
      const deleteProd = products.findIndex((p) => p.id === id);
      if (deleteProd < 0) {
        return console.log("no se encontro el producto");
      }
      products.splice(deleteProd, 1);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(products, null, "\t")
      );
      return console.log("el producto eliminado");
    } catch (error) {
      console.log(error);
    }
  };
}
