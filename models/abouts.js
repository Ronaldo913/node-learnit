const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const opts = { toJSON: { virtuals: true } };
const AboutsSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  image: { type: String, required: true },
},
  opts
);

AboutsSchema.virtual("url").get(function() {
  return `/abouts/${this._id}`;
});

//Forçando que o nome da coleção seja utilizado em português (ao invés de inglês no plural)
module.exports = mongoose.model("abouts", AboutsSchema, "abouts");