import mongoose from "../config/mongoDb.js";

export const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })