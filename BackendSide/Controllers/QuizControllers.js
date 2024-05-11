
const quizModel = require("../Models/quizModel")
const {CatchAsyncHandler} = require("../Middlewares/catchAsynchandler")
const ErrorHandler =  require("../Utils/ErrorHandler")


exports.createQuiz = CatchAsyncHandler(async(req,res,next) =>{

    try {
        const { title, description, timer, questions } = req.body;

        const existingQuiz = await quizModel.findOne({title})

        if(existingQuiz ) {
            return res.json({error: "Already Existed"})
        }

        const quiz =  new quizModel({ title, description, timer, questions});
        await quiz.save();
        res.status(201).json(quiz);

      
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
})



exports.updateQuiz = CatchAsyncHandler(async(req,res,next) => {

    const quiz = await quizModel.findById(req.params.quizId);
    // console.log("Quiz:", quiz);

    if(quiz){
        quiz.title = req.body.title ||quiz.title,
        quiz.description = req.body.description || quiz.description,
        quiz.timer = req.body.timer || quiz.timer


      const updatedQuiz = await quiz.save()

      res.json({
        _id: updatedQuiz._id,
        title: updatedQuiz.title,
        description:updatedQuiz.description,
        timer: updatedQuiz.timer,
      });

    } else {
      res.status(404)
      return next(new ErrorHandler("quiz Not Found"))

    }

   
    
    }
)


exports.deleteQuiz = CatchAsyncHandler(async(req,res,next) => {

    try{
        const quiz = await quizModel.findByIdAndDelete(req.params.quizId)
        res.status(200).json(quiz)
    } catch(error) {
        console.error(error)
        res.status(500).json({error: "Server Error"} )
    }
})


exports.getallQuiz = CatchAsyncHandler(async(req,res,next) => {

    try{
        const allQuiz = await quizModel.find({}).populate('questions')
        res.json(allQuiz)
    } catch (error) {
        console.log(error)
        return res.status(400).json(error.message)
    }
})