
import {admin_Auth_type} from "../_type_admin/authentication.type.admin"

const login = (user, prevPath ="/") => {
    return async dispatch => {
        dispatch(request())
        try {
            var check = await logins(user);
            
            if (check.data === false) {
                dispatch(failure(ALERT.ALERT_ACCOUNT_LOGIN_FAIL))
            } else {

                history.push(prevPath )
                localStorage.setItem('adminToken', check.data.accessToken)
                dispatch(success(check.data.user))
                socket.emit('adminconnection', check.data.user.id)
                dispatch(alert_success("Đăng nhập thành công"))
            }
        } catch (e) {
            dispatch(failure(e + ""))
        }
    }

    function request() { return { type: admin_Auth_type.ADMIN_LOGIN_REQEST } }
    function success(user) { return { type: admin_Auth_type.ADMIN_LOGIN_SUCCESS, user } }
    function failure(err) { return { type: admin_Auth_type.ADMIN_LOGIN_FAILTURE, err } }
}
export const adminAction ={
    login:login
} 