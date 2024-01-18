const express = require('express')
const app = express()
const ExpressError = require('./utils/ExpressError');

app.use(express.json())
const cors = require('cors')
app.use(cors())

const cookieParser = require('cookie-parser')
app.use(cookieParser())

const userRouter = require('./Routers/userRouter')
const planRouter = require('./Routers/planRouter')
const reviewRouter = require('./Routers/reviewRouter')

app.use('/user', userRouter)
app.use('/plan', planRouter)
app.use('/review', reviewRouter)

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode)
})

const PORT = 5000
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))