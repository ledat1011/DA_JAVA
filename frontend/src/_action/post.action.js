import {postType} from "../_type/post.type";

function preview_post(valueOfPost){
    return dispatch =>{
        dispatch(success(valueOfPost));
    }
    function success(data){return {type:postType.PREVIEW, data}}
}
function clear_preview(){
    return dispatch =>{
        dispatch(success());
    }
    function success(){return {type:postType.CLEAR_PREVIEW}}
}
export const post_action ={
    preview:preview_post,
    clear_preview:clear_preview
}