import userService from '../services/user'
import blogService from '../services/blogs'

export const lsKey = 'loggedInUser'

export const initialState = {
  userNameExisted: false
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'REGISTER':
    return initialState
  case 'USERNAME_EXISTED':
    return { userNameExisted: action.userNameExisted }
  case 'SET_USER':
    return action.loggedInUser
  case 'CLEAR_USER':
    return null
  default:
    return state
  }
}

export const initUser = () => {
  return async dispatch => {
    const loggedInUserJson = window.localStorage.getItem(lsKey)
    if (loggedInUserJson) {
      const loggedInUser = JSON.parse(loggedInUserJson)
      dispatch({
        type: 'SET_USER',
        loggedInUser
      })
    }
  }
}

export const checkUserNameExisted = userName => {
  return async dispatch => {
    const userInfo = await userService.checkUserNameExisted(userName)
    const userNameExisted = userInfo.data ? true : false
    dispatch({
      type: 'USERNAME_EXISTED',
      userNameExisted
    })
  }
}

export const register = newUser => {
  return async dispatch => {
    await userService.register(newUser)
    dispatch({
      type: 'REGISTER'
    })
  }
}

export const login = user => {
  return async dispatch => {
    const res = await userService.login(user)
    const loggedInUser = res.data
    window.localStorage.setItem(lsKey, JSON.stringify(loggedInUser))
    blogService.setToken(loggedInUser.token)
    dispatch({
      type: 'SET_USER',
      loggedInUser
    })
  }
}

export const logout = () => {
  return async dispatch => {
    blogService.destroyToken()
    window.localStorage.removeItem(lsKey)
    dispatch({
      type: 'CLEAR_USER'
    })
  }
}
export default userReducer

