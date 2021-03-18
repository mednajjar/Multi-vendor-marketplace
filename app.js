require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const principalRoute = require('./routes/principalRoute');
const cookie = require('cookie-parser');

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookie());


mongoose.connect(process.env.LOCAL_URI,{useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log('Database connected!'))
.catch(()=>console.log('Faild to connect with database!'))

app.use('/api', principalRoute);



module.exports = app;