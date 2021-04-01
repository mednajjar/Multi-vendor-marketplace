const express = require('express');
const route = express.Router();
const {getUsers, createUser, updateUser, deleteUser, getUser} = require('../controllers/adminController');
const {auth, authAdmin} = require('../middlwares/validateToken');

route.get('/admin/users',getUsers);
route.post('/admin/add', createUser);
route.put('/admin/update/:id',authAdmin,auth,updateUser);
route.delete('/admin/delete/:id',authAdmin,auth,deleteUser);
route.get('/admin/user/:id',authAdmin,auth,getUser);


module.exports = route;