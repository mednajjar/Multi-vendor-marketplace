const Joi = require('joi');

exports.userValidation = data =>{
    const schema = Joi.object({
        email: Joi.string().email().required(),
        roles: Joi.string(),
        password: Joi.string().required().min(6),
        
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

exports.categoryValidation = data =>{
    const schema = Joi.object({
        title: Joi.string().required().min(3)
    })
    return schema.validate(data)
}

exports.clientValidation = data =>{
    const schema = Joi.object({
        firstName: Joi.string().required().min(3),
        lastName: Joi.string().required().min(3),
        tel: Joi.number().required().min(10),
        email: Joi.string().email().required(),
        address: Joi.string().required(),
        ville: Joi.string().required(),
        code_postal: Joi.number().required().min(4),
        country: Joi.string().required(),
        password: Joi.string().required(),
        confirmPassword: Joi.ref('password')
    })
    return schema.validate(data)
}

exports.productValidation = data =>{
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required(),
        category_id: Joi.string().required(),
        image: Joi.string().required(),
        ville: Joi.string().required(),
        quantity: Joi.number().required(),
    })
    return schema.validate(data)
}

exports.customerValidation = data =>{
    const schema = Joi.object({
        firsName: Joi.string().required().min(4).max(100),
        lastName: Joi.string().required().min(4).max(100),
        tel: Joi.number().required().min(10),
        email: Joi.string().email().required(),
        address: Joi.string().required(),
        ville: Joi.string().required(),
        code_postal: Joi.number().required(),
        country: Joi.string().required(),
        password: Joi.string().required().min(6)
    })
    return schema.validate(data)
}


