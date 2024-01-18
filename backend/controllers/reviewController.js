const reviewModel = require('../models/reviewModel')
const planModel = require('../models/planModel')

module.exports.getAllReviews = async (req, res) => {
    const reviews = await reviewModel.find()
    if (reviews) {
        return res.json({
            message: 'All Reviews retrieved',
            data: reviews
        })
    } else {
        return res.json({
            message: 'Reviews not found'
        })
    }
}

module.exports.top3reviews = async (req, res) => {
    const reviews = await reviewModel.find().sort({ rating: -1 }).limit(3)
    if (reviews) {
        return res.json({
            message: 'Top 3 reviews found',
            data: reviews
        })
    } else {
        return res.json({
            message: 'Reviews not found!'
        })
    }
}

module.exports.getPlanReview = async (req, res) => {
    const planId = req.params.id
    const reviews = await reviewModel.find({ 'plan._id': planId })

    return res.json({
        message: 'Reviews retrived for this plan',
        data: reviews
    })
}

module.exports.createReview = async (req, res) => {
    const planId = req.params.id
    const review = await reviewModel.create(req.body)

    const plan = await planModel.findById(planId)
    plan.ratingsAverage = (plan.ratingsAverage + req.body.rating) / 2
    await plan.save()

    return res.json({
        message: 'Review created',
        data: review
    })
}

module.exports.updateReview = async (req, res) => {
    const id = req.body.id
    const dataToUpdate = req.body

    const review = await reviewModel.findByIdAndUpdate(id, ...dataToUpdate)
    return res.json({
        message: 'Review updated successfully',
        data: review
    })
}

module.exports.deleteReview = async (req, res) => {
    const id = req.body.id
    const review = await reviewModel.findByIdAndDelete(id)

    return res.json({
        message: 'Review deleted',
        data: review
    })
}