const express = require('express')
const dotenv=require('dotenv').config();
const cors=require('cors')
const {mongoose}=require('mongoose')
const cookieParser=require('cookie-parser')

const app=express()

app.use(cors(
    {
        origin : ["http://127.0.0.1:5173"],
        methods: ["POST", "GET", "DELETE"],
        credentials:true
    }
));

//database connection
mongoose.connect("mongodb+srv://noelmanjayilaby:RKP2OXsrLO2kC7Os@cluster0.vderxq8.mongodb.net/Shopease ")
.then(() => console.log('database connected'))
.catch((err)=> console.log('databse not connected',err))

//middleware
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({extended:false}))



app.use('/',require('./routes/authRoutes'))




app.listen(3000,()=>{
    console.log("server is running")
})