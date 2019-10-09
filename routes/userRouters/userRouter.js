const express = require('express');
const bodyParser = require('body-parser')
const passport = require('passport')
const multer = require('multer')

const upload = multer()

const signUpController = require('../../controllers/userControllers/signUpController')

let userRouter = express.Router();
userRouter.use(bodyParser.json())

userRouter.route('/signup')
.post(upload.none(), signUpController.signUpUser)

userRouter.route('/login')
.post(passport.authenticate('local'), (req, res) => {

})

module.exports = userRouter