var express = require('express');
var router = express.Router();
var db = require('../../database');

router.post("/create", async (req, res) => {
    console.log(req.body);
    var { idUser, idPost } = req.body;
    try {
        var create = await db.SavePost.create({
            IdPost: idPost,
            IdUser: idUser
        })
        res.send({ status: true, messeage: create })
    } catch (e) {
        res.send({ status: false, messeage: e })
       console.log(e +" ");
    }
})
router.delete("/delete", async (req, res) => {

    var { idUser, idPost } = req.body;
    try {
        var create = await db.SavePost.destroy({
            where: {
                IdPost: idPost,
                IdUser: idUser
            }
        })
        res.send({ status: true, messeage: create })
    } catch (e) {
        res.send({ status: false, messeage: e })
        throw e;
    }
})
router.get('/check', async (req, res) => {
    console.log(req.statusCode);
    if (req.statusCode == 304) {
        var { idUser, idPost } = req.query;
        console.log(req.query);
        try {
            var check = await db.SavePost.findAndCountAll({
                where: {
                    IdPost: idPost,
                    IdUser: idUser
                }
            })
            console.log(check);
            if (check.count === 0) {
                res.send(false)
            } else {
                res.send(true)
            }
        } catch (e) {
            res.send(false)
            throw e;
        }
    }


})
//for get list save post
router.get('/get/:idUser', async (req, res) => {
    const { idUser } = req.params;
    console.log(req.params);
    try {
        var wish_list = await db.SavePost.findAll({
            where:{
                IdUser:idUser
            },
            attributes:["IdPost"]
        })
        console.log(wish_list);
        res.send({ status: true, data: wish_list });
    } catch (e) {
        console.log(e +"");
        res.send({ status: false, error: e })
    }
})
// for my wish list
router.get('/v2/get/:idUser', async (req, res) => {
    const { idUser } = req.params;
    console.log(req.query);
    try {
        var wish_list = await db.SavePost.findAll({
            where:{
                IdUser:idUser
            },
            include:{
                model:db.Post,
                include: [{ model: db.FormPost }, { model: db.TypePost }]
                , attributes: ["title", "avatar", "price", "id"]
            },
  
            attributes:[]
        })
        res.send({ status: true, data: wish_list });
    } catch (e) {
        res.send({ status: false, error: e })
    }
})


module.exports = router;