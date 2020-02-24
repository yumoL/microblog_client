import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Divider, Segment } from 'semantic-ui-react'
import { getBlogsByUser } from '../reducers/blogReducer'
import { getUserInfo } from '../reducers/usersReducer'
import BlogList from './blogPage/BlogList'
import { Image } from 'semantic-ui-react'

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
      </div>
      <div style={{ float:'right' }}>
        <div> <span>
          <Image src={props.users.picture} verticalAlign='middle' size='tiny'/>
          <h2 style={{ display:'inline' }}>{isMe ? <span>Me</span> : <span>{props.users.userName}</span>}</h2>
        </span></div>
        <Segment.Group compact>
          {isMe && <Segment>
            @Me ()
          </Segment>}
          <Segment>
            <h3>Follower</h3>
            <p>follower1</p>
            <p>follower2</p>
          </Segment>
          <Segment>
            <h3>Follow</h3>
            <p>aaa</p>
            <p>bbb</p>
          </Segment>
        </Segment.Group>
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
  getUserInfo
}
Profile.propTypes = {
  getBlogsByUser: PropTypes.func.isRequired,
  user: PropTypes.object,
  blog: PropTypes.object,
  userId: PropTypes.string.isRequired,
  isMe: PropTypes.bool,
  getUserInfo: PropTypes.func,
  users: PropTypes.object
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)
