import mongoose from "mongoose";
// Define the User schema
const YogaUserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const User = mongoose.models.YogaUser ||mongoose.model("YogaUser", YogaUserSchema);
export {User};