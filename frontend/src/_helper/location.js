import axios from 'axios';
export const provinceData = ()=> axios.get('/api/location/province').then( data => data.data)
export const districtData=(id)=>  axios.post('/api/location/district',{id:id}).then(data => data.data)
export const wardData=(idp,idd)=>  axios.post('/api/location/ward',{idProvince:idp,idDistrict: idd}).then(data => data.data)
export const streetData=(idp,idd)=>  axios.get('/api/location/street',{params:{ idProvince:idp,idDistrict: idd}}).then(data => data.data)