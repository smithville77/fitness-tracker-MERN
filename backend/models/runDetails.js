const mongoose = require("mongoose");
const Schema = mongoose.Schema
const runSchema = new Schema({
  runID: {
    distance: Number,
    duration: Number,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },

})

const Run = mongoose.model("Run", runSchema);
module.exports = Run;