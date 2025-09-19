const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    title: { type: String, required: [true, 'Please enter address title'] },
    description: { type: String, required: [true, 'Please enter address description'] },
}, {
    timestamps: true, // automatically create createdAt and updatedAt fields
});

// create a Mongoose model named 'Address' using the addressSchema
const Address = mongoose.model('Address', addressSchema);

// export the Address model to be used elsewhere
module.exports = Address;