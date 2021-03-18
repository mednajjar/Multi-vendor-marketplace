const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    userName: { type: String, 
        required: true
    },
    email: { 
        type: String,
        unique: true,
        required: true
        },
    password: { type: String,
        required: true
    },
    roles: {
        type: [{
            type: String,
            enum: ['vendeur','livreur' ,'admin'],
            required: true
        }],
        
    },
})
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema)