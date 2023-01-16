const mongoose=require("mongoose")
const registerSchema=mongoose.Schema({
    "username": String,
    "email"  :String,
    "DOB":String,
    "Role":String,
    "location":String,
    "password" : String 
})

const RegisterModule=mongoose.model("users",registerSchema)
module.exports={
    RegisterModule
}

