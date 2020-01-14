// import axios from 'axios'
// const baseUrl = '/api/blogs'

let token = null

const getConfig = () => ({
  headers: { Authorization: token }
})

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const destroyToken = () => {
  token = null
}

export default { getConfig, setToken, destroyToken }