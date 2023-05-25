import express from 'express'
import { addBlog, deleteBlog, getAllBlogs, getById, updateBlog } from '../controllers/blogController.js';

const blogRouter=express.Router();

blogRouter.get("/",getAllBlogs);
blogRouter.post("/addblog",addBlog);
blogRouter.post("/update/:id",updateBlog);
blogRouter.get("/:id",getById);
blogRouter.delete("/:id",deleteBlog);
// blogRouter.get("/user/:id",getByUserId);

export default blogRouter;