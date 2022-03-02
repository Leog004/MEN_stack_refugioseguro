var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    User = require("./models/user"),
    Event = require("./models/event"),
    Ministry = require("./models/ministry"),
    About = require("./models/aboutUs"),
    Blog = require("./models/blog"),
    Comment = require("./models/comment"),
    Sermon = require("./models/sermon"),
    Likes = require("./models/Likes"),
    Subscribers = require("./models/subscribers"),
    helmet = require("helmet"),
    mongoSanitize = require("express-mongo-sanitize"),
    xss = require("xss-clean"),
    seedDB = require("./seed");
    //seedDB = require("./seedemailblast");
    app.locals.moment = require('moment');
    const cors = require('cors');
    
    var fileUpload = require('express-fileupload');

    
    
    var indexRoutes = require("./routes/index"),
        blogRoutes = require("./routes/blog"),
        galleryRoutes = require("./routes/gallery"),
        aboutRoutes = require("./routes/about"),
        sermonRoutes = require("./routes/sermon"),
        donateRoutes = require("./routes/donate"),
        contactRoutes = require("./routes/contact"),
        ministryRoutes = require("./routes/ministry"),
        commentRoutes = require("./routes/comment"),
        LikeRoutes = require("./routes/like"),
        eventRoutes = require("./routes/event");




//mongoose.connect("mongodb://localhost/RefugioSeguro",{ useNewUrlParser: true });
mongoose.connect("",{ useNewUrlParser: true }).catch(err => {console.log(err)});
app.enable('trust proxy');
app.use(helmet());
app.use(cors());
app.options('*', cors());
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.use(fileUpload());

//seedDB();
//console.log("ho");
// Data sanitization against noSQL query injection
app.use(mongoSanitize());

// Data sanitization aganst XSS 
app.use(xss());

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




app.use(function(req,res,next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});


app.use (function (req, res, next) {
    if (req.secure) {
            // request was via https, so do no special handling
            next();
    } else {
            // request was via http, so redirect to https
            res.redirect('https://' + req.headers.host + req.url);
    }
});


app.use(indexRoutes);
app.use("/about", aboutRoutes);
app.use("/ministry",ministryRoutes);
app.use("/events",eventRoutes);
app.use("/contact",contactRoutes);
app.use("/blogs",blogRoutes);
app.use("/blogs/:id/comments",commentRoutes);
app.use("/blogs/:id/likes",LikeRoutes);
app.use("/gallery",galleryRoutes);
app.use("/donate",donateRoutes);
app.use("/sermon",sermonRoutes);





app.get("*", function(req,res){
    
    Event.find({},function(err,allevents){
        if(err){
            console.log(err)
        }
        
       About.find({},function(err,allhome){
           
            if(err){
                
            }else{
                 res.render("notFound",{event:allevents, home:allhome});
            }
       });
        
    });
   

    
});


app.post("/subscriber", function(req,res){
    
    var email = req.body.email;
    
    var newSubscribers = {email:email}
    
    Subscribers.create(newSubscribers, function(err,newlySubscribers){
        if(err){
            console.log(err);
        }else{
            console.log(email);
            res.redirect("/");
        }
    });
    
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("RefugioSeguro is connected!"); 
});

