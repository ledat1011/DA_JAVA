import axios from 'axios'
import { host } from '../_type'
export const typePostData = ()=> axios.get(host.Node+'/api/other/typepost').then( data => data.data)
