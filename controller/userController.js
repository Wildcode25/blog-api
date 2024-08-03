import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { SECRET } from "../config/dotenvConfig.js";
export class UserController {
  constructor(User) {
    this.UserModel = User;
  }
  getUsers = async (req, res) => {
    
    try {
      const users = await this.UserModel.find({});
      res.status(200).json(users);
    } catch (e) {
        next(e)
    }
  };
  createUser = async (req, res, next) => {
    if (!(req.body.username && req.body.password))
      return res.status(400).json({});

    try {
      const { username, password, name } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new this.UserModel({
        username,
        name,
        hashedPassword,
      });
      const createdUser = await user.save();

      res.status(201).json(createdUser);
    } catch (error) {
      next(error);
    }
  };
  userLogin = async (req, res, next) => {
    const { username, password } = req.body;
    console.log(username)
    try {
      const [user] = await this.UserModel.find({username});
      const passwordIsCorrect = await bcrypt.compare(password, user.hashedPassword);
      if (passwordIsCorrect) {
        const userForToken = {
            username: user.username,
            id: user._id
        }
        const token = jwt.sign(
            userForToken, 
            SECRET,
            { expiresIn: 60*60 }
          )
          
          return res
            .status(200)
            .send({ token, username: user.username, message: {
              content: `User logged successfuly`
            } })
          ;
      }
      res.status(400).json({ message: "incorrect password" });
    } catch (e) {
      next(e);
    }
  };
  
}
