import {savepostTypes} from "../_type/savepost.type"

 const savepostInitial =[];
 export const savepost =  (state = savepostInitial, action)=>{
    switch (action.type) {
        case savepostTypes.GET_SAVE_POST:
            return  action.data;
        case savepostTypes.ADD_SAVE_POST:
          
            return [...state,action.idPost];
        case savepostTypes.REMOVE_SAVE_POST:
            return state.filter(c=> c!= action.idPost);
        default:
           return state
    
    }
 }