var express = require('express');
const fs = require('fs')
var router = express.Router();
var db = require('../../database');
var { Op } = require("sequelize");
var sequelize = require('sequelize');

router.get('/get', async (req,res)=>{
    try{
        var total = await db.DoanhThu.findAll({
            where:{
                Nam:new Date().getFullYear()
            },
            attributes: [
                'Thang',
                [sequelize.fn('sum', sequelize.col('Money')), 'total_amount'],
                "Nam",
                
              ],
              group: ['Thang',"Nam"],
        
              
           })
           res.send({status:true,data:total})
    }catch(e){
        console.log(e);
        res.send({status:false,error:e +""});
    }
 
})


module.exports = router;