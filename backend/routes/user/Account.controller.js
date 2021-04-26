var express = require('express');
const URL = require('../../_type/url.type').URL;
const jwtHelper = require("../../helpers/jwt.helper");
var router = express.Router();
var db = require('../../database');
var multer = require('multer');
const sendMail = require('../../helpers/mail.helper');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
})
function checkFileUpload(req, file, cb) {

    if (!file.originalname.match(/\.(jpg|png|JPEG|gif|HEIC|PNG|JPG|GIF)$/)) {
        cb(new Error("Bạn chỉ được upload file ảnh (png,jpg,JPEG,gif)"))
    } else {
        cb(null, true);
    }
}
var upload = multer(
    { storage: storage, fileFilter: checkFileUpload })

let tokenList = {};
let tokenConfirm ={};
// Thời gian sống của token
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "1h";
// Mã secretKey này phải được bảo mật tuyệt đối, các bạn có thể lưu vào biến môi trường hoặc file
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret-example-trungquandev.com-green-cat-a@";
// Thời gian sống của refreshToken
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "3650d";
// Mã secretKey này phải được bảo mật tuyệt đối, các bạn có thể lưu vào biến môi trường hoặc file
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "refresh-token-secret-example-trungquandev.com-green-cat-a@";

/* resign. */
router.post('/register', async function (req, res, next) {
    var data = req.body

    try {
        var checkResign = await db.User.findAndCountAll({
            where: {
                Email: data.Email,
                Id_LoaiDangNhap: 1
            }
        })
        if (checkResign.count == 0) {
            let newUser = await db.User.create({
                Email: data.Email,
                Id_LoaiDangNhap: 1,
                First_name: data.First_name,
                Last_name: data.Last_name,
                PhoneNumber: data.PhoneNumber,
                ConfirmEmaiil: false,
                Id_role: 2,
                Created_at: Date.now(),
                Money: 10000,
                PassWord: data.PassWord,
                block: false,
            })
            const accessToken = await jwtHelper.generateToken(newUser, accessTokenSecret, accessTokenLife);
            const refreshToken = await jwtHelper.generateToken(newUser, refreshTokenSecret, refreshTokenLife);
            tokenList[refreshToken] = { accessToken, refreshToken };
            tokenConfirm[newUser.id] = accessToken;
            sendMail.sendMailHTML(newUser.Email,"Xác thực đăng ký", `<span>Bạn đẵ đăng ký thành công mời bạn click vào đây để xác thực</span>	
            <a href="http://localhost:3000/confirm?idUser=${newUser.id}&confirmtoken=${accessToken}">Xác thự Email</a>`)
         
            res.json({ accessToken, refreshToken, user: newUser, status: true });
        } else {
            res.json({ status: false, error: "Tài khoản đã tồn tại" })
        }

    } catch (e) {
        res.json({ status: false, error: e.toString() })
        console.log(e);
    }

});

router.get("/get", async(req,res)=>{
    try{
        let user = await db.User.findByPk(1,{
            include:{
                model:db.User_roles
            }
        })
        res.json(user)
    }catch(e){
        console.log(e);
        res.json(e)
    }


})

router.put("/confirmemail", async(req,res)=>{
    const {idUser,confirmtoken} = req.body;
    if(confirmtoken == tokenConfirm[idUser]){
        try{
            await db.User.update({
                ConfirmEmaiil: true
            },{
                where:{
                    id:idUser
                }
            })
        }catch(e){
            res.json({ status: false, error: e })
        }
    }else{
        res.json({ status: false, error: "Thất bại" })
    }
   
})

/* login page */
router.post('/login', async (req, res, next) => {
    var data = req.body;

    try {
        var checklog = await db.User.findOne({
            where: {
                Email: data.Email,
                Id_LoaiDangNhap: 1,
                PassWord: data.PassWord
            },
            include: [{ model: db.User_roles }]
        })
        if (checklog == null) {
            res.send({ status: false, error: "Sai tài khoản hoặc mật khẩu" })
        } else {
            const wish_list = await db.SavePost.findAll({ where: { IdUser: checklog.id } });
            const accessToken = await jwtHelper.generateToken(checklog, accessTokenSecret, accessTokenLife);
            const refreshToken = await jwtHelper.generateToken(checklog, refreshTokenSecret, refreshTokenLife);
            // Lưu lại 2 mã access & Refresh token, với key chính là cái refreshToken để đảm bảo unique và không sợ hacker sửa đổi dữ liệu truyền lên.
            // lưu ý trong dự án thực tế, nên lưu chỗ khác, có thể lưu vào Redis hoặc DB
            tokenList[refreshToken] = { accessToken, refreshToken };
            res.json({ accessToken, refreshToken, user: checklog, wish_list: wish_list });
        }
    } catch (e) {
        console.log(e);
        res.send({ status: false, error: e })
    }
})
/** FaceBook login
 * @param Email
 * @param name
 * @param Pass 
 */
router.post('/facebooklogin', async (req, res) => {
    const { Email, name, Pass } = req.body;
    try {
        const checkUserExist = await db.User.findAll({
            where: {
                Email: Email,
                Id_LoaiDangNhap: 2
            }
        });
        let fullname = name.split(" ");
        if (checkUserExist.length === 0) {
            const create = await db.User.create({
                Email: Email,
                PassWord: Pass,
                ConfirmEmaiil: true,
                First_name: fullname[0],
                Last_name: fullname.filter((value, index) => index !== 0).toString().replace(",", " "),
                Id_LoaiDangNhap: 2,
                Id_role: 2,
                Created_at: new Date(),
                block: false,
            });
            let wish_list = await db.SavePost.findAll({ where: { IdUser: create.id } });
            const accessToken = await jwtHelper.generateToken(create, accessTokenSecret, accessTokenLife);
            const refreshToken = await jwtHelper.generateToken(create, refreshTokenSecret, refreshTokenLife);
            // Lưu lại 2 mã access & Refresh token, với key chính là cái refreshToken để đảm bảo unique và không sợ hacker sửa đổi dữ liệu truyền lên.
            // lưu ý trong dự án thực tế, nên lưu chỗ khác, có thể lưu vào Redis hoặc DB
            tokenList[refreshToken] = { accessToken, refreshToken };

            res.json({ status: true, accessToken, refreshToken, user: create, wish_list: wish_list });
        } else {
            let wish_list = await db.SavePost.findAll({ where: { IdUser: checkUserExist[0].id } });
            const accessToken = await jwtHelper.generateToken(checkUserExist[0], accessTokenSecret, accessTokenLife);
            const refreshToken = await jwtHelper.generateToken(checkUserExist[0], refreshTokenSecret, refreshTokenLife);
            // Lưu lại 2 mã access & Refresh token, với key chính là cái refreshToken để đảm bảo unique và không sợ hacker sửa đổi dữ liệu truyền lên.
            // lưu ý trong dự án thực tế, nên lưu chỗ khác, có thể lưu vào Redis hoặc DB
            tokenList[refreshToken] = { accessToken, refreshToken };
            res.json({ status: true, accessToken, refreshToken, user: checkUserExist[0], wish_list: wish_list });
        }
    } catch (e) {
        console.log(e);
        res.send({ status: false, error: e + "" })
    }

})

/**
 * controller refreshToken
 * @param {*} req 
 * @param {*} res 
 */
let refreshToken = async (req, res) => {
    // User gửi mã refresh token kèm theo trong body
    const refreshTokenFromClient = req.body.refreshToken;
    // debug("tokenList: ", tokenList);

    // Nếu như tồn tại refreshToken truyền lên và nó cũng nằm trong tokenList của chúng ta
    if (refreshTokenFromClient && (tokenList[refreshTokenFromClient])) {
        try {
            // Verify kiểm tra tính hợp lệ của cái refreshToken và lấy dữ liệu giải mã decoded 
            const decoded = await jwtHelper.verifyToken(refreshTokenFromClient, refreshTokenSecret);
            // Thông tin user lúc này các bạn có thể lấy thông qua biến decoded.data
            // có thể mở comment dòng debug bên dưới để xem là rõ nhé.
            // debug("decoded: ", decoded);
            const userFakeData = decoded.data;
            debug(`Thực hiện tạo mã Token trong bước gọi refresh Token, [thời gian sống vẫn là 1 giờ.]`);
            const accessToken = await jwtHelper.generateToken(userFakeData, accessTokenSecret, accessTokenLife);
            // gửi token mới về cho người dùng
            return res.status(200).json({ accessToken });
        } catch (error) {
            // Lưu ý trong dự án thực tế hãy bỏ dòng debug bên dưới, mình để đây để debug lỗi cho các bạn xem thôi
            debug(error);
            res.status(403).json({
                message: 'Invalid refresh token.',
            });
        }
    } else {
        // Không tìm thấy token trong request
        return res.status(403).send({
            message: 'No token provided.',
        });
    }
};

router.post("/refresh-token", refreshToken);
router.post('/auth', async (req, res, next) => {
    var token = req.body.token
    try {

        const check = await jwtHelper.verifyToken(token, accessTokenSecret).data;

        let wish_list = await db.SavePost.findAll({ where: { IdUser: check.data.id } });
        res.send({ user: check, status: true, wish_list: wish_list })

    } catch (e) {
        //await jwtHelper.
        console.log(e + "");
        res.send({ status: false, messege: e })
    }
})

router.get('/test', async function (req, res, next) {
    // Website you wish to allow to connect
    try {
        var detailConvenientInDatabase = await db.ChiTietTienIch.findAll({ where: { idPost: 6 } });
        var getConvenient = detailConvenientInDatabase.map(c => c.idTienIch);
        res.send(getConvenient);
    } catch (e) {
        res.json(e)
    }

})
router.post('/upload', upload.array('file', 12), async function (req, res, next) {
    res.status(200).send("ok")
})

router.put('/update', (req, res) => {
    var obj = { ...req.body };
    delete obj.id;
    console.log(req.body.id);
    db.User.update({
        ...obj
    }, {
        where: {
            id: req.body.id
        }
    }).then(data => {
        //get infor user after update
        db.User.findByPk(req.body.id).then(async user => {
            const accessToken = await jwtHelper.generateToken(user, accessTokenSecret, accessTokenLife);
            const refreshToken = await jwtHelper.generateToken(user, refreshTokenSecret, refreshTokenLife);
            // Lưu lại 2 mã access & Refresh token, với key chính là cái refreshToken để đảm bảo unique và không sợ hacker sửa đổi dữ liệu truyền lên.
            // lưu ý trong dự án thực tế, nên lưu chỗ khác, có thể lưu vào Redis hoặc DB
            tokenList[refreshToken] = { accessToken, refreshToken };
            res.send({ status: true, data: accessToken })
        })

    }).catch(e => { res.send({ status: false, error: e }) })
})
router.delete('/delete', (req, res) => {
    var obj = { ...req.body };
    delete obj.id;
    console.log(req.body.id);
    db.User.destroy({where:{id:req.body.id}}).then(data => {
        //get infor user after update
        res.send({ status: true, data: data })
    }).catch(e => { res.send({ status: false, error: e }) })
})



module.exports = router;