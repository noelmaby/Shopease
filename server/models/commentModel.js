const mongoose=require('mongoose')


const shopSchema=new mongoose.Schema({
    profession:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
   
    description:{
        type:String,
        required:true
    },
   
    photo:{
        data:Buffer,
        contentType:String
    },
  
    

},{timestamps:true})
const commModel= mongoose.model('comment',shopSchema)
module.exports=commModel;