const userModel = require('../models/userModel')

module.exports.getUser = async(req, res) => {
    const id = req.params.id
    const user = await userModel.findById(id)

    if (user) {
        return res.json({
            message: 'User found',
            data: user
        })
    } else {
        return res.json({
            message: 'User not found'
        })
    }
}

module.exports.updateUser = async(req, res) => {
    const id = req.params.id
    const dataToUpdate = req.body
    const user = await userModel.findByIdAndUpdate(id, ...dataToUpdate)

    return res.json({
        message: 'Data updated successfully',
        data: user
    })
}

module.exports.deleteUser = async(req, res) => {
    const id = req.params.id
    const user = await userModel.fingByIdAndDelete(id)

    return res.json({
        message: 'User deleted',
        data: user
    })
}

module.exports.getAllUsers = async(req, res) => {
    const users = await userModel.find()

    if (user) {
        return res.json({
            message: 'All users retrieved'})
    } else {
        return res.json({
            message: 'Error finding users'
        })
    }
}