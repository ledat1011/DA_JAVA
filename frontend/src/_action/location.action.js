import {locationType} from "../_type/index"
 export const prevPath =  (path ='/') => {
    return  dispatch =>{
     dispatch({
         type: locationType.LOCATION,
         path
     })
}
}
