var express = require('express');

var router = express.Router();
var db = require('../../database');

router.get("/get",(req,res)=>{
    console.log(req.body);
})


module.exports = router;