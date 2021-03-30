import axios from 'axios'
import { host } from '../_type';

const GET =()=> axios.get(host.Node+'/api/doanhthu/get').then(data=>data.data);

export const doanhthuHeler ={
    GET:GET
}