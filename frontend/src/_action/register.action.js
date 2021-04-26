import {userType} from "../_type"
import {register as _register} from "../_helper"
import {alert_success} from "./alert.action"
import {history} from '../_helper/index'
export const register =  (user,prevPath) => {
    return async dispatch =>{
    dispatch (request())
    try{
        var regis =  (await _register(user)).data;
        if(regis.status){
            localStorage.setItem("token",regis.accessToken);
            history.push(prevPath ||"/")
            dispatch(success(regis.user))
            dispatch(alert_success("Đăng ký thành công"))
        }else{
            dispatch(failure(regis.error))
        }
    }catch(e){
        dispatch(failure(e +" "))
    }
}
function request(){ return {type:userType.REGISTER_REQUEST}}
function success(user){return {type:userType.REGISTER_SUCCESS, user}}
function failure(err){return {type: userType.REGISTER_FAIL,err}}
}