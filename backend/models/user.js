const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true, 
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

//use bcrypt to salt and hash password
// userSchema.virtual('plainPassword').set(function(password) {
//   this.password = bcrypt.hashSync(password, 10)
// })


module.exports  = mongoose.model('User', userSchema);