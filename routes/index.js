var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Event = require("../models/event");
var About = require("../models/aboutUs");
var Blog = require("../models/blog");
var Sermon = require("../models/sermon");
var Ministry = require("../models/ministry")
var middleware = require("../middleware");
var stripe = require("stripe")("");

var nodemailer = require("nodemailer");
const nodemailerSendgrid = require('nodemailer-sendgrid');


//setting up the route | Getting the landing page
router.get("/", function(req, res){

    //Get all campgrounds from the DB
    Event.find({}, null, {sort: {dateOfEvent: 1}},function(err,allevents){
        
    if(err){
                console.log(err);
        }
        About.find({},function(err,allhome){
        if(err)
            {
                console.log(err);
            }
            
            Ministry.find({},function(err,allministry){
                
            if(err){
                
            }
            Blog.find({}, null, {sort: {createdAt: -1}}, function(err, allblogs){
                        if(err)
                        {
                         console.log(err);
                        }
                Sermon.find({},function(err, allsermon){
                    
                        if(err){
        
                              }
                        else{
                                 res.render("home", {event:allevents, home:allhome, ministry:allministry, blog:allblogs, sermon:allsermon});
                                 console.log(allsermon);
                        }
                    
                      });
                });
            });
        });
    });
});




router.post("/",function(req, res) {
   
    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var email = req.body.email;
    var phone = req.body.phone;
    var Usermessage = req.body.message;
    

    const transport = nodemailer.createTransport(
        nodemailerSendgrid({
            apiKey: ''
        })
    );
    
    
    transport.sendMail({
        from: 'refugioseguroministries@gmail.com',
        to: 'leog4za@gmail.com',
        subject: 'refugioseguroministries ContactForm | New Message From ' + firstName + ' ' + lastName,
        html:
        '<p>' + Usermessage + '</p>'
        + '<p><br>' + firstName
        + '<br>' + lastName
        + '<br>' + phone
        + '<br>' + email + ' </p>',
    
    })
    .then(([res]) => {
        console.log('Message delivered with code %s %s', res.statusCode, res.statusMessage);
    })
    .catch(err => {
        console.log('Errors occurred, failed to deliver message');
    
        if (err.response && err.response.body && err.response.body.errors) {
            err.response.body.errors.forEach(error => console.log('%s: %s', error.field, error.message));
        } else {
            console.log(err);
        }
    });
    
    res.redirect("/");
});










router.get("/email", function(req, res){
       res.render("email");
    
});

//=================================
        // AUTH ROUTES // 
//=================================


//------------------------------------
//SHOW REGISTER FORM

router.get("/register", function(req, res) {
   
   res.render("register"); 
});

//Handle Sign up post
router.post("/register",function(req, res) {
    
    var newUser = ({username: req.body.username, email: req.body.useremail});
   User.register(newUser,req.body.password, function(err,user){
       if(err)
       {
           req.flash("error", err.message);
           return res.render("register");
       }
       passport.authenticate("local")(req,res,function(){
           req.flash("success","Welcome To RS" + user.username);
           res.redirect("/");
       });
   });
});

//------------------------------------


// Show Login Form
router.get("/login",function(req, res) {
   res.render("loginnew");
});

//Handling login logic
router.post("/login",passport.authenticate("local",
{
    successRedirect: "/",
    failureRedirect: "/login"
    
}), function(req, res) {});



//LOGOUT ROUTE
router.get("/logout",function(req, res) {
   
   req.logout();
   req.flash("success","Logged you out!");
   res.redirect("/");
});


router.post("/charge",function(req,res){
        
        
       var token = req.body.stripeToken;
       //var email = req.body.stripeEmail;
       var chargeAmount = req.body.Amount;
       
    // console.log("the email is : " +  email);

       var charge = stripe.charges.create({
           
           amount : Math.round(chargeAmount * 100),
           currency : "usd",
           source : token,
           description: 'Offering',
           statement_descriptor: 'Refugio Seguro'
       }, function(err,charge){
           
           if(err)
           {
               console.log(err.type);

           }
                                                
       });
       
       console.log("Your Payment was succefull!");
        res.redirect("/")
       
    });
    


module.exports = router;