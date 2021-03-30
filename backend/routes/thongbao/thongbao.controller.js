var express = require('express');
var router = express.Router();
var db = require("../../database")

router.get('/get', (req, res) => {
 
    var { idUser } = req.query;
    db.ChiTietThongBao.findAll({
        where: {
            idUser: idUser 
        },
        include: {
            model: db.ThongBao
        }
    }).then((data => {
        res.send(data)
    })).catch(e => {
        res.send(e)
        throw e;
    })
})
router.put('/update',(req,res)=>{
    const {id} = req.body;
    db.ChiTietThongBao.update({
        status:true,
    },{where:{id:id}})
    .then(data=>{res.send({status:true,data:data})})
    .catch(e=>res.send({status:false,data:e}))

})
module.exports = router;