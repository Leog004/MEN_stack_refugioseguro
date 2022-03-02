var express = require("express");
var router = express.Router();
var passport = require("passport");
var About = require("../models/aboutUs");


var async = require("async");
var nodemailer = require("nodemailer");
var crypto = require("crypto");
var Hogan = require("hogan.js");
var fs = require("fs");
var xoauth2 = require("xoauth2");


var template = fs.readFileSync('./views/email.ejs', 'utf-8');
var compiledtemplate = Hogan.compile(template);
const nodemailerSendgrid = require('nodemailer-sendgrid');



router.get("/",function(req,res){
    
    About.find({},function(err,allhome){
        if(err)
        {
            console.log(err);
        }else{
                 res.render("contact/index", {home:allhome});
                 console.log(allhome);
        }
    });
    
});


router.post("/",function(req, res) {
   
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var phone = req.body.phone;
    var Usermessage = req.body.comments;
  


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


module.exports = router;