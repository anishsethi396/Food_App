const express = require('express')
const catchAsync = require('../utils/catchAsync');
const{getAllReviews,top3reviews,getPlanReview,createReview,updateReview,deleteReview} = require('../controllers/reviewController')

const reviewRouter = express.Router()

reviewRouter.route('/')
.get(catchAsync(getAllReviews))

reviewRouter.route('/top3')
.get(catchAsync(top3reviews))

reviewRouter.route('/:id')
.get(catchAsync(getPlanReview))

reviewRouter.route('/crud/:plan')
.post(catchAsync(createReview))
.put(catchAsync(updateReview))
.delete(catchAsync(deleteReview))

module.exports = reviewRouter 