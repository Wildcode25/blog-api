import mongoose from "mongoose";

export const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [3, "Password must be at least 3 characters long"]

  },
  username: {
    type: String,
    unique: true,
    required: true,
    minLength: [3, "Password must be at least 3 characters long"]
  },
  hashedPassword: String,
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    },
  ],
});


