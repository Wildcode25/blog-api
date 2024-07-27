import { Router } from "express";
import { BlogController } from "../controller/blogController.js";

export function createBlogRouter(BlogModel){
    const blogController = new BlogController(BlogModel)
    const blogRouter = new Router();
    
    blogRouter.get('/', (request, response) => {
        Blog
          .find({})
          .then(blogs => {
            response.json(blogs)
          })
      })
      
      blogRouter.post('/', (request, response) => {
        const blog = new Blog(request.body)
      
        blog
          .save()
          .then(result => {
            response.status(201).json(result)
          })
      })
    return Router()
}