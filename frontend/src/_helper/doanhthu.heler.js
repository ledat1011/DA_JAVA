import axios from 'axios'

const GET =()=> axios.get('/api/doanhthu/get').then(data=>data.data);

export const doanhthuHeler ={
    GET:GET
}