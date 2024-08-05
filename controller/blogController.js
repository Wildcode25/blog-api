export class BlogController {
  constructor(Blog, User) {
    this.BlogModel = Blog;
    this.UserModel = User;
  }
  getAllBlogs = async (req, res, next) => {
    try {
      const blogs = await this.BlogModel.find({}).populate('user', {username: 1});
      res.status(200).json(blogs);
    } catch (e) {
      console.error("Error getting " + e.message);
    }
  };

  createBlog = async (req, res, next) => {
    const newBlog = { likes: 0, ...req.body };
    try {
      const user = await this.UserModel.findOne({username: req.session.user.username})
      const blog = new this.BlogModel({
        ...newBlog,
        user: req.session.user.id
      });
      const createdBlog = await blog.save();
      user.notes = user.notes.concat(createdBlog._id)
      await user.save()
      res.status(201).json({createdBlog, message: {
        content: `Blog ${createdBlog.title} by ${createdBlog.author} is created`
      }});
    } catch (e) {
      next(e)
    }
  };
  updateBlog = async (req, res, next) => {
    const { id } = req.params;
    const blog = req.body;
    try {
      const updatedBlog = await this.BlogModel.findByIdAndUpdate(id, blog, {
        new: true,
      });
      res.status(203).json(updatedBlog);
    } catch (e) {
      next(e)
    }
  };
  deleteBlog = async (req, res)=>{
    const {id} = req.params

    try{
      const {user} = await this.BlogModel.findById(id)
     
      if( user.toString() !== req.session.user.id.toString() ) return res.status(401).json({message: "you are not the author"})
      await this.BlogModel.findByIdAndDelete(id)
      res.status(204).json({content: `blog delected successfuly`})
    }catch(e){
      console.error(e.message)
    } 
  }
}
