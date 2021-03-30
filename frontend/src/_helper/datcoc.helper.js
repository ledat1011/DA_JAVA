import axios from 'axios'
import { host } from '../_type';

const get =(code)=> axios.get(host.Node+"/api/datcoc/get/"+code).then(data=>data.data);

export const datcocHelper = {
    get:get
}