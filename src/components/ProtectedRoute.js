import React from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const ProtectedRoute = props => {
  const isAuthenticated = props.user.token ? true : false
  const { component: Component, ...rest } = props

  return (
    <Route {...rest} render={(props) => (
      isAuthenticated
        ? <Component {...props} />
        : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
    )} />
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

// const mapDispatchToProps = {
//   initUser
// }

ProtectedRoute.propTypes = {
  user: PropTypes.object.isRequired,
  component: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
}

export default withRouter(
  connect(
    mapStateToProps,
    //mapDispatchToProps
  )(ProtectedRoute)
)