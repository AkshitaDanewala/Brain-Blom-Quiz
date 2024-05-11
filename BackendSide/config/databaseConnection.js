 const mongoose = require("mongoose")
 const dotenv = require("dotenv")
 dotenv.config()


 exports.connectDb = async() => {
    try{
         await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
         })
         console.log("database connected")
    } catch (err) {
        console.error(`Error: ${err.message}`)
    }
 }