var mongoose = require("mongoose");


var MinistrySchema = new mongoose.Schema({
    url : String,
    title: String,
    description: String,
    subtitle: String,
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


module.exports = mongoose.model("Ministry", MinistrySchema);



// if(currentUser && currentUser.isAdmin){}   if(comment.author.id.equals(req.user.isadmin)){}