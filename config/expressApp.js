import express from 'express'
import cors from 'cors'
import { createBlogRouter } from '../routes/blogRouter.js'
import { createUserRouter } from '../routes/userRouter.js'
import { Blog } from '../model/blogModel.js'
import { User } from '../model/userModel.js'
const app = express()




app.use(cors())
app.use(express.json())
app.use('/api/blogs', createBlogRouter(Blog))
app.use('/api/users', createUserRouter(User))

export {app}