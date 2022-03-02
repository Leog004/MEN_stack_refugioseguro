var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var About = require("../models/aboutUs");
var Sermon = require("../models/sermon");
var middleware = require("../middleware");





router.get("/" ,function(req,res){
    
    
    About.find({}, function(err, allhome){
        
       Sermon.find({},function(err,allsermon){
           
          if(err){
              
          } else{
              res.render("sermon/index",{home:allhome,sermon:allsermon});
          }
           
       });
    });
});




//EDIT About Us ROUTE

router.get("/:id/edit", middleware.isAdmin, function(req, res) {
    //is user logged in?
            Sermon.findById(req.params.id,function(err,allsermon){
                if(err)
                {
                }else{
                    res.render("sermon/edit",{sermon: allsermon});
                }
            });
});


router.get("/new",middleware.isAdmin,  function(req, res){

res.render("sermon/add");
    
});


router.post("/", middleware.isAdmin, function(req,res){
   var Videourl = req.body.Videourl;
   var title = req.body.title;
   var qoute = req.body.qoute;
   var preaching = req.body.preaching;
   var paragraph = req.body.paragraph;
   var author = {
       id: req.user._id,
       username: req.user.username
   }



   var newSermon = {Videourl:Videourl, title:title, qoute:qoute, preaching: preaching, paragraph:paragraph,author:author}
   
   
   
   //Create a new campground and save to database!
   Sermon.create(newSermon, function(err,newlySermon){
       if(err)
       {
           console.log(err);
       }else{
              //redirect back to page
                res.redirect("/");
       }
   });
  
});



//UPDATE About us ROUTES
router.put("/:id", middleware.isAdmin, function(req,res){
    
    
    
    //find and update the correct campground
    Sermon.findByIdAndUpdate(req.params.id, req.body.sermon, function(err, updatedSermon){
        if(err)
        {
            console.log(err);
        }else{
             //redirect somewhere
            res.redirect("/");
        }
    });
    
});







module.exports = router;


