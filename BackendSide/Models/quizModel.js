

const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  timer: {
    type: Number, // Timer in seconds
    default: 0, // 0 for no timer
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
    },
  ],
});


const quiz = mongoose.model("Quiz", quizSchema)
module.exports = quiz
