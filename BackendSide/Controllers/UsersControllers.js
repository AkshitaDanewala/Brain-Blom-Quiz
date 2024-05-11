const userModel = require("../Models/userModel")
const {CatchAsyncHandler} = require("../Middlewares/catchAsynchandler")
const bcrypt = require("bcryptjs")
const {generateToken} = require("../Utils/createToken")
const ErrorHandler =  require("../Utils/ErrorHandler")
const attempts = require("../Models/attemptquesModel")




exports.createUser = CatchAsyncHandler(async(req,res,next) => {
    const { username, email,  gender, password } = req.body;
  
    if (!username || !email || !password || !gender) {
      throw new Error("Please fill all the inputs.");
    }
  
    const userExists = await userModel.findOne({ email });
    if (userExists) res.status(400).send("User already exists");
  
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({ username, email, gender, password: hashedPassword });
  
    try {
      await newUser.save();
      generateToken(res, newUser._id, newUser);
  
      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        gender: newUser.gender, 
        isAdmin: newUser.isAdmin,
      });
    } catch (error) {
      res.status(400);
      throw new Error("Invalid user data");
    }
})



exports. loginUser = CatchAsyncHandler(async(req,res,next)=> {
  
  const {email, password} = req.body;

  const existingUser =  await userModel.findOne({email})

if(!existingUser) return next(new ErrorHandler("User not found with this email address", 404))


  if(existingUser){
    const isPassword = await bcrypt.compare(password, existingUser.password)

if(!isPassword) return next(new ErrorHandler("Wrong Credentials", 500))

if(isPassword){
generateToken(res, existingUser._id,);


res.status(200).json({
_id: existingUser._id,
username: existingUser.username,
email: existingUser.email,
gender: existingUser.gender,
isAdmin: existingUser.isAdmin
});
return;
}

  }
});


exports.logoutUser = CatchAsyncHandler(async(req,res,next) => {
  res.cookie("jwt", "",{
    httpOnly: true,
    expires: new Date(0)
  })
  res.status(200).json({message: "User Successfully Logout"})
})



// this route is for Admin so that he can get all users on his dashboard
exports.getAllusers = CatchAsyncHandler(async(req,res, next) => {
  const getallUsers = await userModel.find({}).populate('attempt')
    res.json(getallUsers)
})


exports. getCurrentUserProfile = CatchAsyncHandler(async(req,res,next) =>{

  const user = await userModel.findById(req.user._id).populate({path:'attempt',populate:{path:'quiz'}})

    if(user){

      res.json({
     _id: user._id,
     username: user.username,
     email: user.email,
     gender: user.gender,
     attempt:user.attempt

      });

    } else{
      res.status(404)
 return next(new ErrorHandler("User Not found"))

    }
})



exports.updateCurrentUserProfile = CatchAsyncHandler(async(req,res,next) => {

  const user = await userModel.findById(req.user._id)

    if(user){
   // existing userdata      new userdata   old userdata
      user.username = req.body.username || user.username
      user.email = req.body.email || user.email
      user.gender = req.body.gender || user.gender


      if(req.body.password){
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        user.password = hashedPassword
      }


      const updateUser = await user.save()

      res.json({
        _id: updateUser._id,
        username: updateUser.username,
        email: updateUser.email,
        gender: updateUser.gender,
        isAdmin: updateUser.isAdmin,
        message: "User Updated Successfully"
  
      })
  
    } else{
      res.status(400)
      return next(new ErrorHandler("User Not found"))

    }

})


exports.deleteCurrentUserProfile = CatchAsyncHandler(async(req,res,next) =>{

  const user = await userModel.findById(req.user._id)

  if(user){
    await userModel.findByIdAndDelete({_id: user._id})
   res.json({message: "User Successfully deleted"})

  }
})


exports.deleteUserById = CatchAsyncHandler(async(req,res, next) => {

  const user = await userModel.findById(req.params.id)

    if(user){
     if (user.isAdmin){
      res.status(400)
      return next(new ErrorHandler("Cannot delete Admin user"))
     }

     await userModel.deleteOne({_id: user._id});
     res.json({message: "User Successfully Removed"})
    } else{
      res.status(400)
      return next(new ErrorHandler("User Not Found"))

    }
})

exports.getUserById = CatchAsyncHandler(async(req,res,next) =>{

  const user  =  await userModel.findById(req.params.id).populate({path:'attempt',populate:{path:'quiz'}}).select("-password");

    if(user){
      res.json(user)
    } else {
res.status(400)
return next(new ErrorHandler("User Not Found"))

    }
})


exports.updateUserById = CatchAsyncHandler(async(req,res,next) => {

  const user = await userModel.findById(req.params.id);

    if(user){
      user.username = req.body.username || user.username,
      user.email = req.body.email || user.email,
      user.gender = req.body.gender || user.gender,
      user.isAdmin = Boolean(req.body.isAdmin)


      const updatedUser = await user.save()

      res.json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        gender: updatedUser.gender,
        isAdmin: updatedUser.isAdmin,
      });

    } else {
      res.status(400)
      return next(new ErrorHandler("User Not Found"))

    }
})