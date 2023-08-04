const express = require('express');
const router = express.Router()

const UserController = require('../controllers/userController.js');



//Post Method
router.post('/newuser', UserController.createUser)

// //Get by username Method
router.get('/getuser/:username', UserController.getUser)

// Get user by ID method;
router.get('/getuserID/:id', UserController.getUserByID)


// user login route 
router.post('/login', UserController.userLogin)

// //Update by ID Method
// router.patch('/update/:id', (req, res) => {
//   res.send('Update by ID API')
// })

// //Delete by ID Method
// router.delete('/delete/:id', (req, res) => {
//   res.send('Delete by ID API')
// })

module.exports = router;