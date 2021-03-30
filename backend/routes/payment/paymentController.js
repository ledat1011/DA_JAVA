var express = require('express');

var router = express.Router();
var db = require('../../database');
var paypal = require('paypal-rest-sdk');
var URL = require("../../_type/url.type")
var mail = require('../../helpers/mail.helper');
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'ASZqe36bbJpdX4CLjNNqbH9Tva-AJEX1tcFUz6V_bcayi3RXTL2phg4-4LXDXGKiRCPIx0XDlXh-Wbt5',
    'client_secret': 'EEvnzHIHMny1sFaQe5LSAv3GwKOD5nsXCOmD5dxf-VhC27swb_xGwMdk61YQowVB8Hye7w0lcKDumRpW'
  });
/**
 * create payment
 * @param First_name
 * @param Last_name
 * @param Email 
 * @param price
 * @param idPost
 * @param Description
 */
router.post("/create",(req,res)=>{
    var {First_name,Last_name,PhoneNumber,Email,price,idPost,description} = req.body;
    price = (price/23000) ==0? 1.0: parseFloat(price/23000).toFixed(2).toString();
    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": URL.URL+"paymentdetail",
            "cancel_url": URL.URL
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "Đặt cọc",
                    "sku": description,
                    "price": price,
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": price
            },
            "description": "description"
        }]
    };

    paypal.payment.create(create_payment_json, function (err, payment) {
            if(err){
            console.log(err);
            res.send({status:false,err:err})
        }else{
            req.session.paymentInfor = {...req.body,paymentId:payment.id}  ;
            
            res.send({status:true, data:payment})
        }
    });
});

router.get("/excute",(req,res)=>{
    /** 
     * req.session.paymentInfor 
     * @param checkout
     * @param Fist_name
     * @param Last_name
     * @param PhoneNumber
     * @param Email
     * @param Idpost
     * @param description
     * @param idUser
     */
    const currentDate = new Date();
	var paymentInfor = req.session.paymentInfor;
    var payerId = req.query.PayerID;
    console.log(paymentInfor);
    var details = { "payer_id": payerId };
    paypal.payment.execute(paymentInfor.paymentId,details,async (err, payment)=>{
        if(err){
            console.log(err);
            res.send({status:false,err:err})
        }else{
            try{
                const code = Math.round((Math.random() * 9999));
                //checkuser reload page
                if((req.session.paymentIdEd||1) != paymentInfor.paymentId){
                    console.log(req.session.paymentIdEd);
                    console.log(paymentInfor.paymentId);
                db.DatCoc.create({
                    idPost: paymentInfor.idPost,
                    idUser: paymentInfor.idUser,
                    NgayXemPhong: new Date(paymentInfor.checkout),
                    code:code
                })
                db.DoanhThu.create({
                    Money:20000,
                    idUser:paymentInfor.idUser,
                    NgayNap : currentDate,
                    Ngay:currentDate.getDate(),
                    Thang:currentDate.getMonth() +1,
                    Nam:currentDate.getFullYear()

                })
                db.Post.update({
                    TrangThaiDatCoc:true
                },{
                    where:{
                        id:paymentInfor.idPost
                    }
                })
                db.ThongBao.create({
                    MoTa :paymentInfor.First_name + " " + paymentInfor.Last_name,
                    NoiDung:"Đã đặt thuê phòng của bạn",
                    NgayThongBao:new Date(),
                    link:"/chitet/"+paymentInfor.Idpost
                }).then(data=>{
                    db.ChiTietThongBao.create({
                        idThongBao: data.id,
                        idUser: paymentInfor.idUser,
                        status:false
                    })
                })
                mail.sendMail(paymentInfor.Email,"Thanh toán thành công","Mã đặt cọc của quý khách là " + code);
                req.session.paymentIdEd = paymentInfor.paymentId;
                }

                var post = await db.Post.findByPk(paymentInfor.idPost, {
                    attributes: ["DiaChi", "price", "avatar", "title"]
                })
                res.send({status:true, data:payment,infor: paymentInfor,post:post});
            }catch(e){
                res.send({status:false,err:e +""})
            }
          
           
        }
    })

})
/**
 * get infor payment
 * @param code
 */
router.get('/get/:code',(req,res)=>{
    db.DatCoc.findAll({
        where: {
            code: req.params.code
        }
    }).then(data=>{
        
    })
})
module.exports = router;