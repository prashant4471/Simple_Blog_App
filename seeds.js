var mongooose=require('mongoose'),
    Camps=require('./models/campground'),
    Commment=require('./models/comment');


var data=[
    {
        name:"Lake Side",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQQVCX4-XXi84Hfvqvu4lFMoNXb0YOZLSirFg&usqp=CAU"
    },
    {
        name:"Mountain Side",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ6Jqt-ayCa--3TJ5SmGoyts8jXlmlEpro42g&usqp=CAU"
    },
    {
        name:"Water Park",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQtIkmYyz_zlIDdo4krOu48MVSOSTZue5_RYQ&usqp=CAU"
    }
]

function seedDB(){
    Camps.remove({},function(err){
        if(err)
          console.log(err);
        console.log("Removed All the Camps");
    //     data.forEach(function(seed){
    //         Camps.create(seed,function(err,campground){
    //             if(err)
    //               console.log(err);
    //             else{
    //                 console.log("Added a new Campground")
    //                 Commment.create({
    //                     text:"This is just a dummy commment",
    //                     author:"Jack Michaelson"
    //                 },function(err,comment){
    //                     if(err)
    //                       console.log(err);
    //                     else
    //                       campground.comments.push(comment);
    //                       campground.save();
    //                       console.log("Comment Added Successfully");
    //                 })
    //             }
    //         })
    //     })
    })
};

module.exports=seedDB;