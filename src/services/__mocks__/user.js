const loggedInUser = {
  errno: 0,
  data: {
    token: 'fakeToken123',
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