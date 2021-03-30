import {userType} from '../_type/index'

const registertInitial = {registered:false,err:false,user:null,prevPath:"",alert:''}
export const registration =  (state = registertInitial, action)=>{
    switch (action.type) {
        case userType.REGISTER_REQUEST:
           return {...state,registered:true};

        case userType.REGISTER_SUCCESS:
           return {...state,user: action.user,err:false,registered:false};

        case userType.REGISTER_FAIL:
           return {...state,err:true,alert:action.err,registered:false};
       
            default:
            return  state;
    }
}