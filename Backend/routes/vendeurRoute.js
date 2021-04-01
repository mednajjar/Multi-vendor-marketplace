const express = require('express');
const route = express.Router();
const {getProduct, getProducts, createProduct, updateProduct, deleteProduct, getOrders, getLivreur} = require('../controllers/vendeurController');
const {auth,authVendeur} = require('../middlwares/validateToken');
const multer = require('../middlwares/multer-config');

route.get('/products', authVendeur, auth, getProducts);
route.post('/add', authVendeur, auth, multer, createProduct);
route.put('/update/:id', authVendeur, auth, multer, updateProduct);
route.delete('/delete/:id', authVendeur, auth, deleteProduct);
route.get('/product/:id', authVendeur, auth, getProduct);
route.get('/orders',authVendeur, auth, getOrders);
route.get('/livreurs',authVendeur, auth, getLivreur);


module.exports = route;