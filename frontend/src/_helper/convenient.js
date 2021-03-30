import axios from 'axios'
import { host } from '../_type'
export const convenientData = ()=> axios.get(host.Node+'/api/other/convenient').then( data => data.data)
