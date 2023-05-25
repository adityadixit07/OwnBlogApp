import mongoose from "mongoose";

const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    required: "true",
  },
  description: {
    type: String,
    required: "true",
    minlength: 20,
  },
  image: {
    type: String,
    required: "true",
  },
  user: {
    type: mongoose.Types.ObjectId, //for getting the blog by user id
    ref: "User",
    required: "true",
  },
});

export default mongoose.model("Blog", blogSchema);

// "blogs" schema in mongodb created
