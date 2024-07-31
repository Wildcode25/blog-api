import { Router } from "express";
import { BlogController } from "../controller/blogController.js";

export function createBlogRouter(BlogModel, UserModel) {
  const blogController = new BlogController(BlogModel, UserModel);
  const blogRouter = new Router();

  blogRouter.get("/", blogController.getAllBlogs);

  blogRouter.post("/", blogController.createBlog);
  
  blogRouter.put('/:id', blogController.updateBlog);

  blogRouter.delete('/:id', blogController.deleteBlog)

  return blogRouter;
}
