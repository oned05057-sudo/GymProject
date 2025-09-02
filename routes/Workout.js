import express from "express";

import { createWorkout, createSet, getWorkouts, getSets} from "../Controllers/Workout.js";

const workoutRouter = express.Router();


workoutRouter.post("/create", createWorkout);
workoutRouter.post("/createSet", createSet);
workoutRouter.get("/allWorkout", getWorkouts);
workoutRouter.get("/getSets", getSets);


export default workoutRouter;
