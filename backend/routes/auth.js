const express=require('express')
const router=express.Router()
const User=require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const  jwt = require('jsonwebtoken');
var fetchuser=require('../middleware/fetchUser')
const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET=process.env.jwtSecret

 // Route 1 :create user 

router.post('/createuser',[
    body('name').isLength({min:3}),
    body("email").isEmail(),
    body("password").isLength({min:5})
],async(req,res)=>{
   let success=false
   const errors= validationResult(req)
   if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()})
   }
   try {
    
    
   let user= await User.findOne({email:req.body.email})
   if (user){
         return res.status(400).json({success,error:"Sorry user exists with this email"})
   }
   const salt=await bcrypt.genSalt(10);
   const secPass=await bcrypt.hash(req.body.password,salt);

   user= await User.create({
    name:req.body.name,
    email:req.body.email,
    password:secPass
  })
//    .then(user => res.json(user))
//    .catch(err=>console.log(err))
// //    res.send(req.body)
const data={
   user:{
      id:user.id
   }
}
 const authToken=jwt.sign(data,JWT_SECRET)
//  console.log(authToken)
 success=true
 res.json({success,authToken})
//  res.json(user)
}
 catch (error) {
    console.error(error.message)
    res.status(500).send("some error occured");
   }
})

//Route 2 : authenticate user i.e login

router.post('/login',[
   body("email").isEmail(),
   body("password").exists()
],async(req,res)=>{
   const errors= validationResult(req)
   let success=false
   if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()})
   }
   const {email,password}=req.body
   try {
      let user=await User.findOne({email});
      if(!user){
        return res.status(400).json({success,error:"Please try to login with correct credentials"});
      }
      const passwordCompare= await bcrypt.compare(password,user.password);
      if(!passwordCompare){
         return res.status(400).json({success,error:"Please try to login with correct credentials"});
      }

      const data={
         user:{
            id:user.id
         }
      }
       const authToken=jwt.sign(data,JWT_SECRET)
      //  console.log(authToken)
      success=true
       res.json({success,authToken})
       

   } catch (error) {
      console.error(error.message)
    res.status(500).send("some error occured");
   }
})

//Route 3 : get User detail from authentication token
router.post('/getuser',fetchuser,async(req,res)=>{
   try {
      const userId=req.user.id;
      const user= await User.findById(userId).select("-password")
      res.send(user)
   } catch (error) {
      console.error(error.message)
    res.status(500).send("some error occured");
   }
})

module.exports=router