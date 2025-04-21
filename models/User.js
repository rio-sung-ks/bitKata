import mongoose from "mongoose";
import findOrCreate from 'mongoose-findorcreate';

/*

  TODO: Fill in the model specification

 */
const UserSchema = new mongoose.Schema({
  name : String,
  email: String,
})

UserSchema.plugin(findOrCreate);
const model = mongoose.model("User", UserSchema);

export default model;
