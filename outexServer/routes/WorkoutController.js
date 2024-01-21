// controllers/userController.js
const express = require("express");

const Workout = require('../Models/Workout')

const WorkoutController = express.Router();

WorkoutController.get("/workouts",async (req, res) => {
    const workouts = await Workout.returnAll();
    res.send(workouts)
})

module.exports = WorkoutController;