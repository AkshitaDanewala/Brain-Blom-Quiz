const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({

username:{
    type: String,
    required: true
},
 email: {
    type: String,
    required: true,
    unique: true
 },
 

gender:{
  type: String,
  required: true,
},


 password: {
    type: String,
    required: true,
  },

  isAdmin: {
    type: Boolean,
    required: true,
    default: false,

  },
attempt: [
  {type: mongoose.Schema.Types.ObjectId,
    ref: 'Attempt',}
]


},
{ timestamps: true }

)

const user = mongoose.model("Users", userSchema)
module.exports = user