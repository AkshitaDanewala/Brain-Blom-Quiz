const QuizAttempt = require("../Models/attemptquesModel"); 
const Quiz = require("../Models/quizModel"); 

// Controller function to get scores for a particular quiz
exports.getQuizScores = (req, res)=> {
    const quizId = req.params.quizId;
    try {
        // Get quiz details
        const quiz =  Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ error: "Quiz not found" });
        }

        // Get all attempts for this quiz
        const quizAttempts =  QuizAttempt.find({ quizId: quizId });

        // Calculate scores
        let totalScores = 0;
        quizAttempts.forEach((attempt) => {
            totalScores += attempt.score;
        });

        // Calculate average score
        const averageScore = totalScores / quizAttempts.length;

        res.json({ quizId: quizId, quizTitle: quiz.title, averageScore: averageScore });
    } catch (err) {
        console.error("Error fetching quiz scores for quizId:", quizId, err);
        res.status(500).json({ error: "Internal server error" });
    }
}


