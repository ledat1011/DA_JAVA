import axios from 'axios'
export const typePostData = ()=> axios.get('/api/other/typepost').then( data => data.data)
