const express = require('express')
const router = express.Router()
const {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controller/workoutController')

// get all workouts 
router.get('/',getWorkouts)
router.get('/:id',getWorkout)

// save a new workout to the DB
router.post('/',createWorkout)

// delete a workout from DB
router.delete('/:id',deleteWorkout)

// update a workout in DB
router.patch('/:id',updateWorkout)

module.exports = router