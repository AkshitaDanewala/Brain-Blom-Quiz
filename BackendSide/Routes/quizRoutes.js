
const express = require("express")
const router = express.Router()
const {isAuthenticate, authorizeAdmin} = require("../Middlewares/Authmiddleware")
const {createQuiz, updateQuiz,  deleteQuiz, getallQuiz} = require("../Controllers/QuizControllers")


router.route("/")
.post(isAuthenticate, authorizeAdmin, createQuiz) 
router.route("/:quizId").put(isAuthenticate, authorizeAdmin, updateQuiz)
router.route("/:quizId").delete(isAuthenticate, authorizeAdmin, deleteQuiz)
router.route("/quizes").get(getallQuiz)








module.exports = router
