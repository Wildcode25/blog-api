import { Router } from "express";
import { BlogController } from "../controller/blogController.js";

export function createBlogRouter(BlogModel){
    const blogController = new BlogController(BlogModel)
    const blogRouter = new Router();
    
      blogRouter.get('/', blogController.getAllBlogs)
      
      blogRouter.post('/', blogController.createBlog)
    return blogRouter
}