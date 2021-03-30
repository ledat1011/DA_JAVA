
import { accountHelper, history } from '../_helper/index'
import { userType, ALERT, savepostTypes } from "../_type/index"
import { alert_success } from './alert.action'
import { login as logins, authentication, } from "../_helper/index"
import {socket} from "../_socket/socket.main"

const login = (user, prevPath) => {
    return async dispatch => {
        dispatch(request())
        try {
            var check = await logins(user);
            console.log(user);
            if (check.data.status === false) {
                dispatch(failure(check.data.error))
            } else {
                
                const wish_list = check.data.wish_list.map(c=>c.IdPost)
                dispatch({type:savepostTypes.GET_SAVE_POST,data:wish_list})
                history.push(prevPath || '/')
                localStorage.setItem('token', check.data.accessToken)
                localStorage.setItem('user', JSON.stringify(check.data.user))
                dispatch(success(check.data.user))
                socket.emit('userconnecton', check.data.user.id)
                dispatch(alert_success("Đăng nhập thành công"))
            }
        } catch (e) {
            dispatch(failure(e + ""))
        }
    }

    function request() { return { type: userType.LOGIN_REQUEST } }
    function success(user) { return { type: userType.LOGIN_SUCCESS, user } }
    function failure(err) { return { type: userType.LOGIN_FAIL, err } }
}
/** FaceBook login 
 * @param user
 * @param prevPath
 * @return status
 */
const facebooklogin = (user,prevPath)=>  {
    return async dispatch => {
        dispatch(request())
        try {
            var check = await accountHelper.facebooklogin(user);
            
            if (check.status === false) {
                dispatch(failure(check.error +""))
            } else {
                const wish_list = check.wish_list.map(c=>c.IdPost)
                dispatch({type:savepostTypes.GET_SAVE_POST,data:wish_list})
                history.push(prevPath || '/')
                localStorage.setItem('token', check.accessToken)
                // localStorage.setItem('user', JSON.stringify(check.data.user))
                dispatch(success(check.user))
                console.log(check);
                socket.emit('userconnecton', check.user.id)
                dispatch(alert_success("Đăng nhập thành công"))
            }
        } catch (e) {
            dispatch(failure(e + ""))
        }
    }

    function request() { return { type: userType.LOGIN_REQUEST } }
    function success(user) { return { type: userType.LOGIN_SUCCESS, user } }
    function failure(err) { return { type: userType.LOGIN_FAIL, err } }
}
const logout = () => {
    return dispatch => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch(success())
    }
    // function request(){ return {type:userType}}
    function success() { return { type: userType.LOGOUT } }
    // function failure(err){return {type: userType.LOGIN_FAIL,err}}
}

const getUser = () => {
    return async dispatch => {
        var token = localStorage.getItem('token');
     
        if (token) {
            try {
                var res = (await authentication(token)).data
              
                if(res.status){
                    const wish_list = res.wish_list.map(c=>c.IdPost) || [];
                    dispatch({type:savepostTypes.GET_SAVE_POST,data:wish_list})
                    dispatch(success(res.user.data ))
                    socket.emit('userconnecton', res.user.data.id)

                }else{
                    localStorage.removeItem('user');
                }
             
            } catch (e) {
                console.error(e +" ");
                dispatch({ type: "" })
            }
        } else {
            dispatch({ type: "" })
        }
        function success(user,) { return { type: userType.GETALL, user } }
    }
}
export const userAction = {
    login: login,
    logout: logout,
    getUser: getUser,
    facebooklogin:facebooklogin
}