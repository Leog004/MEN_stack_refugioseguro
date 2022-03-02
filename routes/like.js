var express = require("express");
var router = express.Router({mergeParams:true});
var Blog = require("../models/blog");
var Like = require("../models/Likes");
var middleware = require("../middleware");


//Like CREATE
router.post("/",middleware.isLoggedIn, function(req, res){
      var liked = true;
      var alreadyInserted = false;
   //lookup campground using id
   Blog.findById(req.params.id, function(err, blog) {
       if(err)
       {
           console.log(err);
           res.redirect("back");
       }else{
           Blog.findById(req.params.id).populate("Likes").exec(function(err,foundUser){  
               
               foundUser.Likes.forEach(function(foundUsers){
                    if(foundUsers.author.username == req.user.username ){
                           alreadyInserted = true;
                    }
               });

               if(!alreadyInserted){
                   
                 Like.create(req.body.like, function(err,like){
                      if(err)
                      {
                        req.flash("error", "Something went wrong!");
                          console.log(err);
                      }else{
                          
                        if(req.body.like == undefined){
                             liked = false;
                          }
                          
                          like.author.id = req.user._id;
                          like.author.username = req.user.username;
                          like.Like = liked;
                          like.save();
                          blog.Likes.push(like);
                          blog.save();
                          req.flash("success", "Successfully added Like!");
                          res.redirect("back");
                          console.log(like)
                      }
                      
                 });                  
               }else{
                          console.log("You already Inserted a comment");
                          res.redirect("back");
               }
           });
       }
   });
   
});





module.exports = router;