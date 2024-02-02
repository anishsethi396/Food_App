const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const mongo_db = 'mongodb://127.0.0.1:27017/meal-master'

mongoose.connect(mongo_db)
.then(() => console.log('User DB connected!'))
.catch((err) => console.log(err))

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 5
    },
    confirmPassword: {
        type: String,
        required: true,
        minLength: 5,
        validate: () => {
            return this.confirmPassword == this.password
        }
    },
     role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
     },
     profilePhoto: {
        type: String
     }
})

userSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(this.password, salt)

    this.password = hashedPassword
})

const userModel = mongoose.model('userModel', userSchema, 'userModel')

module.exports = userModel
