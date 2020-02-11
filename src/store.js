import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import jwtDecode from 'jwt-decode'
import userReducer, { lsKey, logout }from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
const reducer = combineReducers({
  user: userReducer,
  notification: notificationReducer,
  blog: blogReducer
})

const checkTokenExpirationMiddleware = store => next => action => {
  const token =
    localStorage.getItem(lsKey) &&
    JSON.parse(localStorage.getItem(lsKey)) &&
    JSON.parse(localStorage.getItem(lsKey))['token']
  if (token && jwtDecode(token).exp < Date.now() / 1000) {
    store.dispatch(logout())
    window.alert('Your session expired, please login again')
  }
  next(action)
}

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk, checkTokenExpirationMiddleware)
  )
)

export default store