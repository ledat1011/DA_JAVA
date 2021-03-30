import axios from 'axios'
import { host } from '../_type'
export const formpostData = ()=> axios.get(host.Node+'/api/other/formpost').then( data => data.data)
