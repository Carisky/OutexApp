// controllers/userController.js
const express = require("express");

const Workout = require('../Models/Workout')

const WorkoutController = express.Router();

WorkoutController.get("/workouts",async (req, res) => {
    const workouts = await Workout.returnAll();
    res.send(workouts)
})

WorkoutController.get("/workouts/exsercises/:id", async (req, res) => {
    const workoutId = req.params.id;
  
    try {
      const workoutWithExercises = await Workout.returnWorkoutWithExercises(workoutId);
      res.json(workoutWithExercises);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = WorkoutController;