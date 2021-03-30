
var nodemailer = require('nodemailer');
var db = require('../database');




const sendMail =  (toEmail,subject,content)=>{

    return new Promise( async(resolve,reject)=>{
        try{
            const mail = await db.Mail.findOne({where:{using:true}});
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: mail.gmail ,
                  pass: mail.pass
                }
              });
              var mailOptions = {
                from: mail.email ,
                to: toEmail,
                subject: subject,
                text: content,
                // html: 'Embedded image: <img src="cid:unique@kreata.ee"/>',
                // attachments: [{
                //     filename: 'image.png',
                //     path: '../upload/1607768952097-room_28615_127_1564480685.jpg',
                //     cid: 'unique@kreata.ee' //same cid value as in the html img src
                // }]
              };
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    return reject(new Error(error));
                } else {
                  resolve(info);
                }
              });
        }catch(e){
            return reject(new Error(e));
        }
    })

    
}
const sendMailHTML =  (toEmail,subject,content)=>{

  return new Promise( async(resolve,reject)=>{
      try{
          const mail = await db.Mail.findOne({where:{using:true}});
          var transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: mail.gmail ,
                pass: mail.pass
              }
            });
            var mailOptions = {
              from: mail.email ,
              to: toEmail,
              subject: subject,
              // text: content,
                html: content,
              // html: 'Embedded image: <img src="cid:unique@kreata.ee"/>',
              // attachments: [{
              //     filename: 'image.png',
              //     path: '../upload/1607768952097-room_28615_127_1564480685.jpg',
              //     cid: 'unique@kreata.ee' //same cid value as in the html img src
              // }]
            };
            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                  return reject(new Error(error));
              } else {
                resolve(info);
              }
            });
      }catch(e){
          return reject(new Error(e));
      }
  })

  
}
module.exports = {
    sendMail:sendMail,
    sendMailHTML:sendMailHTML
};
// sendMail("ledat10111999@gmail.com","Tiltle","Ez").then(data=>{
//     console.log(data);
// }).catch(e=>{
//     console.log(e);
// })
