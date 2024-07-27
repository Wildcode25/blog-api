import { MONGODB_URL } from "./dotenvConfig.js";
import mongoose from "mongoose";
mongoose.connect(MONGODB_URL)
export default mongoose