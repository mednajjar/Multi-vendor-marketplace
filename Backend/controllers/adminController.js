const User = require('../models/Users');
const {userValidation} = require('../validation/validationForms');
const bcrypt = require('bcrypt');



exports.getUsers = async (req, res)=>{
    const user = await User.find().select('-password');
    if(user.length < 1) return res.status(404).json({message: 'No user found!'});
    return res.status(200).json(user);
}

exports.createUser = async (req, res)=>{

    // check validaton
    const {error} = userValidation(req.body);
    if(error) return res.status(400).json({err: error.details[0].message, ...req.body});
    // check if email exist
    const ifEmailExist = await User.findOne({email: req.body.email});
    if(ifEmailExist) return res.status(400).json({err: 'please provid a valid email!', ...req.body});
    // hash password
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    try {
        const user = new User({
            ...req.body
        });
        user.password = hashPassword;
        const saveUser = await user.save();
        if(saveUser) return res.status(201).json({message: 'user created'});
    }catch (err) {
        res.status(500).json({err});
    }
}

exports.updateUser = async (req, res)=>{
    // check validaton
    const {error} = userValidation(req.body);
    if(error) return res.status(400).json({err: error.details[0].message, ...req.body});
    // update informations
    try {
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        if(hashPassword) req.body.password = hashPassword;
        const updateUser = await User.updateOne({_id: req.params.id}, {...req.body});
        if(updateUser) return res.status(201).json({message: 'user updated'});
    } catch (error) {
        res.status(500).json({error});
    }
}

exports.deleteUser = async (req, res)=>{
    try {
        const deleteUser = await User.deleteOne({_id: req.params.id});
        if(deleteUser) res.status(200).json({success: 'User deleted'});  
    } catch (error) {
        res.status(500).json({error});
    }
    

}

exports.getUser = async (req, res)=>{
    try {
        const getUser = await User.findOne({_id: req.params.id}).select('-password');
        if(!getUser) return res.status(404).json({message: 'User not found!'});  
        return res.status(200).json({getUser});
    } catch (error) {
        res.status(500).json({error});
    }

}

