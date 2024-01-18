const planModel = require('../models/planModel')

module.exports.getAllPlan = async (req, res) => {
    const plans = await planModel.find()
    if (plans) {
        return res.json({
            message: 'All Plans retrieved',
            data: plans
        })
    } else {
        return res.json({
            message: 'Error retriving plans'
        })
    }
}

module.exports.getPlan = async(req, res) => {
    const id = req.params.id
    const plan = await planModel.findById(id)
    if (plan) {
        return res.json({
            message: 'Plan retrieved',
            data: plan
        })
    } else {
         return res.json({
            message: 'Plan not found'
        })
    }
}

module.exports.createPlan = async(req, res) => {
    const planData = req.body
    const savePlan = await planModel.create(planData)
    return res.json({
        message: 'Plan created successfully',
        data: savePlan
    })
}

module.exports.deletePlan = async(req, res) => {
    const id = req.params.id
    const deletePlan = await planModel.findByIdAndDelete(id)
    return res.json({
        message: 'Plan deleted successfully',
        data: deletePlan
    })
}

module.exports.updatePlan = async(req, res) => {
    const id = req.params.id
    const dataToUpdate = req.body
    const plan = await planModel.findByIdAndUpdate(id, ...dataToUpdate)

    return res.json({
        message: 'Plan updated successfully',
        data: plan
    })
}

module.exports.top3plans = async(req, res) => {
    const plans = await planModel.find().sort({ratingAverage: -1}).limit(3)
     return res.json({
        message: 'Top 3 Plans',
        data: plans
    })
}