//require the lib
const mongoose = require('mongoose');

//connect to the db
mongoose.connect('mongodb://localhost/contacts_list_db');

//acquire the connection to check if it is successful
var db = mongoose.connection;

//error
db.on('error',console.error.bind(console,'Error connecting to db!!'));

//up and running then print the msg
db.once('open' , function(){
    console.log("connection succesfully established");
})