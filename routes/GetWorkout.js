import express from "express"  

import { getLatestRoutine, getAllRoutine, isRoutine } from "../Controllers/GetWorkout.js"

const getWorkoutRouter = express.Router();

getWorkoutRouter.get("/get-latest-routine", getLatestRoutine);
getWorkoutRouter.get("/get-all-routines",  getAllRoutine);
getWorkoutRouter.get("/is-routine", isRoutine);

export default getWorkoutRouter;