const express=require("express")
const jwt=require("jsonwebtoken")
const expressRout=express.Router()
const {RegisterModule}=require("../module/SchemaModule")
const {authenticate}=require("../Middelwares/authenticate")
const {login}=require("../Middelwares/Validetor")
const { application } = require("express")
const bcrypt = require('bcrypt');
expressRout.use(login)
expressRout.get('/',async (req,res)=>{
   const data=await RegisterModule.find()
   res.send(data)
})
expressRout.post("/register",async (req,res)=>{
  const {username,email,password,Role,location}=req.body
  try{
  bcrypt.hash(password, 8, async (err, hash)=>{
  const user=new RegisterModule({username,email,password:hash,Role,location})
  await user.save()
  res.send("Registered")
  });
  }catch(err){
  res.send("Error in registering the user")
  console.log(err)
  }
  })

  expressRout.post("/login",async (req,res)=>{
    const {email,password}=req.body
    try{
    const user=await RegisterModule.find({email})
    if(user.length>0){
    bcrypt.compare(password, user[0].password, function(err, result) {
    if(result){
    const token = jwt.sign({ userID:user[0]._id }, 'masai');
    res.send({"msg":"Login Successfull","token":token})
    } else {res.send("Wrong Credntials")}
    });
    } else {
    res.send("Wrong Credntials")
    }
    } catch(err){
    res.send("Something went wrong")
    console.log(err)
    }
    })
    
expressRout.use(authenticate)
expressRout.patch("/update/:id",async (req,res)=>{
    const payload=req.body
    const id=req.params.id
    const userID_req=req.body.userID 
    const note=await RegisterModule.findOne({"_id":userID_req})
    const role=note.Role
    console.log(userID_req)
    try{
        if(userID_req==id || role=="Admin" ){
            await RegisterModule.findByIdAndUpdate({"_id":id},payload)
            res.send("updeted")
            
        }else{
            // await NoteModel.findByIdAndUpdate({"_id":id},payload)
            res.send("You are not authorized")
             
        }
    }
    catch(err){
      res.send(err)
    }
})


expressRout.delete("/delete/:id",async (req,res)=>{
  
    const id=req.params.id
    
    const userID_req=req.body.userID 
    const note=await RegisterModule.findOne({"_id":userID_req})
    const role=note.Role
    // console.log(userID_req)
    try{ 
        if(userID_req==id || role=="Admin" ){
            await RegisterModule.findByIdAndDelete({"_id":id})
            res.send("Deleted")
            
        }else{
            // await NoteModel.findByIdAndUpdate({"_id":id},payload)
            res.send("You are not authorized")
             
        }  
    }
    catch(err){
      res.send(err)
    }
})


module.exports={
    expressRout
}
