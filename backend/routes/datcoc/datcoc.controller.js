var express = require('express');
var router = express.Router();
var db = require('../../database');

router.get("/get/:code",async (req,res)=>{
    try{
        const {code} = req.params;
        const get = await db.DatCoc.findAll({
                where:{
                    code:code
                },
                include:{
                    model:db.Post,
                    attributes: ["DiaChi", "price", "avatar", "title","id"],
                    include:{
                        model:db.User,
                        attributes: ["id", "First_name", "Last_name", "Email", "PhoneNumber"],
                    }
                }
        })
        res.send({ status: true, data: get });
    }catch(e){
        res.send({ status: false, error: e +"" });
    }
})

module.exports = router;