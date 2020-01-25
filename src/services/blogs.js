// import axios from 'axios'
// const baseUrl = '/api/blogs'

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

export default { setToken, destroyToken }