
const mongoose = require('mongoose');
// const {ObjectId} = mongoose.Schema;

const questionSchema = new mongoose.Schema({
  statement: {
    type: String,
    required: true,
  },
  options: {
    type: [String], 
    required: true,
  },
  correctOption: {
    type: Number,
    required: true,
  },

  // quiz: {type: ObjectId, ref: "Quiz", required: true},
  quiz:  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
  },

});

const question = mongoose.model("Question", questionSchema)
module.exports = question

