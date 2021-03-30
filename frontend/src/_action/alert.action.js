import {ALERT} from "../_type/index"

export function alert_success(message){return {type:ALERT.ALERT_SUCCESS,message }}
export function alert_clear(){return {type:ALERT.ALERT_CLEAR }}