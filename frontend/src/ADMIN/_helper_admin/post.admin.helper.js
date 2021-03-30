import axios from "axios"

/** Get all post
 * @param none
 * @return { *status: true/false,data: list posts/error} 
 */
const getall = () => axios.get("/api/admin/post/getall").then(data => data.data);

/** update post
 * @param idPost
 * @return {status: true/false,data:} 
 */
// const update = (idPost)=> axios.put('/api/admin/post/update',{idPost:idPost}).then(data=> data.data);

/**
 * 
 * @param {*} idPost
 * @returns {*{status:boolen,data/error}} 
 */
const confirm = (id) => axios.put("/api/admin/post/confirm",{id:id}).then(data=>data.data);

export const managePostHelper = {
    getall:getall,
    // update:update,
    confirm:confirm
}