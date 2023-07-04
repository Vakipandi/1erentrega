import productsRouter from './router/products.router.js'
import cartsRouter from './router/carts.router.js'
import __dirname from './utils.js';
import express from "express";

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

app.listen(8080, console.log("Listening on 8080"));
