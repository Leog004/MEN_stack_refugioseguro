var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Event = require("../models/event");
var About = require("../models/aboutUs");
var Ministry = require("../models/ministry");
var Blog = require("../models/blog");
var middleware = require("../middleware");




router.get("/", function(req,res){
    About.find({},function(err,allhome){
        
        if(err){
            
        }else{
            res.render("gallery/index", {home:allhome});
        }
        
        
    });
   
});




















module.exports = router;