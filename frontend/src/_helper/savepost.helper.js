import axios from 'axios'
import { host } from '../_type';
 const create = (idPost,idUser)=> axios.post(host.Java+'/api/savepost/create',{IdPost:idPost,IdUser:idUser}).then( data => data.data)
 /**
  * 
  * @param {*} idPost 
  * @param {*} idUser
  * @returns {* {status:boolen, messeage :""} } 
  */
 const _delete = (idPost,idUser)=> axios.delete(host.Node+'/api/savepost/delete',{data:{idUser:idUser,idPost:idPost}}).then( data => data.data)
 const check = (idPost,idUser)=> axios.get(host.Node+'/api/savepost/check',{params:{idPost:idPost,idUser:idUser}}).then( data => data.data);
 
 /**
  * 
  * @param {*} idUser 
  * @returns {* {status:boolen, data:[...]/error: string}}
  */
 const get = (idUser)=>  axios.get(host.Node+'/api/savepost/get/'+idUser).then(data=>data.data);
 const getV2 = (idUser)=>  axios.get(host.Node+'/api/savepost/v2/get/'+idUser).then(data=>data.data);
 export const savepost={
     create:create,
     delete:_delete,
     check:check,
     get:get,
     getV2:getV2
 }


