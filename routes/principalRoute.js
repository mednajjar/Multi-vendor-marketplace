const express = require('express');
const routes = express.Router();
const {getUsers, createUser, updateUser, deleteUser, getUser, loginAdmin, logout} = require('../controllers/adminController');
const {auth} = require('../middlwares/validateToken')

routes.get('/admin/users',auth,getUsers);
routes.post('/admin/add',auth,createUser);
routes.put('/admin/update/:id',auth,updateUser);
routes.delete('/admin/delete/:id',auth,deleteUser);
routes.get('/admin/user/:id',auth,getUser);
routes.post('/admin/login',loginAdmin);
routes.get('/admin/logout', logout)


module.exports = routes;