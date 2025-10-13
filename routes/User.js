import express from "express";
import { createUser, getAllUsers, getSingleUser } from "../Controllers/User.js";

const userRouter = express.Router();

userRouter.post("/create", createUser);
userRouter.get("/getUsers", getAllUsers );
userRouter.post("/get-single-user",getSingleUser)

export default userRouter;