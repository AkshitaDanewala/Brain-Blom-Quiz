
const questionModel = require("../Models/questionModel")
const {CatchAsyncHandler} = require("../Middlewares/catchAsynchandler")
const ErrorHandler =  require("../Utils/ErrorHandler")
const quizModel = require("../Models/quizModel")



exports.createQuestions = CatchAsyncHandler(async(req,res,next) =>{

    try {
        const { statement,options, correctOption, quiz } = req.body;

        const existingQuiz = await quizModel.findById(quiz);
        if (!existingQuiz) {
          return res.status(404).json({ error: "Quiz not found" });
        }

        const existingQuestion = await questionModel.findOne({statement, quiz})

        if( existingQuestion) {
            return res.json({error: "Already Existed"})
        }

        const question =  new questionModel({ statement,options, correctOption, quiz });
        await question.save();

        existingQuiz.questions.push(question._id);
        await existingQuiz.save();
        res.status(201).json(question);

      
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }

})


exports.updateQuestions = CatchAsyncHandler(async(req,res,next) => {

    const questions = await questionModel.findById(req.params.questionId);
    // console.log("Quiz:", quiz);
    if(questions){
        questions.statement = req.body.statement || questions.statement,
        questions.options = req.body.options || questions.options,
        questions.correctOption = req.body.correctOption || questions.correctOption


      const updatedQuestions = await questions.save()

      res.json({
        _id: updatedQuestions._id,
        statement: updatedQuestions.statement,
        options:updatedQuestions.options,
        correctOption: updatedQuestions.correctOption,
      });

    } else {
      res.status(404)
      return next(new ErrorHandler("quiz Not Found"))

    }
    }
)

exports.deleteQuestions = CatchAsyncHandler(async(req,res,next) => {

    try{
        const questions = await questionModel.findByIdAndDelete(req.params.questionId)
        res.status(200).json(questions)
    } catch(error) {
        console.error(error)
        res.status(500).json({error: "Server Error"} )
    }
})


exports.fetchAllQuestions = CatchAsyncHandler(async(req,res,next) => {

    try{
        const allQuestions = await questionModel.find({})
        .populate("quiz")
        res.json(allQuestions)

    } catch(error){
        console.error(error)
        res.status(500).json({error: "Server Error"})
    }
})


exports.fetchQuestionById = CatchAsyncHandler(async(req,res,next) => {
  try{
    const questions = await questionModel.findById(req.params.questionid)
    if(questions) {
      return res.json(questions)
    } else {
        res.status(404)
return next(new ErrorHandler("question Not Found", 404))

    }
} catch(error) {
    console.error(error)
    res.status(500).json({error: "internal server error"})
}
})