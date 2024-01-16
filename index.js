import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import eventsRoute from "./routes/events.js";
import datasRoute from "./routes/datas.js";
import freesessionsRoute from "./routes/freesessions.js";
import complainsRoute from "./routes/complains.js";
import detailsRoute from "./routes/details.js";
import chaptersRoute from "./routes/chapters.js";
import subtopicsRoute from "./routes/subtopics.js";
import questionsRoute from "./routes/questions.js";
import allquestionsRoute from "./routes/allquestions.js";
import comptopicsRoute from "./routes/comptopics.js";
import scoresRoute from "./routes/scores.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import cors from "cors";


const app = express();
dotenv.config();

const port = process.env.PORT || 8800;

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

const corsOptions = {
  origin: "http://localhost:3000", // Replace with your frontend's actual origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};


//middlewares
// app.use(cors())
app.use(cors(corsOptions));
app.use(cookieParser())
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/events", eventsRoute);
app.use("/api/datas", datasRoute);
app.use("/api/freesessions", freesessionsRoute);
app.use("/api/complains", complainsRoute);
app.use("/api/chapters", chaptersRoute);
app.use("/api/details", detailsRoute);
app.use("/api/subtopics", subtopicsRoute);
app.use("/api/questions", questionsRoute);
app.use("/api/allquestions", allquestionsRoute);
app.use("/api/comptopics", comptopicsRoute);
app.use("/api/scores", scoresRoute);
app.use("/api/rooms", roomsRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(port, () => {
  connect();
  console.log("Connected to backend.");
});
