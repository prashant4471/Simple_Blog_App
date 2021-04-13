var express=require('express');
var router=express.Router({mergeParams: true});
var Camps=require("../models/campground");
var Comment=require("../models/comment");
var middleware=require('../middleware');


router.get("/new",middleware.isLoggedIn, function(req,res){
    Camps.findById(req.params.id,function(err,camp){
        if(err)
          console.log(err);
        else
        res.render("comments/new",{camp:camp});  
    });
});

router.post("/",middleware.isLoggedIn, function(req,res){
    Camps.findById(req.params.id,function(err,camp){
        if(err)
          console.log(err);
        else{
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                  req.flash("error","Something went wrong !!!");
                  console.log(err);
                }
                else{
                    comment.author.id=req.user._id;
                    comment.author.username=req.user.username;
                    comment.save();
                    camp.comments.push(comment);
                    camp.save();
                    req.flash("success","Comment added successfully !!!");
                    res.redirect('/campground/'+camp._id);
                }
            });
        }
    });
});

//EDIT ROUTE
router.get("/:comment_id/edit",middleware.checkcommentownership,function(req,res){
    Comment.findById(req.params.comment_id,function(err,foundcomment){
        if(err){
            res.render("back");
        }
        else{
            res.render("comments/edit",{camp_id:req.params.id,comment:foundcomment});
        }
    });
});


//UPDATE COMMENT
router.put("/:comment_id",middleware.checkcommentownership,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedcomm){
        if(err){
            req.flash("error","Something went wrong !!!");
            res.redirect("back");
        }
        else{
            res.redirect("/campground/"+req.params.id);
        }
    });
});



//DELETE COMMENT
router.delete("/:comment_id",middleware.checkcommentownership,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
            res.redirect("back");
        }
        else{
            req.flash("success","Successfully deleted comment !!!");
            res.redirect("/campground/"+req.params.id);
        }
    });
});


module.exports=router;
 