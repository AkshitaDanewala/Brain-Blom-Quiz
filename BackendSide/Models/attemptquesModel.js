// src/models/attempt.js
const mongoose = require('mongoose');

const attemptSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },

});

const attempts = mongoose.model("Attempt", attemptSchema)
module.exports = attempts

