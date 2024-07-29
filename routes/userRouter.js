import { Router } from "express"
import { UserController } from "../controller/userController.js"

export const createUserRouter = (User)=>{
    const userController = new UserController(User)
    const userRouter = new Router();

    // userRouter.get('/', userController.getUsers)
    userRouter.post('/', userController.createUser)
    return userRouter
}