import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a name"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  phone:{
    type: String,
  },
  email:{
    type:String,
    // required:[true,"Please enter an email"],
    // unique:true,
  },
  consent:{
    type:Boolean,
    default:false,
  },
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
