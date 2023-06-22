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
      const codeRep = products.find((p) => p.code == product.code);

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
      let product = resultado.find((p) => p.id == id);

      if (product) {
        return product;
      } else {
        return { error: `The product with id: ${id}, doesn't exist!` };
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
      products[indexProd] = { ...updateProd, ...product };
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

export const arrayProd = [
  {
		"title": "Miel1",
		"description": "Pequeña descripcion de la miel frasco pequeño",
		"price": 10,
		"thumbnail": "sin imagen",
		"code": 1,
		"stock": 16,
		"id": 1
	},
	{
		"title": "Miel2",
		"description": "Pequeña descripcion de la miel frasco mediano",
		"price": 13,
		"thumbnail": "sin imagen",
		"code": 102,
		"stock": 16,
		"id": 2
	},
	{
		"title": "Miel3",
		"description": "Pequeña descripcion de la miel frasco grande",
		"price": 23,
		"thumbnail": "sin imagen",
		"code": 103,
		"stock": 16,
		"id": 3
	},
	{
		"title": "Mermelada1",
		"description": "Pequeña descripcion de la mermelada frasco pequeño",
		"price": 12,
		"thumbnail": "sin imagen",
		"code": 201,
		"stock": 11,
		"id": 4
	},
	{
		"title": "Mermelada2",
		"description": "Pequeña descripcion de la mermelada frasco mediano",
		"price": 20,
		"thumbnail": "sin imagen",
		"code": 202,
		"stock": 11,
		"id": 15
	},
	{
		"title": "Mermelada3",
		"description": "Pequeña descripcion de la mermelada frasco grande",
		"price": 32,
		"thumbnail": "sin imagen",
		"code": 203,
		"stock": 11,
		"id": 6
	},
	{
		"title": "Stevia1",
		"description": "Pequeña descripcion de la stevia frasco pequeño",
		"price": 15,
		"thumbnail": "sin imagen",
		"code": 301,
		"stock": 17,
		"id": 7
	},
	{
		"title": "Stevia2",
		"description": "Pequeña descripcion de la stevia frasco mediano",
		"price": 26,
		"thumbnail": "sin imagen",
		"code": 302,
		"stock": 34,
		"id": 8
	},
	{
		"title": "Stevia3",
		"description": "Pequeña descripcion de la stevia frasco grande",
		"price": 36,
		"thumbnail": "sin imagen",
		"code": 303,
		"stock": 17,
		"id": 9
	},
	{
		"title": "Crema1",
		"description": "Pequeña descripcion de la crema frasco pequeño",
		"price": 8,
		"thumbnail": "sin imagen",
		"code": 401,
		"stock": 21,
		"id": 10
	},
	{
		"title": "Crema2",
		"description": "Pequeña descripcion de la crema frasco mediano",
		"price": 18,
		"thumbnail": "sin imagen",
		"code": 402,
		"stock": 24,
		"id": 11
	},
	{
		"title": "Crema3",
		"description": "Pequeña descripcion de la crema frasco grande",
		"price": 33,
		"thumbnail": "sin imagen",
		"code": 403,
		"stock": 10,
		"id": 12
	}
];
