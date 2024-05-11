const express = require("express")
const router = express.Router()
const {isAuthenticate, authorizeAdmin} = require("../Middlewares/Authmiddleware")
const {recordAttempt, viewScores} = require("../Controllers/attemptsControllers")
const {getQuizScores} = require("../Utils/scoreCalculation")

router.route("/record").post( recordAttempt)
router.route("/scores/:quizId?").get(viewScores,getQuizScores )




module.exports = router