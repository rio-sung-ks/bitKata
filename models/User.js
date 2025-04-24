
import mongoose from "mongoose";

/*

  TODO: Fill in the model specification

 */
const UserSchema = new mongoose.Schema({
  githubId: String,
});

const model = mongoose.model("User", UserSchema);

export default model;