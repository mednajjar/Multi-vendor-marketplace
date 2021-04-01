const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    client_id: { type: String, 
        required: true
    },
    product_id: { 
        type: String,
        required: true
        },
    vendor_id: { 
        type: String,
        required: true
        },
    quantity: { type: Number, 
        required: true
    },
    total_price: { type: Number, 
        required: true
    },
    shipping_status: { type: String, 
        enum: ['En attente','livrée' ,'rejeter'],
            default:'En attente'
    },
   
})

module.exports = mongoose.model('Order', orderSchema)