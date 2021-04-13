const e = require('express');
var express=require('express');
var router=express.Router();
var Camps=require("../models/campground");
var middleware=require('../middleware');

router.get("/", function(req,res){
    console.log(req.user);
    Camps.find({},function(err,allcamps){
        if(err)
        console.log(err);
        else
        res.render("campgrounds/campground",{camps: allcamps});
    });  
});

router.get("/new",middleware.isLoggedIn, function(req,res){
    res.render("campgrounds/new");
});


router.post("/",middleware.isLoggedIn, function(req,res){
    var name=req.body.name;
    var image=req.body.image;
    var desc=req.body.desc;
    var author={
        id:req.user._id,
        username: req.user.username
    };
    var newcamp={name: name, image:image,description:desc,author:author};
    Camps.create(newcamp,function(err,newc){
        if(err)
        console.log(err);
        else
        console.log(newc);
    });
    res.redirect("/campground");
});

router.get("/:id",function(req,res){
    Camps.findById(req.params.id).populate("comments").exec(function(err,foundcamp){
        if(err)
        console.log(err);
        else
        res.render("campgrounds/show",{Camp:foundcamp});
    });
});


//EDIT CAMPGROUND
router.get("/:id/edit",middleware.checkownership,function(req,res){
    Camps.findById(req.params.id,function(err,found){
        if(err){
        req.flash("error","Can't Find the Campground");
          res.redirect("/campground");
        }
        else
        res.render("campgrounds/edit",{campground:found});
    });
});

//UPDATE 
router.put("/:id",middleware.checkownership,function(req,res){
    Camps.findByIdAndUpdate(req.params.id,req.body.camp,function(err,updatecamp){
        if(err){
            req.flash("error","Can't find the campground to update !!!");
            res.redirect("/campground");
        }
        else{
            res.redirect("/campground/"+req.params.id);
        }
    });
});


//DELETE THE POST
router.delete("/:id",middleware.checkownership,function(req,res){
    Camps.findOneAndRemove(req.params.id,function(err){
        if(err){
            req.flash("error","Campground doesn't exist");
            res.redirect("/campground");
        }
        else{
            res.redirect("/campground");
        }
    });
});



module.exports=router;
