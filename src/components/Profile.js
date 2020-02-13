import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Divider } from 'semantic-ui-react'
import { getBlogsByUser } from '../reducers/blogReducer'
import BlogList from './blogPage/BlogList'

const Profile = (props) => {
  const { userId } = props

  useEffect(() => {
    async function getBlogs() {
      await props.getBlogsByUser(userId, 0)
    }
    getBlogs()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if(!props.blog.blogList)return null

  if(props.blog.blogList.length===0) {
    return (
      <div>
        No blog
        <Divider />
      </div>
    )
  }
  return (
    <div>
      <BlogList blogList={props.blog.blogList}/>
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
  getBlogsByUser
}
Profile.propTypes = {
  getBlogsByUser: PropTypes.func.isRequired,
  user: PropTypes.object,
  blog: PropTypes.object,
  userId: PropTypes.string.isRequired
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)
