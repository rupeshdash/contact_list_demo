const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    }
})

//here Contact is a model
// A model is a class with which we construct documents. In this case, each document will be a Contact with properties and behaviors as declared in our schema.


const Contact = mongoose.model('Contact',contactSchema);
module.exports = Contact;