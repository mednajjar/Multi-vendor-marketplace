const mongoose = require('mongoose');


const productSchema = mongoose.Schema({
    title: { type: String, 
        required: true
    },
    description: { 
        type: String,
        required: true
        },
    price: { type: Number, 
        required: true,
        
    },
    vendor_id: { type: String, 
        required: true
    },
    category_id: { type: String, 
        required: true
    },
    image: { type: String, 
        required: true
    },
    quantity: { type: Number, 
        required: true
    },
})


module.exports = mongoose.model('Product', productSchema)