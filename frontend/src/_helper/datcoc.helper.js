import axios from 'axios'

const get =(code)=> axios.get("/api/datcoc/get/"+code).then(data=>data.data);

export const datcocHelper = {
    get:get
}