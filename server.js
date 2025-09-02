import express from "express";
const app = express();
const PORT = 4000;
import cors from "cors";
import userRouter from "./routes/User.js";
import  workoutRouter from "./routes/Workout.js";
import fileUpload from "express-fileupload";

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

//  =================================================== User Routes ===================================================//

app.use("/api/user", userRouter);

app.use("/api/workout", workoutRouter);



app.listen(PORT, () => {
    console.log("App is listening on port: ", PORT);
})