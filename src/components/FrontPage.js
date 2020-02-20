import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

const FrontPage = props => {
  if(props.user.token) {
    return(
      <Redirect to='/home' />
    )
  }
  return (
    <h1>Welcome to our Microblog Platform!</h1>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

FrontPage.propTypes = {
  user: PropTypes.object
}

export default connect(mapStateToProps)(FrontPage)