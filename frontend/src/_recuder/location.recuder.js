import {locationType} from '../_type/index'

const locationInitial = '';
export const location = (state = locationInitial, action)=>{
    switch (action.type) {
            case locationType.LOCATION:
                state= action.path;
                break;
            default:
            return  state;
    }
}
