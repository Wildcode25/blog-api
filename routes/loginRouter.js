import { Router } from "express";
import { UserController } from "../controller/userController.js";

export function createLoginRouter(User){
    const loginRouter = new Router()
    const userController = new UserController(User)
    loginRouter.post('/login', userController.userLogin)
    loginRouter.post('/register', userController.createUser)

    return loginRouter
}