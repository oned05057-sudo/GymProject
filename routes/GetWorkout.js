import express from "express"  

import { getLatestRoutine, getAllRoutine, isRoutine } from "../Controllers/GetWorkout.js"

const getWorkoutRouter = express.Router();

getWorkoutRouter.post("/get-latest-routine", getLatestRoutine);
getWorkoutRouter.post("/get-all-routines",  getAllRoutine);
getWorkoutRouter.get("/is-routine", isRoutine);

export default getWorkoutRouter;