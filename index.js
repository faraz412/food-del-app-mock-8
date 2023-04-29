const express=require("express");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
require("dotenv").config();

const {connection}=require("./config/db.js");
const { UserModel } = require("./models/user.model.js");
const { userRouter } = require("./routers/user.router.js");
const { restaurantRouter } = require("./routers/restautant.router.js");
const { orderRouter } = require("./routers/order.router.js");

const app=express();
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Welcome to Food delivery app home app");
});

app.post("/register",async(req,res)=>{
    const {name,email,password,address}=req.body;
    try{
        const check=await UserModel.find({email});
        if(check.length>0){
            res.send({"msg":"Please Login"});
        }else{
            bcrypt.hash(password,7,async(err,hash)=>{
                if(hash){
                    const user=new UserModel({name,email,password:hash,address});
                    await user.save();
                    res.status(201).send({"msg":"Successfully Registered"});                   
                }else{
                    res.send({"err":"Bcrypt hash error"});
                }
            });
        }
    }catch(err){
        res.send({"Registration error":err});
    }
});

app.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await UserModel.find({email});
        if(user.length==0){
            res.send({"msg":"Wrong Credentials"});
        }else{
            bcrypt.compare(password,user[0].password,(err,result)=>{
                if(result){
                    const token=jwt.sign({userID:user[0]._id},process.env.key);
                    res.status(201).send({"msg":"Login Successfull",token});
                }else{
                    res.send({"err":"Bcrypt compare error"});
                }
            })
        }
    }catch(err){
        res.send({"Login error":err});
    }
});

app.use("/user",userRouter);
app.use("/restaurants",restaurantRouter);
app.use("/orders",orderRouter);

app.listen(process.env.port,async(req,res)=>{
    try{
        await connection;
        console.log("Connected to DB");
    }catch(err){
        console.log("Error connecting to DB:",err);
    }
    console.log(`Listening on port ${process.env.port}`);
})