import axios from 'axios'
import { host } from '../_type';
export const GET_POST_BY_PROVINCE = (idProvince) => axios.get(host.Java+'/api/post/getpostbyprovince/' + idProvince).then(data => data.data)
/**
 * for detail
 * @param {*} id
 * @URL  /api/post/getpostbyid/:id
 */
export const getPostById = (id) => axios.get(host.Node+'/api/post/getpostbyid/' + id).then(data => data.data)
//for uppdate 
export const getPostByIdV2 = (id) => axios.get(host.Node+'/api/post/v2/getpostbyid/' + id).then(data => data.data);
//for payment
export const getPostByIdV3 = (id) => axios.get(host.Node+'/api/post/v3/getpostbyid/' + id).then(data => data.data);

/**
 * 
 * @param {*} idUser
 * @returns {*{status:boolen,data/error} } 
 */
export const getPostByIdV1 =(idUser)=> axios.get(host.Java+'/api/post/v1/getpostbyid/'+idUser).then(data=>data.data);

const suggesst = (location) => axios.get(host.Node+"/api/post/suggesstpost", { params: location }).then(data => data.data);
const create = (data) => axios.post(host.Node+`/api/post/create`, data, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
}).then(data => data.data)
const search = (data) => axios.get(host.Java+`/api/post/search`, { params: data }).then(data => data.data)
/**
 * 
 * @param {*} id
 * @returns {* status:true/fale, data/error} 
 */
const confirm = (id)=> axios.get(host.Node+"/api/post/confirm/"+id).then(data=>data.data)
const getall = ()=> axios.get(host.Node+'/api/post/getall').then(data=>data.data)
export const postHelper = {
  create: create,
  search: search,
  suggesst: suggesst,
  confirm:confirm,
  getall:getall
}
