import axios from 'axios'
const baseUrl = '/api/utils'

let token = null

export const getConfig = () => ({
  headers: { Authorization: token }
})

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const destroyToken = () => {
  token = null
}

const uploadFile = async formData => {
  const res = await axios.post(`${baseUrl}/upload`, formData, getConfig())
  console.log('return', res.data)
  return res.data
}

export default {
  uploadFile,
  setToken,
  destroyToken
}