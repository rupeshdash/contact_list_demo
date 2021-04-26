const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');

const Contact = require('./models/contact');
// this app contains all the functionalities of express
const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());

//middleware 1
// app.use(function(req,res,next){
//     req.myName = 'Rupesh';

//     console.log("middleware 1 is called")
//     next();
// });



//middleware to access the static files for example .css , .js , images , fonts etc.
app.use(express.static('assets'));

var contactList = [
    {
        name : "Rupesh",
        phone : "7671365652"
    },
    {
        name : "Ranjan",
        phone : "9861411969"
    },
    {
        name : "jygef",
        phone : "865237323"
    }
]
app.get('/', function(req,res){
    // res.send("<h1>Yup!! it's Working fine!! Isn't it??</h1>");



    Contact.find({},function(err,contacts){
        if(err){
            console.log("Error in fetching contacts");
            return;
        }

        return res.render('home',{
            title : "My contact List",
            contact_list : contacts

        });
    
    });
})





// app.get('/practice', function(req,res){
    
//     return res.render('practice',{
//         title : "Let's play with ejs!"
//     })
// })

app.post('/contact-new',function(req,res){
    // contactList.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    // });
    // console.log(req.myName);
    // contactList.push(req.body);
    // return res.redirect('/');

    //if you dont want to remenber the url  from where the server is called you can
    // also use return res.redirect('back') instead of '/' here the '/' is shorter but 
    // when the url would be something else you can use the shortcut to that

    // return res.redirect('back');


    //now we will do this with database.
    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    },function(err,newContact){
        if(err){console.log('Error creating database!!'); return;}
        console.log("****************",newContact);
        return res.redirect('back');
    })
});

app.get('/delete-contact/' , function(req,res){
   // get the id from the query in the url
    let id = req.query.id;

    
    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);
    // if(contactIndex!=-1){
    //     contactList.splice(contactIndex,1);

    // } 


    //find the contact in the database using id in the database and delete it
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log("error in deleting a contact in database");
            return;
        }

        return res.redirect('back');
    })

   
})


app.listen(port,function(err){
    if(err){
        console.log("Error in running server :",err);
        return;
    }

    console.log("Yup!! My express server is running on port : ",port);

    
})