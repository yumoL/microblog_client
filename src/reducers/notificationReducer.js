const notificationReducer = (state = {}, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.content
  case 'CLEAR_NOTIFICATION':
    return {}
  default:
    return state
  }
}

export const setNotification = ({ message, error = false }) => {
  const content = {
    message,
    error
  }
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      content
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      })
    }, 5000)
  }
}

export default notificationReducer