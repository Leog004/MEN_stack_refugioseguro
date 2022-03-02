var mongoose = require("mongoose");


var BlogSchema = new mongoose.Schema({
    title: String,
    subTitle: String,
    image: String,
    category: String,
    boldParagraph: String,
    paragraph1: String,
    paragraph2: String,
    qoute: String,    
    qouteAuthor: String,
    paragraph3: String,
    isShowing:{type: Boolean, default: false},
    createdAt: { type: Date, default: Date.now },
    author: {
      id:{
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
      },
      username: String
   },
      comments: [
       
          {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Comment"
          }
        
       ],
       Likes: [
           
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Likes"
            }
           
           ]
    
});


module.exports = mongoose.model("Blog", BlogSchema);



// if(currentUser && currentUser.isAdmin){}   if(comment.author.id.equals(req.user.isadmin)){}