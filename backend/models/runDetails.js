const mongoose = require("mongoose");
const Schema = mongoose.Schema
const runSchema = new Schema({
  
    distance: Number,
    duration: Number,
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ,

})

const Run = mongoose.model("Run", runSchema);
module.exports = Run;

//git test