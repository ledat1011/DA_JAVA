import axios from 'axios';
import { host } from '../_type';
export const provinceData = ()=> axios.get(host.Java+'/api/location/province').then( data => data.data)
export const districtData=(id)=>  axios.post(host.Java+'/api/location/district',{id:id}).then(data => data.data)
export const wardData=(idp,idd)=>  axios.post(host.Java+'/api/location/ward',{idProvince:idp,idDistrict: idd}).then(data => data.data)
export const streetData=(idp,idd)=>  axios.get(host.Node+'/api/location/street',{params:{ idProvince:idp,idDistrict: idd}}).then(data => data.data)