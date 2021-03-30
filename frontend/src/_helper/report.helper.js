import axios from "axios"

/**
 * 
 * @param {* idUser,idPost,content_report,level } reportObj 
 * @returns {* {status:boolen, data/error}}
 */
const create = (reportObj)=> axios.post('/api/report/create',reportObj).then(data=>data.data);
/**
 * 
 * @param {*} idUser 
 * @returns {* {status:boolen, data/error}}
 */
const get = (idUser)=> axios.get('/api/report/get/'+idUser).then(data=>data.data);
export const reportHeler = {
    create:create,
    get:get
}


