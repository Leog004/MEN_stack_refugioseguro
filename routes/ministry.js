var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Event = require("../models/event");
var About = require("../models/aboutUs");
var Ministry = require("../models/ministry");
var middleware = require("../middleware");
var nodemailer = require("nodemailer");
const nodemailerSendgrid = require('nodemailer-sendgrid');


router.get("/youth", function(req, res){

        About.find({},function(err,allhome){
        if(err)
            {
                console.log(err);
            }Ministry.find({},function(err, allministry) {
                if(err){
                    
                }
                else{
                     res.render("ministry/youth", {home:allhome, ministry:allministry});
                     console.log(allhome);
            }
            
        });
    });
});



router.get("/children", function(req, res){

        About.find({},function(err,allhome){
        if(err)
            {
                console.log(err);
            }Ministry.find({},function(err, allministry) {
                if(err){
                    
                }
                else{
                     res.render("ministry/children", {home:allhome, ministry:allministry});
                     console.log(allhome);
            }
            
        });
    });
});


router.get("/woman", function(req, res){

        About.find({},function(err,allhome){
        if(err)
            {
                console.log(err);
            }Ministry.find({},function(err, allministry) {
                if(err){
                    
                }
                else{
                     res.render("ministry/woman", {home:allhome, ministry:allministry});
                     console.log(allhome);
            }
            
        });
    });
});



router.post("/woman",function(req, res) {
   
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

//     let transporter = nodemailer.createTransport(
//         {
//                 host: 'smtp.gmail.com',
//                 port: 465,
//                 secure: true, // use SSL
//             auth: {
//                 user: 'leog4za@gmail.com',
//                 pass: 'stevenash1'
//             },
//             logger: false,
//             debug: false // include SMTP traffic in the logs
//         },
//         {
//             // default message fields

//             // sender info
//             from: email,
//         }
//     );


//     // Message object
//     let message = {
//         // Comma separated list of recipients
//         to: 'leog4za@gmail.com',

//         // Subject of the message
//         subject: 'Woman Page | New Message From ' + firstName,

//         // HTML body
//         html:
//             '<p>' + Usermessage + '</p>'
//             + '<p><br>' + firstName
//             + '<br>' + lastName
//             + '<br>' + phone
//             + '<br>' + email + ' </p>',

//     };

//     transporter.sendMail(message, (error, info) => {
//         if (error) {
//             console.log('Error occurred');
//             console.log(error.message);
//             req.flash("error", "Hi, it seems like there was an error.");
//             res.redirect("back");
//             return process.exit(1);
//         }

//         console.log('Message sent successfully!');
//         transporter.close();


//         res.redirect("/");
//     });

// });

const transport = nodemailer.createTransport(
    nodemailerSendgrid({
        apiKey: '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'
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





router.get("/add",middleware.isAdmin, function(req, res){
   res.render("ministry/add");
});


router.get("/praise", function(req, res){

        About.find({},function(err,allhome){
        if(err)
            {
                console.log(err);
            }Ministry.find({},function(err, allministry) {
                if(err){
                    
                }
                else{
                     res.render("ministry/praise", {home:allhome, ministry:allministry});
                     console.log(allhome);
            }
            
        });
        
    });
});






router.post("/praise",function(req, res) {
   
    var Name = req.body.Name;
    var email = req.body.email;
    var Usermessage = req.body.comments;
    
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
        subject: 'Praise Page | New Message From ' + Name,

        // HTML body
        html:
            '<p>' + Usermessage + '</p>'
            + '<p><br>' + Name
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














//EDIT About Us ROUTE

router.get("/:id/edit", middleware.isAdmin, function(req, res) {
    //is user logged in?
            Ministry.findById(req.params.id,function(err,foundHome){
                if(err)
                {
                }else{
                    res.render("ministry/edit",{home: foundHome});
                }
            });
});


//UPDATE About us ROUTES
router.put("/:id", middleware.isAdmin, function(req,res){
    
    
    
    //find and update the correct campground
    Ministry.findByIdAndUpdate(req.params.id, req.body.home, function(err, updatedHome){
        if(err)
        {
            console.log(err);
        }else{
             //redirect somewhere
            res.redirect("/");
        }
    });
    
});




//CREATE - add new Event to DB
router.post("/", middleware.isAdmin, function(req,res){
   var url = req.body.url;
   var title = req.body.title;
   var description = req.body.description;
   var subtitle = req.body.subtitle;
   var paragraph = req.body.paragraph;
   var paragraphSecond = req.body.paragraphSecond;
   var Secondtitle = req.body.Secondtitle;
   var Secondsubtitle = req.body.Secondsubtitle;
   var Secondparagraph = req.body.Secondparagraph;
   var author = {
       id: req.user._id,
       username: req.user.username
   }



   var newMinistry = {url:url, title:title, description:description, subtitle:subtitle, paragraph: paragraph, paragraphSecond:paragraphSecond,Secondtitle:Secondtitle,Secondsubtitle:Secondsubtitle,Secondparagraph:Secondparagraph,author:author}
   
   
   
   //Create a new campground and save to database!
   Ministry.create(newMinistry, function(err,newlyMinistry){
       if(err)
       {
           console.log(err);
       }else{
              //redirect back to page
                res.redirect("/");
       }
   });
  
});





module.exports = router;