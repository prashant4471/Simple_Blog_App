var mongooose=require('mongoose');
var commentSchema=mongooose.Schema({
    text: String,
    author: {
        id: {
            type:mongooose.Schema.Types.ObjectId,
            ref: "User"
        },
        username:String
    }
});

module.exports=mongooose.model("Comment",commentSchema);