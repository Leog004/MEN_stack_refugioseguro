var mongoose = require("mongoose");


var EventSchema = new mongoose.Schema({
    title: String,
    image: String,
    discription: String,
    subDiscription: String,
    preaching: String,
    day: String,
    month: String,
    monthDay: String,
    time: String,
    address: String,
    dateOfEvent: { type: Date, default: Date.now },
    category: String,
    isShowing:{type: Boolean, default: false},
    createdAt: { type: Date, default: Date.now },
    author: {
      id:{
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
      },
      username: String
   }
    
});


module.exports = mongoose.model("Event", EventSchema);



// if(currentUser && currentUser.isAdmin){}   if(comment.author.id.equals(req.user.isadmin)){}