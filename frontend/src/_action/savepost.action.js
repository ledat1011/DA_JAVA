import { savepostTypes } from "../_type/savepost.type"
import { savepost } from "../_helper/savepost.helper"

const checkSavePost = (idUser, idPost) => {
    return async dispatch => {
        try {
            var check = await savepost.check(idPost, idUser)
            console.log(check);
            dispatch(sucssess(check))
        } catch (e) {
            dispatch(fail(e))
        }
    }
    function sucssess(check) { return { type: savepostTypes.CHECK_SAVE_POST, check } }
    function fail(err) { return { type: savepostTypes.CHECK_SAVE_POST_FAILURE, err } }
}

/**
 * 
 * @param {*} idUser 
 * @returns {* data:[...]}
 */
const get = (idUser)=>{

    return async dispatch => {
        try {
            var get = await savepost.get(idUser)
            
            if(get.status){
                const list = get.data.map(c=> c.IdPost)
               
                dispatch(sucssess(list))
            }else{
                dispatch(fail(get.error))
            }
           
        } catch (e) {
            dispatch(fail(e))
        }
    }
    function sucssess(get) { return { type: savepostTypes.GET_SAVE_POST, data:get } }
    function fail(err) { return { type: savepostTypes.GET_SAVE_POST_FAILURE, err } }
}
/**
 * 
 * @param {*} idUser 
 * @param {*} idPost 
 */
const create = (idUser,idPost)=>{
    return async dispatch => {
        try {
            var create = await savepost.create(idPost,idUser)
            
            if(create.status){
                dispatch(sucssess(idPost))
            }else{
                dispatch(fail(get.error))
            }
           
        } catch (e) {
            dispatch(fail(e))
        }
    }
    function sucssess(idPost) { return { type: savepostTypes.ADD_SAVE_POST, idPost:idPost } }
    function fail(err) { return { type: savepostTypes.GET_SAVE_POST_FAILURE, err } }
}
const remove = (idUser,idPost)=>{
    return async dispatch => {
        try {
            var _remove = await savepost.delete(idPost,idUser)
                console.log(_remove);
            if(_remove.status){
                dispatch(sucssess(idPost))
            }else{
                dispatch(fail(get.error))
            }
           
        } catch (e) {
            dispatch(fail(e))
        }
    }
    function sucssess(idPost) { return { type: savepostTypes.REMOVE_SAVE_POST, idPost:idPost } }
    function fail(err) { return { type: savepostTypes.GET_SAVE_POST_FAILURE, err } }
}
export const savePostAction = {
    check: checkSavePost,
    get:get,
    create:create,
    remove:remove
}