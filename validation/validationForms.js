const Joi = require('joi');

exports.userValidation = data =>{
    const schema = Joi.object({
        userName: Joi.string().required().min(4).max(20),
        email: Joi.string().email().required(),
        roles: Joi.string().required(),
        password: Joi.string().required().min(6)
    })
    return schema.validate(data)
}

exports.loginValidation = data =>{
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })
    return schema.validate(data)
}
