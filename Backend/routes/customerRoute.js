const express = require('express');
const route = express.Router();
const {getOrders} = require('../controllers/customerController');
const {auth,authCustomer} = require('../middlwares/validateToken');


route.get('/orders', authCustomer, auth, getOrders);



module.exports = route;