const express = require("express")
const router = express.Router()
const {isAuthenticate, authorizeAdmin} = require("../Middlewares/Authmiddleware")
const {createQuestions, updateQuestions, deleteQuestions, fetchAllQuestions, fetchQuestionById} = require("../Controllers/questionsController")


router.route("/")
.post(isAuthenticate, authorizeAdmin, createQuestions) 
router.route("/:questionId").put(isAuthenticate, authorizeAdmin, updateQuestions)
router.route("/:questionId").delete(isAuthenticate, authorizeAdmin, deleteQuestions)
router.route("/allQuestions").get(fetchAllQuestions)
router.route("/:questionid").get(fetchQuestionById)







module.exports = router