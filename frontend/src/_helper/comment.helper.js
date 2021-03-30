import axios from 'axios';
import { host } from '../_type';

export const newCommnet = (param) => axios.post(host.Node+'/api/comment/create',{idUser:param.idUser,idPost:param.idPost,content:param.content,pathName:param.pathName}).then(data => data.data)