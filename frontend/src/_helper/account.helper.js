import axios from "axios"

export const login = user=> axios.post("/api/account/login",user);
export const authentication = token => axios.post('/api/account/auth',{token:token})
export const register = (user)=>axios.post("/api/account/register",user)
const facebooklogin =(user)=> axios.post('/api/account/facebooklogin',user).then(data=> data.data)
const update = (obj)=>axios.put('/api/account/update',obj).then(data=>data.data);
export const accountHelper = {
    update:update,
    facebooklogin:facebooklogin
}