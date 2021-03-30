import axios from 'axios'
export const convenientData = ()=> axios.get('/api/other/convenient').then( data => data.data)
