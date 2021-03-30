import axios from 'axios';

export const newCommnet = (param) => axios.post('/api/comment/create',{idUser:param.idUser,idPost:param.idPost,content:param.content,pathName:param.pathName}).then(data => data.data)