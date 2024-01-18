const express = require('express')
const catchAsync = require('../utils/catchAsync');
const {getAllPlan, getPlan, createPlan, updatePlan, deletePlan, top3plans} = require('../controllers/planController')

const planRouter = express.Router()

planRouter.route('/')
.get(catchAsync(getAllPlan))

planRouter.route('/top3')
.get(catchAsync(top3plans))

planRouter.route('/:id')
.get(catchAsync(getPlan))

planRouter.route('/crudPlan')
.get(catchAsync(createPlan))

planRouter.route('/crudPlan/:id')
.put(catchAsync(updatePlan))
.delete(catchAsync(deletePlan))

module.exports = planRouter