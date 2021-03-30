var express = require('express');

const jwtHelper = require("../../helpers/jwt.helper");

var router = express.Router();
var db = require('../../database');

router.get('/convenient',async (req,res)=>{
    try{
        var data = await db.LoaiTienIch.findAll({
            include:{
                model:db.TienIch
            }
        })
        res.json(data)
    }catch(e){
        res.json({status:false,messege:e})
    }
  
})
router.get('/typepost',async (req,res)=>{
    try{
        var data = await db.TypePost.findAll()
        res.json(data)
    }catch(e){
        res.json({status:false,messege:e})
    }
  
})
router.get('/formpost',async (req,res)=>{
    try{
        var data = await db.FormPost.findAll()
        res.json(data)
    }catch(e){
        res.json({status:false,messege:e})
    }
  
})

//get table Tien ich

router.get('/tienich',(req,res)=>{
    db.TienIch.findAll().then(data=>{
        
        res.send({status:true,data:data})
    }).catch((err)=>{
        console.log(err);
        res.send({status:false,error:err})})
})
module.exports = router;