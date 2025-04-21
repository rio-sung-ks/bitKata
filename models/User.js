import mongoose from "mongoose";

/*

  TODO: Fill in the model specification

 */
const UserSchema = new mongoose.Schema({
  name : String,
  email: String,
})

const model = mongoose.model("User", UserSchema);

export default model;
