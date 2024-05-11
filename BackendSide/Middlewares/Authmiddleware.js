const jwt = require("jsonwebtoken")
const userModel = require("../Models/userModel")
const {CatchAsyncHandler} = require("../Middlewares/catchAsynchandler")
const Errorhandler = require("../Utils/ErrorHandler")
const dotenv = require("dotenv")
dotenv.config()



exports.isAuthenticate = CatchAsyncHandler(async(req,res, next) => {
    let token;

    token = req.cookies.jwt;

    if(token){
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await userModel.findById(decoded.userId).select("-password")
            next()
            // check karta hai ki token valid hai ya nahi, aur agar valid hai toh usme se user ka ID nikalta hai. Us ID se user ka data database se retrieve kiya jata hai, lekin password ko exclude karte hue. Fir, req.user mein user ka data store kiya jata hai 
        } catch (error){
return next(new Errorhandler("Please login in to access the resource, Not Authorized", 401))
        
        }
    } else {
    res.status(401);
return next(new Errorhandler("Not authorized, no token"))
  

    }
})


exports.authorizeAdmin = (req,res, next)=>{
    if(req.user && req.user.isAdmin){
        next()
    } else{
        res.status(401).send("Not Authorized as an Admin")
    }
}


