import express from "express";
const app = express();
const PORT = 4000;
import cors from "cors";
import fileUpload from "express-fileupload";

// router import
import userRouter from "./routes/User.js";
import  workoutRouter from "./routes/Workout.js";
import getWorkoutRouter from "./routes/GetWorkout.js";




//  =================================================== Home Route ===================================================//

app.use(
  fileUpload(
    {
      useTempFiles: true,
      tempFileDir: "/tmp/",
    }
  )
)

app.get("/" , (req,res) => {

    res.send("APT Working");
})

app.use(cors());
app.use(express.json());

//  =================================================== Routes ===================================================//

app.use("/api/user", userRouter);

app.use("/api/workout", workoutRouter);

app.use("/api/getWorkout",getWorkoutRouter );



app.listen(PORT, () => {
    console.log("App is listening on port: ", PORT);
})