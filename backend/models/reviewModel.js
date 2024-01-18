const mongoose = require('mongoose')
const mongo_db = 'mongodb://127.0.0.1:27017/meal-master'

mongoose.connect(mongo_db)
.then(() => console.log('Review DB connected!'))
.catch((err) => console.log(err))

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 10,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'userModel'
    },
    plan: {
        type: mongoose.Schema.ObjectId,
        ref: 'planModel'
    }
})

reviewSchema.pre(/^find/, function (next){
    this.populate({
        path: 'user',
        select: 'name'
    }).populate('plan')
    next()
})

const reviewModel = mongoose.model('reviewModel', reviewSchema, 'reviewModel')

module.exports = reviewModel