var mongoose = require("mongoose");


var SermonSchema = new mongoose.Schema({
    Videourl : String,
    title: String,
    qoute: String,
    preaching: String,
    paragraph: String,
    createdAt: { type: Date, default: Date.now },
    author: {
      id:{
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
      },
      username: String
   }
    
});


module.exports = mongoose.model("Sermon", SermonSchema);