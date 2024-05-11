const express = require("express")
const router = express.Router()
const {isAuthenticate, authorizeAdmin} = require("../Middlewares/Authmiddleware")
const {createUser,  loginUser, logoutUser, getAllusers,  getCurrentUserProfile, updateCurrentUserProfile, deleteCurrentUserProfile, deleteUserById, getUserById, updateUserById} = require("../Controllers/UsersControllers")


router.route("/")
.post(createUser)
.get(isAuthenticate, authorizeAdmin, getAllusers)
// this route is for Admin so that he can get all users on his dashboard

router.post("/auth", loginUser)
router.post("/logout", logoutUser)


router.route("/profile")
.get(isAuthenticate, getCurrentUserProfile)
.put(isAuthenticate, updateCurrentUserProfile)
.delete(isAuthenticate, deleteCurrentUserProfile)



//Admin routes
router.route("/:id")
.delete(isAuthenticate, authorizeAdmin, deleteUserById)
.get(isAuthenticate, authorizeAdmin, getUserById)
.put(isAuthenticate, authorizeAdmin, updateUserById)


module.exports = router
