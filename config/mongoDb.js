import { MONGODB_URL } from "./dotenvConfig.js";
import mongoose from "mongoose";
mongoose.set('strictQuery', false)
mongoose.connect(MONGODB_URL)
export default mongoose