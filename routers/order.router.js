const express=require("express");
const {authenticate}=require("../middlewares/authenticate.mw.js");
const { OrderModel } = require("../models/order.model.js");

const orderRouter=express.Router();

orderRouter.post("/",authenticate, async(req,res)=>{
    const {items,deliveryAddress,userID,restaurantID}=req.body;

    const totalPrice=items.reduce((acc,elem)=>{
        acc+=(elem.price*elem.quantity);
        return acc;
    },0);

    const status="placed";

    try{
        const order=new OrderModel({
            user:userID,
            restaurant:restaurantID,
            items,
            totalPrice,
            deliveryAddress,
            status
        });
        await order.save();
        res.status(201).send({"msg":"order placed","data":await OrderModel.find()});
    }catch(err){
        // console.log(err);
        res.send({"msg":"Error in placing Order"});
    }
});

orderRouter.get("/:id",authenticate,async(req,res)=>{
    try{
        const order=await OrderModel.findById(req.params.id);
        res.status(200).send(order);
    }catch(err){
        res.send({"msg":"Error in fetching order details"});
    }
})

orderRouter.patch("/:id",async(req,res)=>{
    const status=req.body.status;
    try{
        const order=await OrderModel.findByIdAndUpdate(req.params.id,{status});
        res.status(204).send({"msg":"Order status updated"});
    }catch(err){
        res.send({"msg":"Error in updating order status"});
    }
})

module.exports={orderRouter};
