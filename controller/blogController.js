export class BlogController {
  constructor(Blog) {
    this.BlogModel = Blog;
  }
  getAllBlogs = async (req, res, next) => {
    try {
      const blogs = await this.BlogModel.find({});
      res.status(200).json(blogs);
    } catch (e) {
      console.error("Error getting " + e.message);
    }
  };

  createBlog = async (req, res) => {
    const newBlog = { likes: 0, ...req.body };
    try {
      const blog = new this.BlogModel(newBlog);
      const createdBlog = await blog.save();
      res.status(201).json(createdBlog);
    } catch (e) {
      res.status(400).json();
    }
  };
  updateBlog = async (req, res) => {
    const { id } = req.body;
    const blog = req.body;
    try {
      const updatedBlog = await this.BlogModel.findByIdAndUpdate(id, blog, {
        new: true,
      });
      res.status(203).json(updatedBlog);
    } catch (e) {
      res.status(400).json();
    }
  };
  deleteBlog = async (req, res)=>{
    const {id} = req.params

    try{
      await this.BlogModel.findByIdAndDelete(id)
      res.status(204).json({})
    }catch(e){
      res.status(404).json({})
    } 
  }
}
