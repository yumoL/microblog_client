import React from 'react'
import Blog from './Blog'
import { Comment } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const BlogList = props => {
  return (
    <div>
      <Comment.Group>
        {props.blogList.map(blog => (
          <div key={blog.id}>
            <Blog blog={blog}/>
          </div>
        ))}
      </Comment.Group>
    </div>

  )
}
BlogList.propTypes = {
  blogList: PropTypes.array
}
export default BlogList