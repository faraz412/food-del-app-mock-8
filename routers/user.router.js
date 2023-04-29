const express=require("express");
const bcrypt=require("bcrypt");
const { UserModel } = require("../models/user.model");

const userRouter=express.Router();

userRouter.patch("/:id/reset",async(req,res)=>{
    const {cur_pass,new_pass}=req.body;
    const ID=req.params.id;
    try{
        const user=await UserModel.findById(ID);
        bcrypt.compare(cur_pass,user.password,(err,result)=>{
            if(result){
                bcrypt.hash(new_pass,7,async(err,hash)=>{
                    if(hash){
                        await UserModel.findByIdAndUpdate(ID,{password:hash});
                        res.status(204).send({"msg":"Password updated"});
                    }else{
                        res.send({"err":"Bcrypt hash error"});
                    }
                });
            }else{
                res.send({"msg":"Password verification failed"});
            }            
        });      
    }catch(err){
        res.send({"err":"Password reset error"});
    }
})

module.exports={userRouter};