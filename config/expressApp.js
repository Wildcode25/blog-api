import express from 'express'
import cors from 'cors'
import { createBlogRouter } from '../routes/blogRouter.js'
import { Blog } from '../model/blogModel.js'
const app = express()




app.use(cors())
app.use(express.json())
app.use('/api/blogs/', createBlogRouter(Blog))

export {app}