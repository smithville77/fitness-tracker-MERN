const express = require('express');
const User = require('../models/userModel');


const router = express.Router()




//Post Method
router.post('/post', (req, res) => {
  const { username, email, password, dateOfBirth, height, weight } = req.body;

  // Create a new user instance based on the User schema
  const user = new User({
    username: username,
    email,
    password,
    dateOfBirth,
    height,
    weight
  });
  user.save((error) => {
    if (!error) {
      console.log("User successfully created", user)
    } else {
      console.log(error)
    }
  })
})

//Get all Method
router.get('/getAll', (req, res) => {
  res.send('Get All API')
})

//Get by ID Method
router.get('/getOne/:id', (req, res) => {
  res.send('Get by ID API')
})

//Update by ID Method
router.patch('/update/:id', (req, res) => {
  res.send('Update by ID API')
})

//Delete by ID Method
router.delete('/delete/:id', (req, res) => {
  res.send('Delete by ID API')
})

module.exports = router;