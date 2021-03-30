import axios from "axios"

/** Get all user
 * @param none
 * @return {status: true/false,data: list user/err} 
 */
const getall = () => axios.get("/api/admin/user/getall").then(data => data.data);
const lock = (idUser) => axios.put("/api/admin/user/lockuser/" + idUser).then(data => data.data);
const unlock = (idUser) => axios.put('/api/admin/user/unlockuser' + idUser).then(data => data.data);
const get = (id) => axios.get('/api/admin/user/get/' + id).then(data => data.data);

export const manageUserHelper = {
    getall: getall,
    get: get,
    lock: lock,
    unlock: unlock
}

