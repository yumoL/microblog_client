import axios from 'axios'
import { getConfig } from '../services/utils'
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

const changeBasicInfo = async (id, userToUpdate) => {
  const res = await axios.patch(`${baseUrl}/changeInfo/${id}`, userToUpdate, getConfig())
  console.log('returnUser', res.data)
  return res.data
}

const changePwd = async (id, userToUpdate) => {
  const res =await axios.patch(`${baseUrl}/changePwd/${id}`, userToUpdate, getConfig())
  return res.data
}

export default {
  checkUserNameExisted,
  register,
  login,
  changeBasicInfo,
  changePwd
}

