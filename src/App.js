import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import Notification from './components/Notification'
import { initUser } from './reducers/userReducer'
import HomePage from './components/HomePage'
import ProtectedRoute from './components/ProtectedRoute'
import NotFoundPage from './components/NotFoundPage'
import Navbar from './components/Navbar'
import Setting from './components/Setting'
import Profile from './components/Profile'
import FrontPage from './components/FrontPage'

const App = (props) => {

  useEffect(() => {
    props.initUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="App" style={{ textAlign:'left' }}>
      <Notification />
      <Router>
        <Navbar />
        <Switch>
          <ProtectedRoute path='/home' component={HomePage} />
          <ProtectedRoute path='/profile/:userId/:pageIndex'
            component={({ match }) => <Profile userId={match.params.userId} isMe={props.user.id===Number(match.params.userId)}/>} />
          <ProtectedRoute path='/setting' component={Setting} />
          <Route exact path='/' render={() => <FrontPage />} />
          <Route path='/login' render={(history) => <div>
            <LoginForm history={history} />
          </div>} />
          <Route path='/register' render={(history) => <div>
            <RegisterForm history={history} />
          </div>} />
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  initUser
}

App.propTypes = {
  user: PropTypes.object,
  initUser: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
