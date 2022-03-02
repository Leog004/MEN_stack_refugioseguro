//all the middleware goes here
var Event = require("../models/event");
var Comment = require("../models/comment");
var middlewareOBJ = {};


middlewareOBJ.checkCampgroundOwnerShip = function(req,res,next){
        //is user logged in?
        if(req.isAuthenticated()){
            Event.findById(req.params.id,function(err,foundevent){
                if(err || !foundevent)
                {
                    req.flash("error", "Event not found!");                    
                    res.redirect("back");
                }else{
                                        //does user own campground?
                          if(foundevent.author.id.equals(req.user._id) || req.user.isAdmin)
                          { 
                              next();
                          }else{
                            res.redirect("back");
                          }
                    }
            });
                //if not, redirect
        }else{
            req.flash("error", "You need to be logged in to do that!");
            res.redirect("back");
        }

}


middlewareOBJ.isAdmin = function(req,res,next){
    
        if(req.isAuthenticated()){
            
            if(req.user.isAdmin){
                 return next();
            }else{
                req.flash("error","You need to be an Admin!");
                res.redirect("/"); 
            }
            
       
    }else{
          req.flash("error","You need to be logged in to do that!");
         res.redirect("/login"); 
    }
    

    
}


middlewareOBJ.checkCommentOwnership = function(req,res,next){
        //is user logged in?
        if(req.isAuthenticated()){
            Comment.findById(req.params.comment_id,function(err,foundComment){
                if(err || !foundComment)
                {
                    req.flash("error", "Comment not found!");
                    res.redirect("back");
                }else{
                                        //does user own comment?
                  if(foundComment.author.id.equals(req.user._id) || req.user.isAdmin)
                  {           
                      next();
                  }else{
                    req.flash("error", "You don't have permission to do that!");
                    res.redirect("back");
                  }
                    }
            });
                //if not, redirect
        }else{
            req.flash("error", "You need to be logged in to do that!");
            res.redirect("back");
        }

}



middlewareOBJ.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    
    req.flash("error","You need to be logged in to do that!");
    res.redirect("/login");
}

module.exports = middlewareOBJ;