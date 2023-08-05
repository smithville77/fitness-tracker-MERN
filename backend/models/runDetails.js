const mongoose = require("mongoose");
const Schema = mongoose.Schema
const runSchema = new Schema({
  
    distance: Number,
    duration: Number,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  ,

})

const Run = mongoose.model("Run", runSchema);
module.exports = Run;

//git test