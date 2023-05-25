import mongoose from "mongoose";
import Blog from "../model/Blog.js";
import User from "../model/User.js";

// get all blogs
export const getAllBlogs = async (req, res, next) => {
  let blogs;
  try {
    blogs = await Blog.find();
  } catch (err) {
    return console.log(err);
  }
  if (!blogs) {
    return res.status(404).json({ message: "No blogs found" });
  }
  return res.status(200).json({ blogs });
};

// addBlog
export const addBlog = async (req, res, next) => {
  const { title, description, image, user} = req.body;
  //this is for the exisitng user if he wants to create the blog
  let exisitingUser;
  try {
    exisitingUser = await User.findById(user);
  } catch (err) {
    return console.log(err);
  }
  if (exisitingUser===false) {
    return res.status(400).json({ message: "Unable to find user by this id." });
  }
  //   new blog creation
  const blog = new Blog({
    title,
    description,
    image,
    user,
  });
  try {
    // await blog.save();

    // session to save the blog
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({ session });
    exisitingUser.blogs.push(blog);
    await exisitingUser.save({ session });
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
  return res.status(200).json({ blog });
};

// updateBlog
export const updateBlog = async (req, res, next) => {
  const { title, description } = req.body;
  const blogId = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(blogId, {
      title,
      description,
    });
  } catch (err) {
    return console.log(err);
  }
  if (!blog) {
    res.status(500).json({ message: "Unable to update the blog" });
  }

  res.status(200).json({ blog });
};

// for getting a particular blog by id
export const getById = async (req, res, next) => {
  const blogId = req.params.id;
  let blog;
  try {
    blog = await Blog.findById(blogId);
  } catch (err) {
    return console.log(err);
  }
  if (!blog) {
    res.status(404).json({ message: "No blog found" });
  }
  res.status(200).json({ blog });
};

// delete blog by id
export const deleteBlog = async (req, res, next) => {
  const blogId = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndRemove(blogId).populate('user');
    await blog.user.blogs.pull(blog);
    await blog.user.save();
  } catch (err) {
    return console.log(err);
  }
  if (!blog) {
    res
      .status(400)
      .json({ message: "No relevant blog found.Unable to Delete😮" });
  }
  res.status(200).json({ message: "Blog Deleted Successfully!👍" });
};

// getting the blogs of particular user  by  their userID
export const getByUserId=async (req,res,next)=>{
  const userId=req.params.id;
  let userBlogs;
  try{
    userBlogs=await User.findById(userId).populate('blogs');
  }
  catch(err){
    return console.log(err);
  }
  if(!userBlogs){
    return res.status(404).json({message:"No bogs found"});
  }
  return res.status(200).json({userBlogs});
}