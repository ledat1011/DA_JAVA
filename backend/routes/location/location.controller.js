var express = require('express');
var sequelize = require('sequelize');
var router = express.Router();
var db = require('../../database');
const Nominatim = require('nominatim-geocoder')
const geocoder = new Nominatim()



router.get('/province',async (req,res,next)=>{
    try{let province = await db.Province.findAll({
            attributes: { 
                include: [[sequelize.fn('COUNT', sequelize.col('posts.id')), 'postCounts']] 
            },
            include:{
                model:db.Post,
                attributes:[],
                where: {
                   status: true,
                   confirm:true,
                   TrangThaiDatCoc:false
                  },
                  required:false
                
            },group: ['province.id']
        });
        res.json(province);
    }catch(e){
        res.send(e)
    }
})

router.post('/district', async(req,res,next)=>{
    var id = req.body.id;
    try{
        var district = await db.District.findAll({
            where:{
                _province_id: id
            }
        })
        res.json(district)

    }catch(e){
        console.log(e);
    }
})


router.post('/ward', async(req,res,next)=>{
    var idP = req.body.idProvince;
    var idD = req.body.idDistrict
    try{
        var ward = await db.Ward.findAll({
            where:{
                _province_id: idP,
                _district_id: idD
            }
        })
        res.json(ward)

    }catch(e){
        console.log(e);
    }
})
router.get('/street',async (req,res)=>{
    var idP = req.query.idProvince;
    var idD = req.query.idDistrict;
    console.log("+++++++++++++++++++++++++");
    console.log(req.query);
    try{
        var ward = await db.Street.findAll({
            where:{
                _province_id: idP,
                _district_id: idD
            }
        })
        res.json(ward)

    }catch(e){
        console.log(e);
    }
})
module.exports = router;