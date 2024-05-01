const User = require('../models/user')
const shopModel=require('../models/productModel')
const commModel=require('../models/commentModel')
const {hashPassword,comparePassword} = require('../helpers/auth')
const jwt=require('jsonwebtoken');
const fs =require('fs')



const test = (req,res)=>{
    res.json('test is working')
}


//register endpoint
const registerUser= async (req,res)=>{
    try{
        const {name,email,password}=req.body
        //check if name was entered
        if(!name){
            return res.json({
                error:'Name Is Required'
            })
        };
        //check password
        if(!password || password.length<6){
            return res.json({
                error:'Password Is Required And Should Be At Least 6 Character Long'
            })
        };
        //check mail
        const exist = await User.findOne({email})
        if(exist){
            return res.json({
                error:'Email Already Exist'
            })
        }

        const hashedPassword=await hashPassword(password)
        //create user in databse
        const user=await User.create({
            name,email,password:hashedPassword
        })

        return res.json(user)
    }
    catch(error){
        console.log(error)
    }
}


//login endpoint
const loginUser= async (req,res)=>{
    try {
        const {email,password}=req.body;
        //check if user exist
        const user=await User.findOne({email});
        if(!user){
            return res.json({
                error:'No User Found'
            })
        }

        //password match
        const match=await comparePassword(password,user.password)
        if(match){
           const accessToken=jwt.sign({email:user.email},"jwt-access-token-secret-key",{expiresIn:'20m'})
           const refreshToken=jwt.sign({email:user.email},
            "jwt-refresh-token-secret-key",{expiresIn:'30m'})

            res.cookie('accessToken',accessToken,{maxAge:20 * 60 * 1000,httpOnly:true,secure:true,sameSite:'None'})

            res.cookie('refreshToken',refreshToken,{maxAge:30 * 60 * 1000,httpOnly:true,secure:true,sameSite:'None'})
            
            
            res.json({ success: 'Login successful' });
            }
        

        if(!match){
            res.json({
                error:'Password Do Not Match'
            })
        }
    } catch (error) {
            console.log(error)
            
    }
}

const varifyUser = (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        if (renewToken(req, res, next)) {
            next(); // Call next middleware or route handler
        } else {
            return res.json({ valid: false, message: "no access token" });
        }
    } else {
        jwt.verify(accessToken, 'jwt-access-token-secret-key', (err, user) => {
            if (err) {
                return res.json({ valid: false, message: "invalid token" });
            } else {
                req.email = user.email;
                next(); // Call next middleware or route handler
            }
        });
    }
};

const renewToken = (req, res, next) => {
    const refreshtoken = req.cookies.refreshToken;
    if (!refreshtoken) {
        return false; // No refresh token found
    } else {
        jwt.verify(refreshtoken, 'jwt-refresh-token-secret-key', (err, user) => {
            if (err) {
                return false; // Invalid refresh token
            } else {
                const accessToken = jwt.sign({ email: user.email }, "jwt-access-token-secret-key", { expiresIn: '1m' });
                res.cookie('accessToken', accessToken, { maxAge: 60000, httpOnly: true, secure: true, sameSite: 'None' });
                next(); // Call next middleware or route handler
            }
        });
    }
};



  const getProfile = (req, res) => {
    const userEmail = req.email;
    const isAdmin = userEmail === 'admin@admin.com';
    return res.json({valid:true,message:'authorized', email: userEmail, isAdmin: isAdmin })
  };

  const getAdmin = (req, res) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        return res.json({ valid: false, message: "no access token" });
    } else {
        jwt.verify(accessToken, 'jwt-access-token-secret-key', (err, user) => {
            if (err) {
                return res.json({ valid: false, message: "invalid token" });
            } else {
                const userEmail = user.email;
                const isAdmin = userEmail === 'admin@admin.com';
                if (isAdmin) {
                    return res.json({ valid: true, message: "authorized", email: userEmail, isAdmin: isAdmin });
                } else {
                    return res.json({ valid: false, message: "not an admin" });
                }
            }
        });
    }
}


  
  const addShop=async(req,res)=>{
    try {
        const { name, location, description, price, proname,slink } = req.fields;
        const { photo } = req.files;

        if (!name || !location || !description || !price || !proname || !slink) {
            return res.status(400).send({ error: 'All fields are required' });
        }

        if (!photo) {
            return res.status(400).send({ error: 'Photo is required' });
        }

        if (photo.size > 1000000) {
            return res.status(400).send({ error: 'Photo size should be less than 1MB' });
        }

        const shop = new shopModel({ ...req.fields });

        if (photo) {
            shop.photo.data = fs.readFileSync(photo.path);
            shop.photo.contentType = photo.size;
        }

        await shop.save();
        res.status(201).send({
            success: true,
            message: 'Shop created successfully',
            shop,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error: error.message,
            message: 'Error in creating shop',
        });
    }
};
  
  const getShop=async(req,res)=>{
    try {
        const shop=await shopModel.find({}).populate('name').select("-photo").limit(12).sort({createdAt:-1});
        res.status(200).send({
            success:true,
            counTotal:shop.length,
            message:"all shops",
            shop,
            
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in getting shops',
            error:error.message
        })
        
    }
  }

  
  const photocontroller = async (req, res) => {
    try {
        const shop = await shopModel.findById(req.params.pid).select("photo");
        if (shop && shop.photo) {
            res.set('Content-Type', shop.photo.contentType);
            return res.status(200).send(shop.photo.data);
        } else {
            return res.status(404).send({ success: false, message: 'Photo not found' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ success: false, message: 'Error getting photo', error });
    }
};

const deleteShop=async(req,res)=>{
    try {
        await shopModel.findByIdAndDelete(req.params.pid).select("-photo")
        res.status(200).send({
            success:true,
            message:'Shop Deleted Successfully'
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error while deletign shop',
            error
        })
    }
}

const getUsers=async(req,res)=>{
    try {
        const users=await User.find({}).limit(12).sort({createdAt:-1});
        res.status(200).send({
            success:true,
            counTotal:User.length,
            message:"all shops",
            users,
            
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in getting shops',
            error:error.message
        })
        
    }
  }

  const deleteUser=async(req,res)=>{
    try {
        await User.findByIdAndDelete(req.params.pid)
        res.status(200).send({
            success:true,
            message:'User Deleted Successfully'
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error while deletign User',
            error
        })
    }
}

const locationShop=async(req,res)=>{
   

    try {
        const shop=await shopModel.find({}).populate('name').select("-photo").limit(12).sort({createdAt:-1});
        res.status(200).send({
            success:true,
            counTotal:shop.length,
            message:"all shops",
            shop,
            
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in getting shops',
            error:error.message
        })
        
    }
}

const addcomm=async(req,res)=>{
    try {
        const { name, description, profession } = req.fields;
        const { photo } = req.files;

        if (!name || !description  || !profession) {
            return res.status(400).send({ error: 'All fields are required' });
        }

        if (!photo) {
            return res.status(400).send({ error: 'Photo is required' });
        }

        if (photo.size > 1000000) {
            return res.status(400).send({ error: 'Photo size should be less than 1MB' });
        }

        const shop = new commModel({ ...req.fields });

        if (photo) {
            shop.photo.data = fs.readFileSync(photo.path);
            shop.photo.contentType = photo.size;
        }

        await shop.save();
        res.status(201).send({
            success: true,
            message: 'Comment added successfully',
            shop,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error: error.message,
            message: 'Error in creating shop',
        });
    }
};
  const getcomm =async(req,res)=>{
    try {
        const shop=await commModel.find({}).populate('name').select("-photo").limit(12).sort({createdAt:-1});
        res.status(200).send({
            success:true,
            counTotal:shop.length,
            message:"all comments",
            shop,
            
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in getting shops',
            error:error.message
        })
        
    }

  }
  const comphoto = async (req, res) => {
    try {
        const shop = await commModel.findById(req.params.pid).select("photo");
        if (shop && shop.photo) {
            res.set('Content-Type', shop.photo.contentType);
            return res.status(200).send(shop.photo.data);
        } else {
            return res.status(404).send({ success: false, message: 'Photo not found' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ success: false, message: 'Internal Server Error' });
    }
};
const signOut = (req, res) => {
    // Clear cookies on the client side
    res.clearCookie('accessToken' );
    res.clearCookie('refreshToken');

    // Optionally, send a response indicating successful sign-out
    res.json({ success: true, message: 'Sign out successful' });
};


  

  module.exports={
    test,registerUser,deleteUser,loginUser,signOut,comphoto,getProfile,addcomm,varifyUser,getcomm,addShop,getShop,photocontroller,deleteShop,getAdmin,getUsers,locationShop
}