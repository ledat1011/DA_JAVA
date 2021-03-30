var express = require('express');
const fs = require('fs')
var router = express.Router();
var db = require('../../database');
var { Op } = require("sequelize")


router.post('/create',(req,res)=>{
  const   {idPost,idUser, content_report, level} = req.body;
    db.Report.create({
        content_report:content_report,
        create_at: new Date(),
        idPost: idPost,
        idUser: idUser,
        level:level
    }).then(data=>{
        res.send({status:true,data:data})
    }).catch(error=>{
        res.json({status:false,error:error})
    })
})
router.get('/get/:idUser',(req,res)=>{
    const {idUser} = req.params;
    // db.Report.findAll({
    //     include:[{
    //         model:db.Post,
    //         where:{
    //             idUser:idUser
    //         },
    //         attributes: ["DiaChi", "price", "avatar", "title","id"],
    //         include:{
    //             model:db.User,
    //             attributes: ["id", "First_name", "Last_name", "Email", "PhoneNumber"],
    //         }
    //     },{
    //         model:db.User,
    //         attributes: ["id", "First_name", "Last_name", "Email", "PhoneNumber"],
    //     }]
    db.Post.findAll({
        where:{
            IdUser:idUser
        },
        include:[{
            model:db.Report,
            include:{
                model:db.User,
                attributes: ["id", "First_name", "Last_name", "Email", "PhoneNumber"],
            }
            
        },{
            model:db.User,
            attributes: ["id", "First_name", "Last_name", "Email", "PhoneNumber"],
        }],
        attributes: ["DiaChi", "price", "avatar", "title","id"],
  
    }).then((data=>{
        res.send({status:true,data:data})
    })).catch(error=>{
        res.json({status:false,error:error +""})
    })
    
})

module.exports = router;