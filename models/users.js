const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const opts = { toJSON: { virtuals: true } };
const UsersSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
},
  opts
);

UsersSchema.virtual("url").get(function() {
  return `/users/${this._id}`;
});

//Forçando que o nome da coleção seja utilizado em português (ao invés de inglês no plural)
module.exports = mongoose.model("users", UsersSchema, "users");