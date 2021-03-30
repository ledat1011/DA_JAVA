import axios from "axios"
import {host} from "../_type/host.type"
export const login = user=> axios.post(host.Node+"/api/account/login",user);
export const authentication = token => axios.post(host.Node+'/api/account/auth',{token:token})
export const register = (user)=>axios.post(host.Node+"/api/account/register",user)
const facebooklogin =(user)=> axios.post(host.Node+'/api/account/facebooklogin',user).then(data=> data.data)
const update = (obj)=>axios.put(host.Node+'/api/account/update',obj).then(data=>data.data);
export const accountHelper = {
    update:update,
    facebooklogin:facebooklogin
}