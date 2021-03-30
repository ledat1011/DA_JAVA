import axios from "axios"
import { host } from "../_type";

const get = ()=> axios.get(host.Node+'/api/other/tienich').then(data=>data.data);

export const tienichHelper = {
    get:get
}