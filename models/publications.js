const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const opts = { toJSON: { virtuals: true } };
const PublicationsSchema = new Schema({
  photo: { type: String, required: true },
  author: { type: String, required: true },
  avatar: { type: String, required: true },
  date: { type: String, required: true },
  type: { type: String, required: true },
  like: { type: String, required: true },
  comment: { type: String, required: true },
  caption: { type: String, required: true },
},
  opts
);

PublicationsSchema.virtual("url").get(function() {
  return `/publications/${this._id}`;
});

//Forçando que o nome da coleção seja utilizado em português (ao invés de inglês no plural)
module.exports = mongoose.model("publications", PublicationsSchema, "publications");