const userModel= require('../models/userModel')
const express=require('express')
const jwt =require('jsonwebtoken')
const passport=require('passport')


// User login
const loginController = async(req,res)=>{

    const {email,password}=req.body
 
    try {
        const user= await userModel.findOne({email,password})
        if(!user){
     return res.status(404).send(' Incorrect email or password')
        }

    const payload={
        user:{
            id:user.id
        }
    }  
const token= jwt.sign(payload,'keyword',{expiresIn:'1h'})

res.status(200).json({
    token,
    data:user,
    message:'Login Succesfull'
})
    } catch (error) {
        res.status(500).send('Server Error')
    }}

// Google Login
// const loginGoogle = passport.authenticate('google',{scope:['Profile','email']})

// ...............
const googleController = 
(req,res)=>{
    const payload = {
        user: {
          id: req.user.id,
        }
      }

      const token = jwt.sign(payload, 'keyword', { expiresIn: '1h' });
      res.redirect(`/dashboard?token=${token}`);
}


// register
const registerController=async (req,res)=>{

    const {userId,email,password}=req.body

    try {
        const user= await userModel.findOne({email})
           if(user){
      res.status(400).json(
     {  message:'Email already registered'}
      )
           } else{
        //    creating new user
            const Newuser=new userModel({userId,email,password})
         //    saving the newuser to the database
            await Newuser.save()
       res.status(200).json({
        message:'Registeration successfull'
       })
           }
    } catch (error) {
        console.log(error);
        res.status(500).send(
            'Server Error'
        )
    }
}

module.exports={loginController,registerController,googleController}