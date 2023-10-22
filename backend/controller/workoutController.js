
const { default: mongoose } = require('mongoose')
const Workout = require('../models/workoutModel')

const getWorkouts = async(req,res) => {
    const workout = await Workout.find({})
    res.status(200).json(workout)
}

const getWorkout = async(req,res) => {
    const {id} =  req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"Invalid id entered for the search."})
    }
    const workout = await Workout.findById(id)
    if(!workout){
        return res.status(404).json({error:"No such workout found in DB by Id"})
    }
    res.status(200).json(workout)
}

const createWorkout = async(req,res) => {
    const {title,reps} = req.body
    try{
        const workout = await Workout.create({title,reps})
        res.status(200).json(workout)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

const deleteWorkout = async(req,res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"Invalid id entered for the deletion."})
    }
    
    const workout  = await Workout.findOneAndDelete({_id:id})
    if(!workout)
       return res.status(404).json({error:" no workout for the given id is present in the DB"})

    res.status(200).json(workout)
}

const updateWorkout = async(req,res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"Invalid id entered for the updation."})
    }
    const workout = await Workout.findOneAndUpdate({_id:id}, {
        ...req.body
    })
    if(!workout)
        return res.status(404).json({error:"error updating the id record."})
    res.status(200).json(workout)
}

module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}