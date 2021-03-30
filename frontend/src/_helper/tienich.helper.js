import axios from "axios"

const get = ()=> axios.get('/api/other/tienich').then(data=>data.data);

export const tienichHelper = {
    get:get
}