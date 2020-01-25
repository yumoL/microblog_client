import userService from '../services/user'
import blogService from '../services/blogs'
import utilService from '../services/utils'

export const lsKey = 'loggedInUser'

export const initialState = {
  userNameExisted: false
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'REGISTER':
    return initialState
  case 'USERNAME_EXISTED':
    return { ...state, userNameExisted: action.userNameExisted }
  case 'SET_USER':
    return action.loggedInUser
  case 'CLEAR_USER':
    return initialState
  case 'UPDATE_USER_INFO':
    return action.updatedUser
  default:
    return state
  }
}

const storeUserToLocalStorage = user => {
  window.localStorage.setItem(lsKey, JSON.stringify(user))
  blogService.setToken(user.token)
}

export const initUser = () => {
  return async dispatch => {
    const loggedInUserJson = window.localStorage.getItem(lsKey)
    if (loggedInUserJson) {
      const loggedInUser = JSON.parse(loggedInUserJson)
      blogService.setToken(loggedInUser.token)
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
    storeUserToLocalStorage(loggedInUser)
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

export const changeBasicInfo = (id, newUserName, formData) => {
  return async dispatch => {
    let userToUpdate = {
      newUserName
    }
    if(formData !== null){
      // upload picture and get the saved picture url from backend
      const uploadedPic = await utilService.uploadFile(formData)
      /**
     * uploadedPic = {
     *  errno: 0
     *  data: {url: ...}
     * }
     */
      const uploadedUrl = uploadedPic.data.url
      userToUpdate = {
        ...userToUpdate,
        newPicture: uploadedUrl
      }
    }

    const res = await userService.changeBasicInfo(id, userToUpdate)
    const updatedUser = res.data
    storeUserToLocalStorage(updatedUser)
    dispatch({
      type: 'UPDATE_USER_INFO',
      updatedUser
    })
  }
}

export const changePwd = (id, pwd, newPwd) => {
  return async dispatch => {
    const userToUpdate = {
      pwd,
      newPwd
    }
    const res = await userService.changePwd(id, userToUpdate)
    const updatedUser = res.data
    storeUserToLocalStorage(updatedUser)
    dispatch({
      type: 'UPDATE_USER_INFO',
      updatedUser
    })
  }
}
export default userReducer

