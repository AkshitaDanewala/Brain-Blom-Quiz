const attemptModel = require("../Models/attemptquesModel")
const {CatchAsyncHandler} = require("../Middlewares/catchAsynchandler")
const ErrorHandler =  require("../Utils/ErrorHandler")
const userModel = require("../Models/userModel")




exports.recordAttempt = CatchAsyncHandler(async(req,res,next) =>{

    try {
        const { userId, quizId, score } = req.body; // User ID, Quiz ID, and Score from request body

        const existingUser = await userModel.findById(userId);
        if (!existingUser) {
          return res.status(404).json({ error: "User not found not found" });
        }
        const existingattempt = await attemptModel.findOne({userId, quizId,score})
        
        if( existingattempt) {
          return res.json({error: "Already Existed"})
        }
        const attempt = new attemptModel({ user: userId, quiz: quizId, score });
        await attempt.save();

        existingUser.attempt.push(attempt._id);
        await existingUser.save();
        // res.status(201).json(attempt);

        res.status(201).json({ msg: 'Attempt recorded successfully' , attempt});
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
})


exports.viewScores = CatchAsyncHandler(async(req,res,next) => {

    try {
        const { quizId } = req.params; // Quiz ID from request params
        let scores;
        if (quizId) {
          // If a specific quiz ID is provided, fetch scores for that quiz
          scores = await attemptModel.find({ quiz: quizId }).populate('user', 'username');
        } else {
          // If no quiz ID is provided, fetch scores for all quizzes
          scores = await attemptModel.find().populate('user', 'username');
        }
        res.json(scores);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
})
