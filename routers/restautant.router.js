const express=require("express");
const { RestaurantModel } = require("../models/restaurant.model");

const restaurantRouter=express.Router();

restaurantRouter.post("/", async(req,res)=>{
    const payload=req.body;
    console.log(payload);
    try{
        const rest=new RestaurantModel(payload);
        await rest.save();
        res.status(201).send({"msg":"Restaurant data added","data":await RestaurantModel.find()});
    }catch(err){
        res.send({"err":"Error adding restaurants data"});
    }
});

restaurantRouter.get("/", async(req,res)=>{
    try{
        const rests=await RestaurantModel.find();
        res.status(200).send(rests);
    }catch(err){
        res.send({"err":"Error fetching restaurants data"});
    }
});

restaurantRouter.get("/:id", async(req,res)=>{
    try{
        const rest=await RestaurantModel.findById(req.params.id);
        res.send(rest);
    }catch(err){
        res.status(200).send({"err":"Error fetching restaurant data"});
    }
});

restaurantRouter.get("/:id/menu", async(req,res)=>{
    try{
        const rest=await RestaurantModel.findById(req.params.id);
        res.send(rest.menu);
    }catch(err){
        res.status(200).send({"err":"Error fetching menu data"});        
    }
});

restaurantRouter.post("/:id/menu", async(req,res)=>{
    const ID=req.params.id;
    const payload=req.body;
    try{
        const rest=await RestaurantModel.findById(ID);
        rest.menu.push(payload);
        res.status(201).send({"msg":"Menu data added in selected Restaurant","data":rest});
    }catch(err){
        res.status(200).send({"err":"Error posting menu data"});        
    }
});

restaurantRouter.delete("/:rid/menu/:mid", async(req,res)=>{
    const {rid,mid}=req.params;
    try{
        const rest=await RestaurantModel.findById(rid);
        let arr=rest.menu;
        const new_menu=arr.filter((elem)=>{
            return elem._id!=mid;
        });
        await RestaurantModel.findByIdAndUpdate(rid,{menu:new_menu});
        // console.log(await RestaurantModel.findById(rid));
        res.status(202).send({"msg":"Menu data deleted","data":await RestaurantModel.findById(rid)});
    }catch(err){
        res.send({"err":"Error deleting menu data"});        
    }
});

module.exports={restaurantRouter};