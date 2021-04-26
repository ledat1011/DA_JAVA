var express = require('express');
var router = express.Router();
var db = require('../../database');

router.get('/getall',(req,res)=>{
    db.User.findAll(
        {include:[{model:db.User_roles ,include :db.Role},{model:db.LoaiDangNhap}]}
    )
    .then(data=>{
        res.send({status:true,data:data})
    }).catch(e=>{res.send({status:false,error:e})})

})

router.put('/lockuser/:idUser',(req,res)=>{
    var {idUser} = req.params;
    db.User.update({
        block:true
    },{where:{
        id:idUser
    }}).then(data=>{
        res.send({status:true,data:data})
    }).catch(e=> res.send({status:false,err:e}))
})

router.put('/unlockuser/:idUser',(req,res)=>{
    var {idUser} = req.params;

    db.User.update({
        block:false
    },{where:{
        id:idUser
    }}).then(data=>{
        res.send({status:true,data:data})
    }).catch(e=> res.send({status:false,err:e}))
})

router.delete('/deleteuser/:idUser',(req,res)=>{
    var {idUser} = req.params;

    db.User.destroy({
       where:{
        id:idUser
    }}).then(data=>{
        res.send({status:true,data:data})
    }).catch(e=> res.send({status:false,err:e}))
})

router.get("/get/:id",(req,res)=>{
    var {id} = req.params;
    db.User.findByPk(id,{
        include:{model:db.User_roles}
    })
    .then(data=> res.send({status:true,data:data}))
    .catch(e=> res.send({status:false,error:e}));
})

module.exports = router;