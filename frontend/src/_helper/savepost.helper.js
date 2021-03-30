import axios from 'axios'
 const create = (idPost,idUser)=> axios.post('/api/savepost/create',{idPost:idPost,idUser:idUser}).then( data => data.data)
 /**
  * 
  * @param {*} idPost 
  * @param {*} idUser
  * @returns {* {status:boolen, messeage :""} } 
  */
 const _delete = (idPost,idUser)=> axios.delete('/api/savepost/delete',{data:{idUser:idUser,idPost:idPost}}).then( data => data.data)
 const check = (idPost,idUser)=> axios.get('/api/savepost/check',{params:{idPost:idPost,idUser:idUser}}).then( data => data.data);
 
 /**
  * 
  * @param {*} idUser 
  * @returns {* {status:boolen, data:[...]/error: string}}
  */
 const get = (idUser)=>  axios.get('/api/savepost/get/'+idUser).then(data=>data.data);
 const getV2 = (idUser)=>  axios.get('/api/savepost/v2/get/'+idUser).then(data=>data.data);
 export const savepost={
     create:create,
     delete:_delete,
     check:check,
     get:get,
     getV2:getV2
 }


