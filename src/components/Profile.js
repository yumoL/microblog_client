import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Divider } from 'semantic-ui-react'
import { getBlogsByUser, clearBlogList } from '../reducers/blogReducer'
import { getUserInfo } from '../reducers/usersReducer'
import BlogList from './blogPage/BlogList'
import { Image } from 'semantic-ui-react'
import PageDivider from './blogPage/PageDivider'

const Profile = (props) => {
  const { userId, isMe } = props

  const getBlogs = async() => {
    await props.getBlogsByUser(userId, 0)
  }

  const getAnotherUserInfo = async() => {
    await props.getUserInfo(userId)
  }

  useEffect(() => {
    getBlogs()
    getAnotherUserInfo()
    return () => props.clearBlogList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

  if(!props.blog.blogList)return null

  return (
    <div>
      <div style={{ float:'left', width:'100%',marginRight:'-300px' }}>
        {props.blog.blogList.length===0 ? (<div>
        No blog
          <Divider />
        </div>):(
          <BlogList blogList={props.blog.blogList}/>
        ) }
        <PageDivider noMore={props.blog.blogList.length===props.blog.allNumber} userId={props.users.id} getBlogsByUser={props.getBlogsByUser} />
      </div>
      <div style={{ float:'right' }}>
        <div> <span>
          <Image src={props.users.picture} verticalAlign='middle' size='tiny'/>
          <h2 style={{ display:'inline' }}>{isMe ? <span>Me</span> : <span>{props.users.userName}</span>}</h2>
        </span></div>
      </div>
    </div>
  )

}

const mapStateToProps = state => {
  return {
    user: state.user,
    blog: state.blog,
    users: state.users
  }
}

const mapDispatchToProps = {
  getBlogsByUser,
  getUserInfo,
  clearBlogList
}
Profile.propTypes = {
  getBlogsByUser: PropTypes.func.isRequired,
  user: PropTypes.object,
  blog: PropTypes.object,
  userId: PropTypes.string.isRequired,
  isMe: PropTypes.bool,
  getUserInfo: PropTypes.func,
  users: PropTypes.object,
  clearBlogList: PropTypes.func.isRequired
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)
