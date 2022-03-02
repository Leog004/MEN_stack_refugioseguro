var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Event = require("../models/event");
var About = require("../models/aboutUs");
var middleware = require("../middleware");



router.get("/", function(req, res){

        About.find({},function(err,allhome){
        if(err)
            {
                console.log(err);
            }else{
                     res.render("about/index", {home:allhome});
                     console.log(allhome);
            }
        
    });
});


//EDIT About Us ROUTE

router.get("/:id/edit", middleware.isAdmin, function(req, res) {
    //is user logged in?
            About.findById(req.params.id,function(err,foundHome){
                if(err)
                {
                }else{
                    res.render("about/edit",{home: foundHome});
                }
            });
});






router.get("/new",middleware.isAdmin,  function(req, res){

res.render("about/add");
    
});


//=================================
        // AUTH ROUTES // 
//=================================

//CREATE - add new Event to DB
router.post("/", middleware.isAdmin, function(req,res){
   var url = req.body.url;
   var title = req.body.title;
   var subtitle = req.body.subTitle;
   var paragraph = req.body.paragraph;
   var paragraphSecond = req.body.paragraphSecond;
   var Secondtitle = req.body.Secondtitle;
   var Secondsubtitle = req.body.Secondsubtitle;
   var Secondparagraph = req.body.Secondparagraph;
   var author = {
       id: req.user._id,
       username: req.user.username
   }



   var newAbout = {url:url, title:title, subtitle:subtitle, paragraph: paragraph, paragraphSecond:paragraphSecond,Secondtitle:Secondtitle,Secondsubtitle:Secondsubtitle,Secondparagraph:Secondparagraph,author:author}
   
   
   
   //Create a new campground and save to database!
   About.create(newAbout, function(err,newlyAbout){
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
    About.findByIdAndUpdate(req.params.id, req.body.home, function(err, updatedHome){
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