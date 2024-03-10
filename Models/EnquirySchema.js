

const mongoose = require('mongoose');

// Create a Schema for Users
const EnquirySchema = new mongoose.Schema({
    email: String,
    name: String,
    phoneno: String,
    msg: String,

},{
    timestamps:true
});

// Create a model from the schema
const Enquiry = mongoose.model('Enquiry', EnquirySchema);

module.exports = {
	Enquiry
};