const express = require('express');
const bcrypt=require("bcryptjs")
const User= require("../models/User")
const router= express.Router();
const jwt=require("jsonwebtoken")

const app=express();

router.post('/signup',async (req,res)=>{
    res.set('Access-Control-Allow-Origin', '*');
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    const {Fullname,email,phonenumber,password}=req.body

    if(!Fullname|| !email|| !phonenumber|| !password){
        return res.json({error:"Please fill the details properly"})
    }

    try{
        const userExist=  await User.findOne({email:email})
        console.log(Fullname)

        if (userExist){
            return res.status(422).json({error:"Email already exists"})
        }
        const user = new User({Fullname,email,phonenumber,password});

        await user.save()
        

        res.status(201).json({message:"Registration Successful"});
    

    } catch(err){
        console.log(err)
        
    }




    })


    // login route
    router.post('/signin', async (req,res)=>{
        try{
            
            const {Fullname,password}= req.body;

            if(!Fullname|| !password){
                return res.status(400).json({error:"Please fill the data"})
            }

            const userLogin= await User.findOne({Fullname:Fullname});

            if(userLogin){
                const isMatch= await bcrypt.compare(password,userLogin.password)

                const token = await userLogin.generateAuthToken();
                

                res.cookie("jwtoken",token,{
                    expires:new Date(Date.now()+27987000000),
                    httpOnly:true

                });

            if(!isMatch){
                res.status(400).json({error:"Invalid User Credentials"})
            } else{
                res.json({message:"User Signed In"})
            }
            }else{
                res.status(400).json({error:"Invalid User"})

            }

        }catch(err){
            console.log(err)

        }

    });

module.exports= router;
