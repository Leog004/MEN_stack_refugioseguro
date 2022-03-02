var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Event = require("../models/event");
var About = require("../models/aboutUs");
var Ministry = require("../models/ministry");
var Blog = require("../models/blog");
var middleware = require("../middleware");
var Likes = require("../models/Likes");



router.get("/", function(req,res){
    
    Blog.find({}, null, {sort: {createdAt: -1}},function(err, allblogs) {
    if(err){
        
    }
    About.find({},function(err, allhome) {
        if(err){
            
        }else{
            res.render("blogs/index",{home:allhome, blog:allblogs});
            //console.log(allblogs)
        }
        });
    });
});



router.get("/new",middleware.isAdmin,  function(req, res){

res.render("blogs/new");
    
});

router.post("/", middleware.isAdmin, function(req,res){
    var title = req.body.title;   
    var subTitle = req.body.subTitle;
    var image = req.body.image;
    var category = req.body.category; 
    var boldParagraph = req.body.boldParagraph;
    var paragraph1 = req.body.paragraph1;
    var paragraph2 = req.body.paragraph2;
    var qoute = req.body.qoute;
    var qouteAuthor = req.body.qouteAuthor;
    var paragraph3 = req.body.paragraph3;
    var author = {
       id: req.user._id,
       username: req.user.username
   }



   var newBlog = {title:title,subTitle:subTitle, image:image, category:category,boldParagraph:boldParagraph, paragraph1:paragraph1, paragraph2:paragraph2,qoute:qoute,qouteAuthor:qouteAuthor, paragraph3:paragraph3  ,author:author}
   
   
   
   //Create a new campground and save to database!
   Blog.create(newBlog, function(err,newlyBlog){
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

    Blog.findById(req.params.id).populate("comments").exec(function(err,foundblog){
        if(err || !foundblog)
        {
            req.flash("error","Campground not found");
            res.redirect("back");
        }Blog.findById(req.params.id).populate("Likes").exec(function(err,foundLikes){
            if(err){
                
            }About.find({},function(err,allhome){
        if(err)
            {
                console.log(err);
            }Event.find({},function(err,allevents){
        if(err)
            {
                console.log(err);
            }else{
                     res.render("blogs/show", {blog: foundblog,home:allhome,events:allevents, like:foundLikes});
                     //console.log(allhome,foundblog);
            }
        
                });
            });
        });
    });
});


router.get("/:id/edit", middleware.isAdmin, function(req, res) {
    //is user logged in?
            Blog.findById(req.params.id,function(err,foundBlog){
                if(err)
                {
                }else{
                    res.render("blogs/edit",{blog: foundBlog});
                }
            });
});


//UPDATE Event ROUTES
router.put("/:id", middleware.isAdmin, function(req,res){
    
    
    
    //find and update the correct campground
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err)
        {
            console.log(err);
        }else{
             //redirect somewhere
            res.redirect("/blogs/" + req.params.id);
        }
    });
    
});


//DESTROY Event ROUTE
router.delete("/:id", middleware.isAdmin, function(req,res){

    Blog.findByIdAndRemove(req.params.id,function(err){
        if(err)
        {
            res.redirect("/");
        }else{
            res.redirect("/blogs");
        }
    })
});










module.exports = router;