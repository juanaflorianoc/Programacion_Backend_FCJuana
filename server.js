const express = require('express')
const Contenedor = require('./Contenderor');

const product = new Contenedor ('./productos.txt');

const app = express()

//productos
app.get('/productos', async (req, res) => {
    let allProducts = await product.getAll();
    res.send(allProducts)
})

//producto random
app.get('/productorandom', async (req, res) => {

    var rand = Math.floor(Math.random())
    let productById = await product.getById(rand);

    res.send(`El producto random elegido es: ${productById}`)
})

const server = app.listen(8080, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
    console.log(productById);
})

server.on('error', error => console.log(`Error en servidor ${error}`));
