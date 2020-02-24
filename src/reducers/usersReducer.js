import userService from '../services/user'

const initialState = {}

const usersReducer = (state=initialState, action) => {
  switch(action.type) {
  case 'GET_USER_INFO':
    return action.checkedUser
  default:
    return state
  }

}

export const getUserInfo = id => {
  return async dispatch => {
    const userInfo = await userService.getUserInfo(id)
    dispatch({
      type: 'GET_USER_INFO',
      checkedUser: userInfo.data
    })
  }
}

export default usersReducer