var express=require('express')
var app=express();
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
var flash=require('connect-flash');
var passport=require('passport');
var LocalStrategy=require('passport-local');
var Camps=require('./models/campground');
var seedDB=require('./seeds');
var Comment=require('./models/comment');
var User=require('./models/user');
var methodOverride=require('method-override');

var campgroundRoutes=require('./routes/campgrounds');
var commentRoutes=require('./routes/comments');
var indexRoutes=require('./routes/index');


// seedDB(); //seeding the database;

mongoose.connect("mongodb://localhost/Camps");

//SCHEMA FROM MODEL DIRECTORY

// var campSchema=new mongoose.Schema({
//     name: String,
//     image: String
// });

// var Camps=mongoose.model("Camp",campSchema);

// Camps.create({ 
//     name: "Shimla", 
//     image: "https://img.traveltriangle.com/blog/wp-content/tr:w-700,h-400/uploads/2017/11/A-bonfire-made-by-the-tents-at-a-campsite-in-Shimla-ss16112017.jpg"
//    },function(err,camp){
//        if(err)
//        console.log(err);
//        else
//        console.log(camp);
//    });

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());


//PASSPORT CONFIGURATION
app.use(require('express-session')({
    secret:"Prashant developed this",
    resave: false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    next();
}); 



app.use("/campground",campgroundRoutes);
app.use("/campground/:id/comments",commentRoutes);
app.use(indexRoutes);


app.listen(3000,function(){
    console.log("Yelpcamp is online now...");
}); 