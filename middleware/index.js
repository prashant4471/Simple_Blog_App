var Camps=require("../models/campground");
var Comment=require("../models/comment");

var middlewareObj={};

middlewareObj.checkcommentownership=function(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err,found){
            if(err){
                req.flash("error","Comment not found !!!");
                res.redirect("back");
            }
            else{
                if(found.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    req.flash("error","You don't have permission !!!");
                    res.redirect("back");
                }
            }
        });
    }
    else{
        req.flash("error","Please Login First !!!");
        res.redirect("back");
    }
}


middlewareObj.isLoggedIn=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","Please Login first !!!");
    res.redirect("/login");
}


middlewareObj.checkownership=function(req,res,next){
    if(req.isAuthenticated()){
        Camps.findById(req.params.id,function(err,found){
            if(err){
                req.flash("error","Campground Not Found !!")
                res.redirect("back");
            }
            else{
                if(found.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    req.flash("error","You don't have the permission !!!")
                    res.redirect("back");
                }
            }
        });
    }
    else{
        req.flash("error","Please Login first !!!")
        res.redirect("back");
    }
}



module.exports=middlewareObj;
