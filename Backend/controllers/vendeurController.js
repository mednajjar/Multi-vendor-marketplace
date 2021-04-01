const Product = require('../models/Product');
const Livreur = require('../models/Users');
const Order = require('../models/Order');
const {productValidation} = require('../validation/validationForms');
const fs = require('fs');

exports.getProducts = async (req, res, next) => {
    const product = await Product.find();
    if(product.length < 1) return res.status(404).json({message: 'No product found!'});
    return res.status(200).json(product);  
}
exports.getProduct = async (req, res, next) => {
    try {
        const getProduct = await Product.findOne({_id: req.params.id});
        if(!getProduct) return res.status(404).json({message: 'Product not found!'});  
        return res.status(200).json({getProduct});
    } catch (error) {
        res.status(500).json({error});
    }
}
exports.createProduct = async (req, res, next) => {
     // check validaton
     const {error} = productValidation(req.body);
     if(error) return res.status(400).json({err: error.details[0].message, ...req.body});
     // hash password
     try {
         const productObject = JSON.parse(req.body.product)
         delete productObject._id;
         const product = new Product({
             vendor_id: res.locals.user.id,
             ...productObject,
 
             image:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
         });
         const saveproduct = await product.save();
         if(saveproduct) return res.status(201).json({message: 'product created',product});
     }catch (err) {
         res.status(500).json({err:'bad reaquest'});
     }
}
exports.updateProduct = async (req, res, next) => {
    // check validaton
    const {error} = productValidation(req.body);
    if(error) return res.status(400).json({err: error.details[0].message, ...req.body});
    // update informations
    try {
        const productObject = req.file ?
        {
            ...JSON.parse(req.body.product),
            image:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : {...req.body};
        const product = await Product.updateOne({_id: req.params.id}, {...productObject});
        if(product) return res.status(201).json({message: 'Product updated'});
    } catch (error) {
        res.status(500).json({error});
    }
}

exports.deleteProduct = async (req, res, next) => {
    try {
        // find product and image url then delete all data
        const product = await Product.findOne({_id: req.paras.id});
        const filename = product.image.split('/images/')[1];
        if(product) return fs.unlink(`images/${filename}`,async ()=>{
            const deleteProduct = await Product.deleteOne({_id: req.params.id});
            if(deleteProduct) res.status(200).json({success: 'Product deleted'});  
        })  
    } catch (error) {
        res.status(500).json({error});
    }
}

exports.getOrders = async (req, res) => {
    try {
        const order = await Order.find({
            vendor_id: res.locals.user.id,
            shipping_status:{$in: ["En attente", "rejeter"]},
        })
        console.log(res.locals.user.id)
        if(order.length < 1) return res.status(404).json({message: 'No order found!'});
        return res.status(200).json({order});
    } catch (error) {
        return res.status(500).json({message: 'Internal server error'});
    }
    
}

exports.getLivreur = async (req, res) => {
    const livreur = await Livreur.find({
        roles:'livreur'
    });
    if(livreur.length < 1) return res.status(404).json({message: 'No livreur found!'});
    return res.status(200).json(livreur)

}