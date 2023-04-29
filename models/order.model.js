const mongoose=require("mongoose");

const orderSchema=mongoose.Schema({
    user: {type:String, required:true},
    restaurant: {type:String, required:true},
    items:[{
        name: {type:String, required:true},
        price: {type:Number, required:true},
        quantity: {type:Number, required:true}
    }],
    totalPrice: {type:Number, required:true},
    deliveryAddress: {
        street: {type:String, required:true},
        city: {type:String, required:true},
        state: {type:String, required:true},
        country: {type:String, required:true},
        zip: {type:String, required:true}
    },
    status: {type:String, required:true}
},{versionKey:false});

const OrderModel=mongoose.model("order",orderSchema);

module.exports={OrderModel};