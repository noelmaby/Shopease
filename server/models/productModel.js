const mongoose=require('mongoose')


const shopSchema=new mongoose.Schema({
    proname:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    
    location:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    photo:{
        data:Buffer,
        contentType:String
    },
    slink:{
        type:String,
        required:true
    }

    

},{timestamps:true})
const shopModel= mongoose.model('Shop',shopSchema)
module.exports=shopModel;