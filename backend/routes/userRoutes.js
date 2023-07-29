const express = require('express');
const router = express.Router()

const UserController = require('../controllers/userController.js');







//Post Method
router.post('/newuser', UserController.createUser)

// //Get by ID Method
// router.get('/getOne/:id', (req, res) => {
//   res.send('Get by ID API')
// })

// //Update by ID Method
// router.patch('/update/:id', (req, res) => {
//   res.send('Update by ID API')
// })

// //Delete by ID Method
// router.delete('/delete/:id', (req, res) => {
//   res.send('Delete by ID API')
// })

module.exports = router;