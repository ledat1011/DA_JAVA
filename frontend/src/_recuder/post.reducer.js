import {postType} from '../_type/post.type'

export const post =( state ={},action)=>{
    switch (action.type) {
        case postType.PREVIEW:
                return state = action.data;
        case postType.CLEAR_PREVIEW:
            return state;
        default:
            return state;
    }
}