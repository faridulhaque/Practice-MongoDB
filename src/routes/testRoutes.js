const express = require('express');
const { testSomething } = require('../controllers/testController');
const router = express.Router();

router.get("/", testSomething)


module.exports=router;