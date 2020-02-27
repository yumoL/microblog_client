import axios from 'axios'
import { getConfig } from './utils'
const baseUrl = '/api/blog'

const createBlog = async (userId, newBlog ) => {
  const res = await axios.post(`${baseUrl}/create/${userId}`, newBlog, getConfig())
  return res.data
}

const getBlogsByUser = async (userId, pageIndex=0) => {
  const res = await axios.get(`${baseUrl}/profile/${userId}/${pageIndex}`, getConfig())
  return res.data
}

export default { createBlog, getBlogsByUser }