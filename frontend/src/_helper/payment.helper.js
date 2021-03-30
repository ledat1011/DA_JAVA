import axios from 'axios'

const create =(data)=> axios.post("/api/payment/create",data).then(data=>data.data);
const excute = (data)=> axios.get('/api/payment/excute',{params:data}).then(data=>data.data);
export const paymentHelper= {
    create:create,
    excute:excute
}