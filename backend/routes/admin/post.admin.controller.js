var express = require('express');
var router = express.Router();
var db = require('../../database');

router.get('/getall', (req, res) => {
    db.Post.findAll({
        where: {
            // status:true, // for admin
            confirm:true //for user
        },
        include: [
            { model: db.FormPost },
            { model: db.TypePost },
            {
                model: db.User,
                attributes: ["First_name", "Last_name", "Id", "PhoneNumber", "Email"]
            }],
        // attributes: ["title", "avatar", "price", "id", "lat", "lng", "DiaChi","Created_at","Update_at","TrangThaiDatCoc"]

    }).then(data => {
        res.send({ status: true, data: data })
    }).catch(e => {
        res.send({ status: false, error: e + "" })
    })
})

// confirm post
router.put("/confirm", (req, res) => {
    var { id } = req.body; // id post
    db.Post.update({
        status: true
    }, { where: { id: id } }).then((data)=>{
        res.json({status:true,data:data})
    }).catch(e=>{
        console.log(e);
        res.json({status:false,error:e})
    })
})


router.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    db.Post.destroy({ where: { id: id } })
        .then(data => res.send({ status: true, data: data }))
        .catch(err => res.send({ status: false, err: err }))

})


module.exports = router;