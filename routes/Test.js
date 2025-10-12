import express from 'express'

import { showTest, createTest, retest } from "../Controllers/test.js"

const testRouter = express.Router();

testRouter.post("/create-test", createTest);
testRouter.post("/retest", retest);
testRouter.get("/get-test", showTest);

export default testRouter;