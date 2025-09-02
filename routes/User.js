import express from "express";
import { createUser, deleteUser, getAllUsers, updateMeasurements,getUser } from "../Controllers/User.js";

const userRouter = express.Router();

userRouter.post("/create", createUser);
userRouter.post("/delete",deleteUser);
userRouter.get("/all", getAllUsers);
userRouter.post("/updateMesurements", updateMeasurements);
userRouter.get("/getUser", getUser);

export default userRouter;