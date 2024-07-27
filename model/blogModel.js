import mongoose from "../config/mongoDb.js";
import { blogSchema } from "../schemas/blogSchema.js";
export const Blog = mongoose.model('Blog', blogSchema)