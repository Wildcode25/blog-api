export class BlogController{
    constructor(Blog){
      this.BlogModel = Blog
    }
    getAllBlogs = async (req, res, next) => {
      try{
        const blogs = await this.BlogModel.find({})
        res.status(200).json(blogs)
      }catch(e){
        console.error("Error getting "+ e.message)
        next(error)
      }
        
          
      }
      
      createBlog =(request, response) => {
        const blog = new this.BlogModel()
        blog
          .save()
          .then(result => {
            response.status(201).json(result)
          })
      }
}