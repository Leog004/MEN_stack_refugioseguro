var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Event = require("../models/event");
var About = require("../models/aboutUs");
var middleware = require("../middleware");
var nodemailer = require("nodemailer");


//setting up the route | Getting the landing page


router.get("/", function(req, res){

    Event.find({}, null, {sort: {dateOfEvent: 1}},function(err,allevents){
        if(err)
        {
            console.log(err);
        }About.find({},function(err,allhome){
        if(err)
            {
                console.log(err);
            }else{
                     res.render("events/index", {event:allevents,home:allhome});
                     console.log(allhome,allevents);
            }
        
    });
        
        
    });
    
});


router.get("/new",middleware.isAdmin,  function(req, res){

res.render("events/new");
    
});


//=================================
        // AUTH ROUTES // 
//=================================

//CREATE - add new Event to DB
router.post("/", middleware.isAdmin, function(req,res){
   var title = req.body.title;
   var image = req.body.image;
   var discription = req.body.description;
   var subDiscription = req.body.subDiscription;
   var preaching = req.body.preaching;
   var day = req.body.day;
   var month = req.body.month;
   var monthDay = req.body.monthDay;
   var time = req.body.time;
   var address = req.body.address;
   var category = req.body.category;
   var dateOfEvent = req.body.dateOfEvent;
   var author = {
       id: req.user._id,
       username: req.user.username
   }



   var newEvent = {title:title, image:image, discription:discription, subDiscription: subDiscription, preaching:preaching,day:day,month:month,monthDay:monthDay,time:time,address:address,category:category,dateOfEvent:dateOfEvent,author:author}
   
   
   
   //Create a new campground and save to database!
   Event.create(newEvent, function(err,newlyevent){
       if(err)
       {
           console.log(err);
       }else{
              //redirect back to page
                res.redirect("/");
       }
   });
  
});



//SHOW - shows more info of the event!
router.get("/:id",function(req, res) {
    //find the campground with provided Id

    Event.findById(req.params.id).exec(function(err,foundevent){
        if(err || !foundevent)
        {
            req.flash("error","Campground not found");
            res.redirect("back");
        }About.find({},function(err,allhome){
        if(err)
            {
                console.log(err);
            }Event.find({},function(err,allevents){
        if(err)
            {
                console.log(err);
            }else{
                     res.render("events/show", {event: foundevent,home:allhome,events:allevents});
                     console.log(allhome,foundevent);
            }
        
            });

        });
    });
});


router.post("/show",function(req, res) {
   
    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var email = req.body.email;
    var phone = req.body.phone;
    var Usermessage = req.body.message;
    
    // console.log(req.body.user.firstName);
    // console.log(req.body.user.lastName);
    // console.log(req.body.user.email);
    // console.log(req.body.user.message);
    
    


 
//  const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//              type: 'OAuth2',
//              user: 'leog4za@gmail.com',
//              clientId:'796367372226-6ock5m044rk3cp0q67anf60o0eos0qtd.apps.googleusercontent.com',
//              clientSecret: 'LcMZpwlecw-TKJTCKk486R_d',
//              refreshToken: '1/iu3e6yne-7ZwlJlNRupeErwQtQYKFK4Qqa-Y2KR9Xq8',
//              accessToken: 'ya29.GlvjBnzWSN_faUzvYVcNetk3DIDFO1kyv7hQwr8nwnVyIfhgS4GaVfjrMs2oDtUxxFp6U2G5YSgyPT3Js5bAnJ1dZHcUU1vqfdSdzmGnDuJ3Kpa9DbydWqH0Ryzo'
//   },
// });

    let transporter = nodemailer.createTransport(
        {
                host: 'smtp.gmail.com',
                port: 465,
                secure: true, // use SSL
            auth: {
                user: 'leog4za@gmail.com',
                pass: 'stevenash1'
            },
            logger: false,
            debug: false // include SMTP traffic in the logs
        },
        {
            // default message fields

            // sender info
            from: email,
        }
    );


    // Message object
    let message = {
        // Comma separated list of recipients
        to: 'leog4za@gmail.com',

        // Subject of the message
        subject: 'Event Page | New Message From ' + firstName,

        // HTML body
        html:
            '<p>' + Usermessage + '</p>'
            + '<p><br>' + firstName
            + '<br>' + lastName
            + '<br>' + phone
            + '<br>' + email + ' </p>',

    };

    transporter.sendMail(message, (error, info) => {
        if (error) {
            console.log('Error occurred');
            console.log(error.message);
            req.flash("error", "Hi, it seems like there was an error.");
            res.redirect("back");
            return process.exit(1);
        }

        console.log('Message sent successfully!');
        transporter.close();


        res.redirect("/");
    });

});

//EDIT EVENT ROUTE

router.get("/:id/edit", middleware.isAdmin, function(req, res) {
    //is user logged in?
            Event.findById(req.params.id,function(err,foundEvent){
                if(err)
                {
                }else{
                    res.render("events/edit",{event: foundEvent});
                }
            });
});



//UPDATE Event ROUTES
router.put("/:id", middleware.isAdmin, function(req,res){
    
    
    
    //find and update the correct campground
    Event.findByIdAndUpdate(req.params.id, req.body.event, function(err, updatedEvent){
        if(err)
        {
            console.log(err);
        }else{
             //redirect somewhere
            res.redirect("/events/" + req.params.id);
        }
    });
    
});


//DESTROY Event ROUTE
router.delete("/:id", middleware.isAdmin, function(req,res){

    Event.findByIdAndRemove(req.params.id,function(err){
        if(err)
        {
            res.redirect("/");
        }else{
            res.redirect("/events");
        }
    })
});


module.exports = router;