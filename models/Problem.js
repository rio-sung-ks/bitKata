import mongoose from "mongoose";

/*

  TODO: Fill in the model specification

 */
const ProblemSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  completed_users: {
    type: Number,
  },
  difficulty_level: {
    type: Number,
  },
  description: {
    type: String,
  },
  tests: [
    {
      code: String,
      solution: mongoose.Schema.Types.Mixed,
    },
  ],
});

const model = mongoose.model("Problem", ProblemSchema, "problems");

export default model;
