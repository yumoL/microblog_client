import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import Notification from './components/Notification'
import { initUser } from './reducers/userReducer'
import FrontPage from './components/FrontPage'
import ProtectedRoute from './components/ProtectedRoute'
import NotFoundPage from './components/NotFoundPage'
import Navbar from './components/Navbar'
import Setting from './components/Setting'

const App = (props) => {

  useEffect(() => {
    console.log('init')
    props.initUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="App">
      <Notification />
      <Router>
        <Navbar />
        <Switch>
          <ProtectedRoute path='/home' component={FrontPage} />
          <ProtectedRoute path='/setting' component={Setting} />
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
  initUser: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
