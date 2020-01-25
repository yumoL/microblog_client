import axios from 'axios'
import { getConfig } from '../services/blogs'
const baseUrl = '/api/utils'

const uploadFile = async formData => {
  const res = await axios.post(`${baseUrl}/upload`, formData, getConfig())
  console.log('return', res.data)
  return res.data
}

export default {
  uploadFile
}