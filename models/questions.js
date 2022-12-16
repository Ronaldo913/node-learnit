const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const opts = { toJSON: { virtuals: true } };
const QuestionsSchema = new Schema({
  title: { type: String, required: true },
  a: { type: String, required: true },
  b: { type: String, required: true },
  c: { type: String, required: true },
  d: { type: String, required: true },
  color: { type: String, required: true },
  answer: { type: String, required: true },
},
  opts
);

QuestionsSchema.virtual("url").get(function() {
  return `/questions/${this._id}`;
});

//Forçando que o nome da coleção seja utilizado em português (ao invés de inglês no plural)
module.exports = mongoose.model("questions", QuestionsSchema, "questions");