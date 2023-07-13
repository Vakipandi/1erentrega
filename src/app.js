import productsRouter from './router/products.router.js'
import cartsRouter from './router/carts.router.js'
import __dirname from './utils.js';
import express from "express";

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.use(express.static((`${__dirname}/public`)))

app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`);

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

app.use('/realtimeproducts', realTimeProducts);

app.listen(8080, console.log("Listening on 8080"));

const io = new Server(server);

io.on('connection', async socket => {
    
    console.log('cliente conectado');
    
    socket.on('dataProduct', async data => {
        const product = await manager.addProduct(data)
        console.log(product)
        if(product){
            const successfully = `<span id='errorMessage'>Product added successfully!</span>`
            
            socket.emit('message', successfully)
            socket.emit('product', product)
            
        } else {
            const errorMessage = `<span id='errorMessage'>Something went wrong, try again</span>`
            socket.emit('message', errorMessage)
        }
    })

    try {
        const productData = await manager.getProducts()
        socket.emit('data', productData)
    } catch (error) {
        console.log(error)
    }

    socket.on('deleteData', async data => {
        const product = await manager.deleteProduct(data)
        console.log(product)
        if(product){
            const deleteMessage = `<span id='errorDeleteMessage'>The product was delete successfully!</span>`
            socket.emit('deleteMessage', deleteMessage)
            socket.emit('deletedProduct', product)
        } else {
            const deleteMessage = `<span id='errorDeleteMessage'>Something went wrong, try again!</span>`
            socket.emit('deleteMessage', deleteMessage)
        }
    })

});