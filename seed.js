var mongoose = require("mongoose");
// var Topic = require("./models/topic");
// var Comment = require("./models/comment");
var Event = require("./models/event");
var Home = require("./models/aboutUs");

var data = [
    
        {      
            title: "Children Ministry",
            subTitle: "",
            paragraph: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis egestas rhoncus. Donec facilisis fermentum sem, ac viverra.",
            subParagraph: "",
            description: "",
            username: "Leog4"
        }
    ]

function seedDB(){
    
    // Comment.remove({}, function(err){
    //     console.log("removed comments!");
    // });
    
    
    // // //REMOVE ALL CAMPGROUNDS
    //  Event.remove({}, function(err){
    //      console.log("removed topic!");
    // });
        
    
    
            //ADD A FEW CAMPGROUNDS
        
        data.forEach(function(seed){
            
                Home.create(seed, function(err,event){
                if(err)
                {
                    console.log(err);
                }else{
                    console.log("Added Event");
                    event.save();
                }
            });
            
        });

}

module.exports = seedDB;