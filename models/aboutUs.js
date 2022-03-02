var mongoose = require("mongoose");


var HomeSchema = new mongoose.Schema({
    url : String,
    title: String,
    subTitle: String,
    paragraph: String,
    paragraphSecond: String,
    Secondtitle: String,
    Secondsubtitle: String,
    Secondparagraph: String,
    createdAt: { type: Date, default: Date.now },
    author: {
      id:{
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
      },
      username: String
   }
    
});


module.exports = mongoose.model("About", HomeSchema);



// if(currentUser && currentUser.isAdmin){}   if(comment.author.id.equals(req.user.isadmin)){}