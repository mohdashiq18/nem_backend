const express=require("express")
const app=express()
require('dotenv').config()
const {connection}=require("./Connection")
const {expressRout}=require("./Route/Route")


app.use(express.json())



app.use("/users",expressRout)

app.listen(process.env.port,async (req,res)=>{
    try{
       await connection
       console.log("Connected db")
       console.log("server running port at 8080")
    }catch{
        console.log("err")
    }
    
})