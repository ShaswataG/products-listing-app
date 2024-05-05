const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
// import express from 'express';
const port = 4000;

const app = express();

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());    

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(cors());

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.get('/api/products/filter', (req, res) => {
    let filteredProducts
    // if (req.query.brand) {
    //     filteredProducts = products.filter(product => product.brand === req.query.brand)
    // }
    // if (req.query.category) {
    //     filteredProducts = products.filter(product => product.category === req.query.category)
    // }
    filteredProducts = products.filter(product => {
        if (req.query.brand && req.query.category)
            return (product.brand === req.query.brand && product.category === req.query.category)
        else if (req.query.brand && !req.query.category)
            return product.brand === req.query.brand
        else (!req.query.brand && req.query.category)
            return product.category == req.query.category
    })
    // console.log(filteredProducts)
    res.json({ status: true, data: filteredProducts })
})

app.get('/api/products/:id', (req, res) => {
    const id = req.params.id;
    const foundIndex = products.findIndex(product => product.id === Number(id));
    if (foundIndex < 0) {
        return res.status(404).json({ status: false, data: {error: `Product with id: ${id} doesn't exist`} });
    }
    res.json({ status: true, data: products[foundIndex] });
})

app.post('/api/products', (req, res) => {
    console.log(req.body);
    const { category, brand, price } = req.body;
    if (category === '' || brand === '' || price === '') {
        return res.json({ status: false, data: { error: `Please provide product information` }});
    }
    const newProd = {
        id: products.length+1,
        brand: brand,
        category: category,
        price: price,
    }
    products.push(newProd);
    res.json({ status: true, data: products});
});

app.put('/api/products/:id', (req, res) => {
    const id = req.params.id;
    const foundIndex = products.findIndex(product => product.id === Number(id));
    if (foundIndex < 0) {
        return res.status(404).json({ status: false, data: {error: `Product with id: ${id} doesn't exist`} });
    }
    products[foundIndex].brand = req.body.brand || products[foundIndex].brand;
    products[foundIndex].category = req.body.category || products[foundIndex].category;
    products[foundIndex].price = req.body.price || products[foundIndex].price;
    res.json({  status: true, data: products});
});

app.delete('/api/products/:id', (req, res) => {
    const id = req.params.id;   
    const foundIndex = products.findIndex(product => product.id === Number(id));
    if (foundIndex < 0) {
        return res.json({ status: false, data: {error: `Product with id: ${id} doesn't exist`} });
    } else {
        products.splice(foundIndex, 1);
        res.json({ status: true, data: products});
    }
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})

let products = [
];