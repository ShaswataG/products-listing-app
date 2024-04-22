const { default: axios } = require('axios');
const bodyParser = require('body-parser');
const express = require('express');
var cors = require('cors');
// import axios from "axios";
// import express from "express";

const port = 5500;
const API_URL = 'http://localhost:4000';
const app = express();


// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get('/products', async (req, res) => {
    try {
        const response = await axios.get(API_URL+'/api/products');
        // console.log(response);
        // console.log(response.data);
        // console.log(response.data.data);
        return res
                .status(200)
                .json(response.data);
    } catch(error) {
        return res
                .status(404)
                .json({ error: `error test` });
    }
})

app.get('/products/:id', async(req, res) => {
    try {
        const response = await axios.get(API_URL + '/api/products/' + req.params.id);
        res.status(200).json(response.data.data);
    }
    catch (error) {
        res.status(404).json({ error: `error test` });
    }
})

app.post('/products', async(req, res) => {
    try {
        console.log('test')
        console.log(req.body);
        const response = await axios.post(API_URL + '/api/products', req.body);
        // console.log(response);
        // console.log(response.data);
        res.status(200).json(response.data);
    } catch(error) {
        res.status(404).json({ error: `error test` });
    }
})

app.put('/products/:id', async(req, res) => {
    try {
        const response = await axios.put(API_URL + '/api/products/' + req.params.id, req.body);
        console.log(response);
        console.log(response.data);
        res.status(200).json(response.data);
    } catch(error) {
        res.status(404).json({ error: `Error` })
    }
})

app.delete('/products/:id', async(req, res) => {
    try {
        console.log(req.params.id);
        const response = await axios.delete(API_URL + '/api/products/' + req.params.id);
        // console.log(response);
        console.log(response.data);
        res.status(200).json(response.data);
    } catch(error) {
        res.status(404).json({ error: `Error` })
    }
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});