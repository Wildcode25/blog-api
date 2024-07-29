import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { SALT } from '../config/dotenvConfig.js'
export class UserController{
    constructor(User){
        this.UserModel = User
    }
    createUser = async (req, res)=>{
         if(!(req.body.username && req.body.password)) res.status(400).json({})
        try{
            const {username, password, name} = req.body
            const hashedPassword = await bcrypt.hash(password, 10)
            console.log(hashedPassword)
            const user = new this.UserModel({
                username,
                name,
                hashedPassword
            })
            const createdUser = await user.save()
            console.log(createdUser.hashedPassword)
            res.status(201).json()
        }catch(e){

        }
    }

}