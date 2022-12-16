const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const opts = { toJSON: { virtuals: true } };
const TimelinesSchema = new Schema({
  title: { type: String, required: true },
  hour: { type: int, required: true },
  minute: { type: int, required: true },
  day: { type: String, required: true },
  color: { type: String, required: true },
},
  opts
);

AboutsSchema.virtual("url").get(function() {
  return `/timelines/${this._id}`;
});

//Forçando que o nome da coleção seja utilizado em português (ao invés de inglês no plural)
module.exports = mongoose.model("timelines", TimelinesSchema, "timelines");