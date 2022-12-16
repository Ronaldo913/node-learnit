const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const opts = { toJSON: { virtuals: true } };
const PackagesSchema = new Schema({
  imagem: { type: String, required: true },
  titulo: { type: String, required: true },
  desconto: { type: String, required: true },
  precoAtual: { type: String, required: true },
  precoAntigo: { type: String, required: true },
},
  opts
);

PackagesSchema.virtual("url").get(function() {
  return `/packages/${this._id}`;
});

//Forçando que o nome da coleção seja utilizado em português (ao invés de inglês no plural)
module.exports = mongoose.model("packages", PackagesSchema, "packages");