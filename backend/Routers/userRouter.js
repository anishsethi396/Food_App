const express = require("express");
const catchAsync = require('../utils/catchAsync');
const {getUser, getAllUser, updateUser, deleteUser} = require('../controllers/userController')
const {signup, login, isAuthenticated, isAdmin, logout} = require('../controllers/authController')

const userRouter = express.Router()

userRouter.route('/:id')
.put(catchAsync(updateUser))
.delete(catchAsync(deleteUser))

userRouter.route('/signup')
.post(catchAsync(signup))

userRouter.route('/login')
.post(catchAsync(login))

userRouter.route('/logout')
.get(catchAsync(logout))

module.exports = userRouter