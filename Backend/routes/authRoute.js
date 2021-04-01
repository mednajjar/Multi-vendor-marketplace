const express = require('express');
const route = express.Router();
const {login, logout, register} = require('../controllers/authController');

route.post('/login', login);
route.get('/logout', logout);
route.post('/register', register)


module.exports = route;