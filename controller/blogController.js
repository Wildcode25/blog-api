export class BlogController{
    constructor(Blog){
        this.Blog = new Blog()
    }
    getAllBlogs = (request, response) => {
        this.Blog
          .find({})
          .then(blogs => {
            response.json(blogs)
          })
      }
      
      createBlog =(request, response) => {
        const blog = new Blog(request.body)
      
        this.blog
          .save()
          .then(result => {
            response.status(201).json(result)
          })
      }
}