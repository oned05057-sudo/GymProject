import express from "express";
import { createUser, getAllUsers } from "../Controllers/User.js";

const userRouter = express.Router();

userRouter.post("/create", createUser);
userRouter.get("/getUsers", getAllUsers );

export default userRouter;