const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
    address:{
        building:{
            type: Number
        },
        street:{
            type: String,
            required: true
        },
        zipcode:{
            type: Number
        }
    },
    city:{
        type: String,
        required: true
    },
    cuisine:{
        type:String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    restaurant_id:{
        type: Number,
        required: true,
        unique: [true, "id already exist"]
    }
})

//Create model
const Restaurant = mongoose.model("Restaurant", RestaurantSchema);
module.exports = Restaurant;