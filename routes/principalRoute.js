const express = require('express');
const routes = express.Router();
const {getUsers, createUser, updateUser, deleteUser, getUser, loginAdmin} = require('../controllers/adminController');

routes.get('/admin/users',getUsers);
routes.post('/admin/add',createUser);
routes.put('/admin/update/:id',updateUser);
routes.delete('/admin/delete/:id',deleteUser);
routes.get('/admin/user/:id',getUser);
routes.post('/admin/login', loginAdmin);


module.exports = routes;