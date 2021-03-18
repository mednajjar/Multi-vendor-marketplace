const User = require('../models/Users');
const {userValidation, loginValidation} = require('../validation/validationForms');
const bcrypt = require('bcrypt');

exports.getUsers = async (req, res)=>{
    const user = await User.find();
    if(!user) return res.status(404).json({message: 'No user found!'});
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
        })
        user.password = hashPassword;
        const saveUser = await user.save();
        if(saveUser) return res.status(201).json({user});
    }catch (err) {
        res.status(500).json({err})
    }
}

exports.updateUser = async (req, res)=>{

}

exports.deleteUser = async (req, res)=>{

}

exports.getUser = async (req, res)=>{

}

exports.loginFunction = async (req, res)=>{

}