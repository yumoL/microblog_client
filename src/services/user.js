import axios from 'axios'
const baseUrl = '/api/user'

// res.data = ctx.body of backend

const checkUserNameExisted = async userName => {
  const res = await axios.post(`${baseUrl}/isExist`, { userName })
  return res.data
}

const register = async newUser => {
  const res = await axios.post(`${baseUrl}/register`, newUser)
  return res.data
}

const login = async user => {
  const res = await axios.post(`${baseUrl}/login`, user)
  return res.data
}

export default {
  checkUserNameExisted,
  register,
  login
}

