import axios from 'axios'
import { getConfig } from './utils'
const baseUrl = '/api/blog'

const createBlog = async (userId, newBlog ) => {
  const res = await axios.post(`${baseUrl}/create/${userId}`, newBlog, getConfig())
  return res.data
}
export default { createBlog  }