var express = require('express');
var router = express.Router();
var db = require('../../database');

router.post('/create', async (req, res) => {
    var { idUser, idPost, content,pathName } = req.body;
console.log(new Date().toLocaleString());
    try {
        // add new comment
        var addNewComment = await db.BinhLuan.create({
            NoiDung: content,
            idPost: idPost,
            idUser: idUser,
            Created_at: new Date(),
            Update_at: Date.now()
        });

        //get infor user after comment
        var binhluan = await db.BinhLuan.findByPk(addNewComment.id, {
            include: db.User
        })
        var io = req.app.get("socketio");
        //create new nofiticate to owner
        db.Post.findByPk(idPost).then((data) => {
            db.ThongBao.create({
                NgayThongBao: new Date().toLocaleString(),
                NoiDung: " Vừa bình luận vào bài viết của bạn",
                MoTa:binhluan.user.First_name + " " + binhluan.user.Last_name ,
                link: pathName
            }).then((result) => {
            
                //check if not owner comment to post
                data.idUser != idUser && db.ChiTietThongBao.create({
                    idThongBao: result.id,
                    idUser: data.IdUser,
                    status: false
                }).catch(e => { res.send({ status: false, messege: e }) })
            }).catch(e => { res.send({ status: false, messege: e }) })
        });
        res.send({ status: true, messege: binhluan });
    } catch (e) {
        res.send({ status: false, messege: e })
    }

})
module.exports = router;