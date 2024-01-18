const mongoose = require('mongoose')
const mongo_db = 'mongodb://127.0.0.1:27017/meal-master'

mongoose.connect(mongo_db)
.then(() => console.log('Plan DB connected!'))
.catch((err) => console.log(err))

const planSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        maxlength: [20, 'Plan name should not exceed more than 20 characters']
    }, 
    duration: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    ratingsAverage: {
        type: Number
    },
    discount: {
        type: Number,
        validate: [() => {
            return this.discount < 100
        }, 'Discount should be less than $100']
    }
})

const planModel = mongoose.model('planModel', planSchema, 'planModel')

module.exports = planModel

