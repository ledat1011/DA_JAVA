import axios from 'axios'
import { host } from '../_type';
const GET = (idUser) => axios.get(host.Node+'/api/thongbao/get',{params:{idUser:idUser}}).then(data => data.data);
const update = (id) => axios.put(host.Node+'/api/thongbao/update',{id:id}).then(data => data.data);
export const thongbaoHelper=  {
    GET:GET,
    UPDATE:update
}