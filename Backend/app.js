require('dotenv').config({ path: './.env'});
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const adminRoute = require('./routes/adminRoute');
const vendeurRoute = require('./routes/vendeurRoute');
const customerRoute = require('./routes/customerRoute');
const authRoute = require('./routes/authRoute');
const cookie = require('cookie-parser');
const cors = require('cors');
const path = require('path');
app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use(cors());
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(cookie());



mongoose.connect(process.env.LOCAL_URI,
    {useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true })
.then(()=>console.log('Database connected!'))
.catch(()=>console.log('Faild to connect with database!'))

app.use('/api', authRoute)
app.use('/api', adminRoute);
app.use('/api/vendeur', vendeurRoute);
app.use('/api/customer', customerRoute);




module.exports = app;