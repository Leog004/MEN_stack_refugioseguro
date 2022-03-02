var mongoose = require("mongoose");


var LikesSchema = mongoose.Schema({
   
   Like: String,
   createdAt: { type: Date, default: Date.now },
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String,
      isAdmin: Boolean
   }
});

module.exports = mongoose.model("Likes", LikesSchema);