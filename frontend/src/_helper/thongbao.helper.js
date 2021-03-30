import axios from 'axios'
const GET = (idUser) => axios.get('/api/thongbao/get',{params:{idUser:idUser}}).then(data => data.data);
const update = (id) => axios.put('/api/thongbao/update',{id:id}).then(data => data.data);
export const thongbaoHelper=  {
    GET:GET,
    UPDATE:update
}