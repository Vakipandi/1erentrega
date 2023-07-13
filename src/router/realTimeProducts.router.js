import { Router } from 'express';
import ProductManager from "../manager/productManager";
import __dirname from '../utils.js';

const router = Router();
const manager = new ProductManager(`${__dirname}/files/products.json`);

router.get('/', async (req, res) => {
    const { limit } = req.query;
    let products = await manager.getProducts();
    if(limit) products = products.slice(0, Number(limit));
    
    res.render('realTimeProducts', {products})
});

export default router