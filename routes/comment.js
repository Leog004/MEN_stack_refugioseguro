var express = require("express");
var router = express.Router({mergeParams:true});
var Blog = require("../models/blog");
var Comment = require("../models/comment");
var middleware = require("../middleware");


//==================================================================//
// COMMENTS ROUTES
//=================================================================//


//COMMENT NEW
router.get("/new",middleware.isLoggedIn,function(req, res) {
    
    //Find Campground by Id
    
    Blog.findById(req.params.id, function(err,topic){
        
        if(err || !topic){
          req.flash("error", "Topic not found!"); 
          res.redirect("back");
        }else{
            res.render("comments/new",{topic:topic});
        }
    });
});


//COMMENT CREATE
router.post("/",function(req, res){
   //lookup campground using id
   Blog.findById(req.params.id, function(err, blog) {
       if(err)
       {
           console.log(err);
           res.redirect("back");
       }else{
           Comment.create(req.body.comment, function(err,comment){
              if(err)
              {
                req.flash("error", "Something went wrong!");
                  console.log(err);
              }else{
                  
                  if(req.isAuthenticated()){
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.author.isAdmin = req.user.isAdmin;
                  }else{
                      comment.author.id = "5c6c6e296cdb870d60bd0e96";
                      comment.author.username = "Anonymous";
                  }
                  //add username and id to comment

                  comment.save();
                  blog.comments.push(comment);
                  blog.save();
                  req.flash("success", "Successfully added comment!");
                  res.redirect("back");
              }
              
           });
       }
   });
   
});



//COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
    Blog.findById(req.params.id,function(err, foundCampground) {
        if(err || !foundCampground)
        {
            req.flash("error", "Can not find topic!");      
            return res.redirect("back");
        }
           Comment.findById(req.params.comment_id,function(err, foundComment) {
              if(err)
              {
                  res.redirect("back");
              }else{
                   
                  res.render("comments/edit",{campground_id: req.params.id, comment:foundComment});
                  
              }
               
        });
    });
});




//COMMENT UPDATE
router.put("/:comment_id",middleware.checkCommentOwnership, function(req,res){

    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updateComment){
        if(err)
        {
            res.redirect("back");
        }else{
            req.flash("success", "Comment Updated!");
            res.redirect("/blogs/" + req.params.id);
        }
    });
    
});





//COMMENT DESTROY ROUTE
router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res){
   //findByIdAndRemove
   Comment.findByIdAndRemove(req.params.comment_id,function(err){
       if(err)
       {
           res.redirect("back");
       }else{
            
            Blog.update({
                    comments: req.params.comment_id
                }, {
                    $pull: {
                        comments: req.params.comment_id
                    }
                }).then((updatedDoc) => { console.log(updatedDoc)});
     
            
            req.flash("success", "Comment deleted!");
            res.redirect("back");
       }
   });
});



module.exports = router;