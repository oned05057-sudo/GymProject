import express from "express"  

import { getLatestRoutine, getAllRoutine } from "../Controllers/GetWorkout.js"

const getWorkoutRouter = express.Router();

getWorkoutRouter.get("/get-latest-routine", getLatestRoutine);
getWorkoutRouter.get("/get-all-routines",  getAllRoutine);

export default getWorkoutRouter;