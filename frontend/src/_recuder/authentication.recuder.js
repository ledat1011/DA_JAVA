import {userType,savepostTypes} from '../_type/index'

const accountInitial = {loggedIn:false,err:false,user:null,prevPath:"",isSavePost:false,alert:""}
export const authentication =  (state = accountInitial, action)=>{
    switch (action.type) {
        case userType.LOGIN_REQUEST:
           return {...state,loggedIn:true};
        case userType.LOGIN_SUCCESS:
           return {...state,user: action.user,err:false,alert:""};
        case userType.LOGIN_FAIL:
           return {...state,err:true,alert:action.err,loggedIn:false};
        case userType.GETALL:
            return{...state,user:action.user,loggedIn:true,alert:""}
        case userType.LOGOUT:
                return{...state, err: false,user:null,prevPath:"",loggedIn:false}
        // case savepostTypes.CHECK_SAVE_POST:
        //     return{...state,isSavePost:action.check}
        default:
            return  state;
    }
}