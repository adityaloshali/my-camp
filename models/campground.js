var mongoose = require("mongoose");

// schema set up
var campgroundSchema = new mongoose.Schema({
    name: String,
    price: String,
    image: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,              //reference to User model
            ref: "User"
        }, 
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,              //reference to comment model
            ref: "Comment"
        }
    ]
});

// create campground model using the schema and export it
module.exports = mongoose.model("Campground", campgroundSchema);

