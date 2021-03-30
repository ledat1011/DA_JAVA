var db = require('../database');
let socket_id = [];
let userID={};
module.exports = function(io){
    io.on("connection", (socket) => {
        console.log('server connected');
    
        socket.on('userconnecton',(idUser)=>{

            userID[idUser] = socket.id;
            console.log(userID);
        })
 
        if (socket_id[0] === socket.id) {
            // remove the connection listener for any subsequent 
            // connections with the same ID
            io.removeAllListeners('connection');
        }
        socket.on('newcomment', async(param)=>{
        socket.emit("addcomment", await db.BinhLuan.findAll({where:{idPost:param.idPost} ,include :db.User}) )
        socket.broadcast.emit("addcomment", await db.BinhLuan.findAll({where:{idPost:param.idPost} ,include :db.User}));
        db.Post.findByPk(param.idPost).then(value =>{
            db.User.findByPk(param.idUser).then(data=>{
                var checkUserOnline = Object.keys(userID).some(c=> c == value.IdUser);
                checkUserOnline && socket.broadcast
                .to(userID[value.IdUser])
                .emit("pushnofiticate",
                {user:data.First_name +" "+ data.Last_name,
                 message:"Đã bình luận về bài viết Của bạn ",
                 idPost:param.idPost});
            })     
        }).catch(e=>console.log(e))
         
       }) 
            
    })

  
    
}