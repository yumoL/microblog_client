import React from 'react'
import BlogInput from './blogPage/BlogInput'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

/**
 * Create new blogs
 */
const HomePage = props => {
  return (
    <div>
      <BlogInput userId={props.user.id} createBlog={props.createBlog} setNotification={props.setNotification}/>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user,
    blog: state.blog
  }
}

const mapDispatchToProps = {
  createBlog,
  setNotification
}

HomePage.propTypes = {
  createBlog: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
  user: PropTypes.object,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage)
