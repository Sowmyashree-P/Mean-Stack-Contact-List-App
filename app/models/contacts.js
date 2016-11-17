// load mongoose since we need it to define a model
var mongoose = require('mongoose');

var contactSchema = mongoose.Schema(
    {
        name: String,
        number: Number,
        email: String,
        address: String,
        relation:String
    },  
    { timestamps: true }
);

var Contact = mongoose.model('Contact', contactSchema);
console.log(Contact);
module.exports = Contact;
