import express from 'express'
import cors from 'cors'
import { createBlogRouter } from '../routes/blogRouter.js'
import { createUserRouter } from '../routes/userRouter.js'
import { Blog } from '../model/blogModel.js'
import { User } from '../model/userModel.js'
import { errorHandler, tokenExtractor, userExtractor } from '../utils/middlewers.js'
import { createLoginRouter } from '../routes/loginRouter.js'
const app = express()




app.use(cors())
app.use(express.json())

app.use('/api', createLoginRouter(User))
app.use(tokenExtractor)
app.use(userExtractor)
app.use('/api/blogs', createBlogRouter(Blog, User))
app.use('/api/users', createUserRouter(User))
app.use(errorHandler)
export {app}