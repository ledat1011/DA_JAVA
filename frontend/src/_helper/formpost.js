import axios from 'axios'
export const formpostData = ()=> axios.get('/api/other/formpost').then( data => data.data)
