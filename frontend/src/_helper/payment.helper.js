import axios from 'axios'
import { host } from '../_type';

const create =(data)=> axios.post(host.Node+"/api/payment/create",data).then(data=>data.data);
const excute = (data)=> axios.get(host.Node+'/api/payment/excute',{params:data}).then(data=>data.data);
export const paymentHelper= {
    create:create,
    excute:excute
}