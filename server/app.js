import express from "express";
import mongoose from "mongoose";
import router from "./routes/userRoutes.js";
import blogRouter from "./routes/blogRoutes.js";
import cors from "cors";

const app = express();
app.use(cors());

app.use(express.json());
app.use("/api/user", router);
app.use("/api/blog", blogRouter);

mongoose
  .connect(
    "mongodb+srv://aditya:IAsW5fjYF29vVAOK@cluster0.lxtentp.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => app.listen(5000))
  .then(() => console.log("Database connected successfully!👍"))
  .catch((err) => console.log(err));

app.use("/", (req, res, next) => {
  res.send("This is a blog app.");
});
// app.listen(5000);
