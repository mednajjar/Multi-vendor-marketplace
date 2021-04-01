const mongoose = require('mongoose');


const clientSchema = mongoose.Schema({
    firstName: { type: String, 
        required: true
    },
    lastName: { type: String, 
        required: true
    },
    user_id: { type: String,
    },
    tel: { type: Number, 
        required: true
    },
    address: { type: String, 
        required: true
    },
    ville: { type: String, 
        required: true
    },
    code_postal: { type: Number, 
        required: true
    },
    country: { type: String, 
        required: true
    },

})


module.exports = mongoose.model('Client', clientSchema)