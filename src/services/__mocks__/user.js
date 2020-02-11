const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlck5hbWUiOiJ1c2VyMSIsInBpY3R1cmUiOiIvZGVmYXVsdGVkX3BpY3R1cmUuanBnIiwiaWF0IjoxNTgxNDIzMjU5LCJleHAiOjE1ODE0MjY4NTl9.L9a29NLCZOINYT04IO2SLHS25ETmYk2GKErvZbdp3w0'

const loggedInUser = {
  errno: 0,
  data: {
    token,
    id: 1,
    userName: 'user1',
    picture: null
  }
}

const login = () => {
  return Promise.resolve(loggedInUser)
}

const checkUserNameExisted = userName => {
  const existedUser = {
    errno: 0,
    data: {
      id: 1,
      userName,
      picture: null
    }
  }

  return Promise.resolve(existedUser)
}

const register = () => {
  return Promise.resolve({ errno: 0 })
}

export default { login, checkUserNameExisted, register }