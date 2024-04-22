const mongoose=require("mongoose")

mongoose.connect("mongodb+srv://Ashish:root@ashxsh.lvjyss2.mongodb.net/?retryWrites=true&w=majority&appName=Ashxsh")
.then(()=>{
    console.log('mongoose connected');
})
.catch((e)=>{
    console.log('failed');
})

const logInSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const LogInCollection=new mongoose.model('LogInCollection',logInSchema)

module.exports=LogInCollection