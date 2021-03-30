import axios from "axios"
import { host } from "../_type";

/**
 * 
 * @param {* idUser,idPost,content_report,level } reportObj 
 * @returns {* {status:boolen, data/error}}
 */
const create = (reportObj)=> axios.post(host.Node+'/api/report/create',reportObj).then(data=>data.data);
/**
 * 
 * @param {*} idUser 
 * @returns {* {status:boolen, data/error}}
 */
const get = (idUser)=> axios.get(host.Node+'/api/report/get/'+idUser).then(data=>data.data);
export const reportHeler = {
    create:create,
    get:get
}


