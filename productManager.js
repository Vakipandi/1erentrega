// definir la clase product manager

class ProductManager {
    constructor() {
        this.products = [];
    
    }


// metodo arreglo de productos
getProducts = () => {
    return this.products;
};

// parametros

addProduct = (title, description, price, thumbnail, code, stock) => {
    const product = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        products: []
    }
    if (this.products.length === 0) {
        product.id = 1;
    } else {
        product.id = this.products[this.products.length - 1].id + 1;
    }

    // pusheamos el prodcuto

    this.products.push(product);


}

// metodo getProductById

getProductById = (idProduct) => {
    const productIndex = this.products.findIndex((product) => product.id === idProduct);
    
    if (productIndex === -1) {
        console.log("Not Found" );
        return;
    }
    const productAdd = this.products[productIndex].products.includes(idProduct);
    if (productAdd) {
        console.log("Producto se agrego correctamente" );
        return;
    }

    this.products[productIndex].products.push(idProduct);
}
}

const manejadorProductos = new ProductManager();
manejadorProductos.addProduct("Camiseta", "Camiseta de manga corta", 50, "sin imagen", "camiseta1", 23)
manejadorProductos.addProduct("Camiseta", "Camiseta de manga larga", 150, "sin imagen", "camiseta2", 15)
manejadorProductos.addProduct("Camiseta", "Camiseta de manga mediana", 100, "sin imagen", "camiseta3", 34)


manejadorProductos.getProductById(1);
manejadorProductos.getProductById(2);
manejadorProductos.getProductById(3);

console.log(manejadorProductos.getProducts());