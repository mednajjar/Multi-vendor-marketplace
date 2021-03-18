require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

mongoose.connect(process.env.LOCAL_URI,{useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log('Database connected!'))
.catch(()=>console.log('Faild to connect with database!'))


module.exports = app;