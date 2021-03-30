var express = require('express');
const fs = require('fs')
var router = express.Router();
var db = require('../../database');
var { Op } = require("sequelize")
const Nominatim = require('nominatim-geocoder')

const geocoder = new Nominatim()
const apicache = require('apicache');
let cache = apicache.middleware

var multer = require('multer');

// define where image saved
var storage = multer.diskStorage({
    destination: function (req, file, cb) { cb(null, './upload') },
    filename: function (req, file, cb) { cb(null, Date.now() + '-' + file.originalname); }
})
//validate imgae
function checkFileUpload(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|png|JPEG|gif|HEIC|PNG|JPG|GIF)$/)) {
        cb(new Error("Bạn chỉ được upload file ảnh (png,jpg,JPEG,gif)"))
    } else {
        cb(null, true);
    }
}

var upload = multer({ storage: storage, fileFilter: checkFileUpload })

/** 
 * .../api/getpost
 * @param
 * @returns all column in table posts
 */
router.get('/getpostbyprovince/:id', async (req, res) => {
    try {
        var post = await db.Post.findAll({
            where: {
                idProvince: req.params.id,
                status: true,
                TrangThaiDatCoc:false
            },
            include: [{ model: db.FormPost }, { model: db.TypePost }]
            , attributes: ["title", "avatar", "price", "id"]

        });
        res.json(post)
    } catch (e) {
        console.log(e);
        res.send({ status: false, messege: e })
    }
})

router.get('/getall', (req, res) => {
    db.Post.findAll({
        where: {
            // status:true,
            // confirm:true
        },
        include: [{ model: db.FormPost }, { model: db.TypePost }],
        attributes: ["title", "avatar", "price", "id", "lat", "lng", "DiaChi"]

    }).then(data => {
        res.send({ status: true, data: data })
    }).catch(e => {
        res.send({ status: false, error: e + "" })
    })
})
/** 
 * for Detail
 * .../api/getpostbyid
 * @param req.body.id
 * @returns one column specified by id in table posts
 */
router.get('/getpostbyid/:id', async (req, res) => {
    console.log(req.params);
    try {
        var post = await db.Post.findByPk(req.params.id, {
            include: [{
                model: db.Image
            }, {
                model: db.TienIch,
                include: db.LoaiTienIch
            }, {
                model: db.TypePost
            }, {
                model: db.FormPost
            }, {
                model: db.User,
                attributes: ["id", "First_name", "Last_name", "Email", "PhoneNumber"]
            }, {
                model: db.BinhLuan,
                include: {
                    model: db.User,
                    attributes: ["id", "First_name", "Last_name", "Email", "PhoneNumber"]
                },
            }, {
                model: db.User,
                attributes: ["id", "First_name", "Last_name", "Email", "PhoneNumber"],
                as: "danhgias",
            }, {
                model: db.SavePost
            },
            {
                model: db.Province
            }, {
                model: db.District
            }, {
                model: db.Ward
            }
            ]
        })
        // plus view
        db.Post.update({
            soLuongTruyCap: post.soLuongTruyCap +1
        },{
            where:{id:post.id}
        })
        res.json(post)
    } catch (e) {

        res.send({ status: false, messege: e })
    }
})
//for user
router.get('/v1/getpostbyid/:idUser', async(req,res)=>{
    const {idUser} = req.params;
    try{
        let my_list_post = await db.Post.findAll({
            where: {
                IdUser:idUser,
            },
            // attributes: ["DiaChi", "price", "avatar", "title","Update_at","Created_at","id"]
        })
        res.json({status:true,data:my_list_post})
    }catch(e){
        res.json({status:false,error:e +""})
    }
    
})
//for update
router.get('/v2/getpostbyid/:id', async (req, res) => {
    console.log(req.params);
    try {
        var post = await db.Post.findByPk(req.params.id, {
            include: [{
                model: db.Image
            }, {
                model: db.TienIch,
                include: db.LoaiTienIch
            }, {
                model: db.TypePost
            }, {
                model: db.FormPost
            },
            {
                model: db.Province
            }, {
                model: db.District
            }, {
                model: db.Ward
            }
            ]
        })
        res.json(post)
    } catch (e) {

        res.send({ status: false, messege: e })
    }
})
//for payment
router.get('/v3/getpostbyid/:id', async (req, res) => {
    console.log(req.params);
    try {
        var post = await db.Post.findByPk(req.params.id, {
            attributes: ["DiaChi", "price", "avatar", "title"]
        })
        res.json({ status: true, data: post })
    } catch (e) {

        res.send({ status: false, messege: e })
    }
})


/** 
 * .../api/post/create   
 * @param post
 * @param listfile
 * @returns new column of posts table have been created
 */
router.post('/create', upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'room', maxCount: 8 }]), async function (req, res, next) {

    var { fProvince, fDistrict, fWard, fStreet, fNumberAddress,
        fTypePost, fNamePost, fFormPost, acreage, roomNumber, bathroomNuber,
        kitchen, convenient, selectedRuleSmoke, selectedRulePet,
        selectedRuleParty, addRule, introduction, basicPrice,
        minPrice, maxPrice, user
    } = req.body;
    var data = req.body;
    var { room, avatar } = req.files
    var query = data.tNumberAdd.replace("số", "") + "," + data.tStreet.replace("-", "") + "," + data.tWard.replace("-", "") + "," + data.tDistrict.replace("-", "") + "," + data.tProvince + ",Viet Nam";
    // get Geo

    var Geocoding = await geocoder.search({ q: query });
    try {
        //create new post
        var newPost = await db.Post.create({
            DiaChi: `${data.tNumberAdd} ${data.tStreet}${data.tWard}${data.tDistrict} ${data.tProvince} `,
            Dientich: acreage,
            TrangThaiDatCoc: false,
            Created_at: new Date(),
            addRule: addRule,
            bathroomNuber: bathroomNuber,
            idDistrict: fDistrict,
            idStreet: fStreet,
            IdUser: user,

            idFormPost: fFormPost,
            idProvince: fProvince,
            idTypePost: fTypePost,
            idWard: fWard,
            introduction: introduction,
            kitchenNumber: kitchen,
            maxPrice: maxPrice,
            minPrice: minPrice,
            price: basicPrice,
            numberAddress: fNumberAddress,
            selectedRuleParty: selectedRuleParty,
            selectedRulePet: selectedRulePet,
            selectedRuleSmoke: selectedRuleSmoke,
            roomNumber: roomNumber,
            soLuongTruyCap: 0,
            tienDatCoc: basicPrice,
            title: fNamePost,
            avatar: avatar[0].filename,
            status: false,
            confirm: false,
            lat: Geocoding[0] == "undefined" ? null : Geocoding[0].lat,
            lng: Geocoding[0] == "undefined" ? null : Geocoding[0].lon
        })
        //insert covenient to detail convenient
        convenient.split(",").forEach(async (value) => {
            db.ChiTietTienIch.create({
                idPost: newPost.id,
                idTienIch: value
            })
        })
        //insert list image to image table
        room.forEach((value) => {
            db.Image.create({
                IdPost: newPost.id,
                img: value.filename
            })
        })
        res.json({ status: true, messege: newPost.id })
    } catch (e) {
        console.log(e);
        res.json({ status: true, messege: e })
    }
})

router.get("/confirm/:id", (req, res) => {
    console.log(req.params.id);
    db.Post.update({
        confirm: true
    }, {
        where: {
            id: req.params.id
        }
    }).then(data => {
        res.send({ status: true, data: data })
    }).catch(e => res.send({ status: false, error: e }))
})

router.put('/update', upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'room', maxCount: 8 }]), async function (req, res, next) {

    console.log(req.files);
    var { fProvince, fDistrict, fWard, fStreet, fNumberAddress,
        fTypePost, fNamePost, fFormPost, acreage, roomNumber, bathroomNuber,
        kitchen, convenient, selectedRuleSmoke, selectedRulePet,
        selectedRuleParty, addRule, introduction, basicPrice, image,
        minPrice, maxPrice, id
    } = req.body;

    var data = req.body;
    var { room, avatar } = req.files

    var img = JSON.parse(image);
    var checkChangeImg = img.avatar.fileList.filter(v => v.url);
    //test
    var resultCheck = checkChangeImg.length !== 0
        ? checkChangeImg[0].url.replace("http://localhost:4000/upload/", "")
        : avatar[0].filename;
    console.log(resultCheck);
    try {
        //create new post
        var update = await db.Post.update({
            DiaChi: `${data.tNumberAdd} ${data.tStreet}${data.tWard}${data.tDistrict} ${data.tProvince} `,
            Dientich: acreage,
            TrangThaiDatCoc: false,
            Update_at: new Date(),
            addRule: addRule,
            bathroomNuber: bathroomNuber,
            idDistrict: fDistrict,

            idFormPost: fFormPost,
            idProvince: fProvince,
            idTypePost: fTypePost,
            idWard: fWard,
            introduction: introduction,
            kitchenNumber: kitchen,
            maxPrice: maxPrice,
            minPrice: minPrice,
            price: basicPrice,
            numberAddress: fNumberAddress,
            selectedRuleParty: selectedRuleParty,
            selectedRulePet: selectedRulePet,
            selectedRuleSmoke: selectedRuleSmoke,
            roomNumber: roomNumber,
            soLuongTruyCap: 0,

            tienDatCoc: basicPrice,
            title: fNamePost,
            avatar: checkChangeImg.length !== 0
                ? checkChangeImg[0].url.replace("http://localhost:4000/upload/", "")
                : avatar[0].filename
        }, {
            where: {
                id: id
            }
        })
        var detailConvenientInDatabase = await db.ChiTietTienIch.findAll({ where: { idPost: id } });
        var getConvenient = detailConvenientInDatabase.map(c => c.idTienIch);
        var arrConvenient = convenient.split(",").map(c => parseInt(c));
        //add new item to detail convenient
        arrConvenient.forEach(async (value) => {
            !detailConvenientInDatabase.some(c => c.idTienIch == value) && db.ChiTietTienIch.create({
                idPost: id,
                idTienIch: value
            })
        })
        // remove convenient
        var convenientRemoved = getConvenient.filter(item => !arrConvenient.includes(item));
        convenientRemoved.forEach(val => db.ChiTietTienIch.destroy({ where: { idPost: id, idTienIch: val } }));
        // insert list image to image table
        if (req.files && req.files.room) {
            room.forEach((value) => {
                db.Image.create({
                    IdPost: id,
                    img: value.filename
                })
            })
        }
        res.json({ status: true, data: update })
    } catch (e) {
        res.json({ status: false, error: e })
       console.log(e);
    }
})

router.get('/search', (req, res) => {

     var arrTienIch = req.query.idTienIch == undefined?[]: req.query.idTienIch.split(",") || [];
    var minPrice = req.query.minPrice == undefined ? 0 : req.query.minPrice;
    var maxPrice = req.query.maxPrice == undefined ? 99999999999999999 : req.query.maxPrice;
    const priceCondition = (req.query.minPrice == undefined && req.query.maxPrice == undefined
        ? {}
        : {
            price: {
                [Op.between]: [parseInt(minPrice) ,parseInt (maxPrice)]
            }
        })
    const tienichCondition =arrTienIch.length ==0
    ?{}
    :{where:{idTienIch:[arrTienIch]}}
    req.query.idTienIch != undefined && delete req.query.idTienIch;
    req.query.maxPrice != undefined && delete req.query.maxPrice;
    req.query.minPrice != undefined && delete req.query.minPrice;
    db.Post.findAll({
        where: {
            ...req.query, status: true, confirm: true, ...priceCondition,TrangThaiDatCoc:false

        },
        include: [{ model: db.FormPost }, { model: db.TypePost },
            {model:db.ChiTietTienIch,...tienichCondition}
        ],
        order: [
          
            ['idProvince',"ASC"],
        ],
        attributes: ["title", "avatar", "price", "id"],
        
        

    }).then(data => {
      
        res.send({ status: true, data: data })
    }).catch(e => {
        console.log(e);
        res.send({ status: false, err: e+ "" })
    })
})
router.put('/deleteimg', async function (req, res, next) {
    const { URL, idPost, type } = req.body;
    const path = "./upload/" + URL;
    if (type == "avatar") {
        db.Post.update({ avatar: null },
            { where: { id: req.body.idPost } }).then(data => {
                fs.existsSync(path) && fs.unlink(path + URL, (err) => {
                    if (err) {
                        console.log(err);
                        res.send(err);
                        return;
                    }
                })

                res.send("ok")
            })
            .catch(e => { res.send(e); console.log(e); })
    } else {
        db.Image.destroy({ where: { IdPost: idPost, img: URL } })
            .then(success => {
                fs.existsSync(path) && fs.unlink(path, (err) => {
                    if (err) {
                        console.log(err);
                        res.send(err);
                        return;
                    }
                })

                res.send("ok")
            })
            .catch(e => { res.send(e); console.log(e); })
    }

})

router.get("/suggesstpost", (req, res) => {
    const { lat, lng } = req.query;
    let lats = lat ? lat : "10.799415399999999"
    let lngs = lng ? lng : "106.7116815"
    db.Project.findAll({
        where: {
            _lat: {
                [Op.between]: [lats - 0.1, lats]
            },
            _lng: {
                [Op.between]: [lngs - 0.1, lngs]
            }
        }
    }).then(async data => {
        data = data.filter((v, i, a) => a.findIndex(t => (t._district_id === v._district_id && t._province_id === v._province_id)) === i);

        var suggesst = await db.Post.findAll({
            where: {
                idDistrict: {
                    [Op.or]: data.map(m => m._district_id)
                },
                idProvince: data[0]._province_id,
                TrangThaiDatCoc:false,
                status:true,
                confirm:true
            },
            include: [{ model: db.FormPost }, { model: db.TypePost }]
            , attributes: ["title", "avatar", "price", "id", "lat", "lng", "DiaChi"]

        })
        res.send(suggesst)
    })
        .catch(e => res.send(e))
})

router.post('/upload', function (req, res, next) {
    res.status(200).send("ok")
})
module.exports = router;