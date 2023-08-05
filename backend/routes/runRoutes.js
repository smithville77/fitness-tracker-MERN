const express = require('express');
const router = express.Router();

const RunController = require("../controllers/runController");
const authenticateUser = require('../middlewares/authMiddleware');


router.post("/newrun", authenticateUser, RunController.createRun);


module.exports = router;
