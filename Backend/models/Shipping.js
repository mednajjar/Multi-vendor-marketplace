const mongoose = require('mongoose');

const shippingSchema = mongoose.Schema({
    order_id: { type: String, 
        required: true
    },
    livreur_id: { 
        type: String,
        required: true
        },
    shipping_status: { type: String, 
        required: true
    },
})

module.exports = mongoose.model('Shipping', shippingSchema)