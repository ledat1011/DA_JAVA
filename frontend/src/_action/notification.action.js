import {notificationTypes} from "../_type/notification.type"


export function createNotificate(messeage){
    return dispatch=>{
        dispatch(notification_success(messeage))
    }
}
export function clearNotificate(){
    return dispatch=>{
        dispatch(notification_clear())
    }
}
 function notification_success(message){return {type:notificationTypes.CREATE_NOTIFICATION,message }}
 function notification_clear(){return {type:notificationTypes.CLEAR_NOTIFICATION }}