const express = require('express');
const router = express.Router();
const controller = require("../controllers/user.controller");

router.get('/getFanState',(req,res) => controller.getFanState(req,res));
router.patch('/updateFanState',  (req,res) => controller.updateFanState(req,res));

module.exports = router;