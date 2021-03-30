var express = require('express');

var router = express.Router();
var db = require('./database');


router.get('/test', async(req,res)=>{
  const io = req.app.get("socket");
  io.emit("pushnofiticate", {user:"TEST",
  message:"Đã bình luận về bài viết Của bạn ",
  idPost:15})
  res.send("ok")
})

module.exports = router