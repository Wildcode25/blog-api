import { userSchema } from "../schemas/userSchema.js";
import mongoose from "mongoose";

export const User = mongoose.model('User', userSchema)