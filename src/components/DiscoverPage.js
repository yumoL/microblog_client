/**
 * @description show blogs of all users
 */
import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Divider } from 'semantic-ui-react'
import BlogList from './blogPage/BlogList'
import PageDivider from './blogPage/PageDivider'
import { getAllBlogs, clearBlogList } from '../reducers/blogReducer'

const DiscoverPage = props => {

  const getAllBlogs = async() => {
    await props.getAllBlogs(0)
  }

  useEffect(() => {
    getAllBlogs()
    return () => props.clearBlogList()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  if(!props.blog.blogList)return null

  return (
    <div style={{ float:'left', width:'100%',marginRight:'-300px' }}>
      {props.blog.blogList.length===0 ? (<div>
        No blog
        <Divider />
      </div>):(
        <BlogList blogList={props.blog.blogList}/>
      ) }
      <PageDivider noMore={props.blog.blogList.length===props.blog.allNumber} getAllBlogs={props.getAllBlogs} />
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
  getAllBlogs,
  clearBlogList
}
// Profile.propTypes = {
//   getBlogsByUser: PropTypes.func.isRequired,
//   user: PropTypes.object,
//   blog: PropTypes.object,
//   userId: PropTypes.string.isRequired,
//   isMe: PropTypes.bool,
//   getUserInfo: PropTypes.func,
//   users: PropTypes.object,
//   clearBlogList: PropTypes.func.isRequired
// }
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiscoverPage)