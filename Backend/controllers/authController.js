const User = require('../models/Users');
const Client = require('../models/Client');
const {loginValidation, clientValidation} = require('../validation/validationForms');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.login = async (req, res)=>{
    const {email, password} = req.body;
    // check validaton
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).json({err: error.details[0].message});
    try {

        // check email
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({err: 'Invalid email or password'});
        // compare password
        const match = await bcrypt.compare(password, user.password);
        if(!match) return res.status(400).json({err: 'Invalid email or password'});
        // console.log(user._id)
        // console.log(user.roles)
        // if(user.roles != 'admin') return res.status(400).json({err: 'You are not allowed to access this page'});
        const token = jwt.sign({id: user._id, roles: user.roles}, process.env.TOKEN_SECRET, {expiresIn:process.env.EXPIRATION_IN});
        res.cookie('auth_token', token, {maxAge:process.env.EXPIRATION_IN,httpOnly: true});
        return res.status(200).json({token});
    } catch (err) {
        res.status(500).json({error: 'bad request'});
    }
}

exports.register = async (req, res)=>{
    const {email, password,firstName,lastName,tel,address,ville,code_postal,country} = req.body;
    // check validaton
    const {error} = clientValidation(req.body);
    if(error) return res.status(400).json({err: error.details[0].message, ...req.body});
    // check if email exist
    const ifEmailExist = await User.findOne({email});
    if(ifEmailExist) return res.status(400).json({err: 'please provid a valid email!', ...req.body});
    // hash password
    const hashPassword = await bcrypt.hash(password, 10);
    try {
        const user = new User({  
            email,password
        });
        console.log(user.roles)
        user.password = hashPassword;
        const client = new Client({
            firstName,lastName,tel,address,ville,code_postal,country,user_id:user._id
        })
        const saveUser = await user.save();
        const saveClient = await client.save();
        if(saveUser && saveClient) return res.status(201).json('data saved')
    }catch (err) {
        res.status(500).json({err});
    }
}

exports.logout = (req, res) => {
        res.cookie('auth_token', '', {maxAge: 0, httpOnly: true});
        res.status(200).json('loged out')  
}