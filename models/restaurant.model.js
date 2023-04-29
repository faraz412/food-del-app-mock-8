const mongoose=require("mongoose");

const menuSchema=mongoose.Schema({
    name: {type:String, required:true},
    description: {type:String, required:true},
    price: {type:Number, required:true},
    image: {type:String, required:true}
},{versionKey:false});

// const MenuModel=mongoose.model("menu",menuSchema);

const restaurantSchema=mongoose.Schema({
    name: {type:String, required:true},
    address: {
      street: {type:String, required:true},
      city: {type:String, required:true},
      state: {type:String, required:true},
      country: {type:String, required:true},
      zip: {type:String, required:true}
    },
    menu: [menuSchema]
},{versionKey:false});

const RestaurantModel=mongoose.model("restaurant",restaurantSchema);

module.exports={RestaurantModel};