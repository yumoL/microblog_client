import React from 'react'
import { Link } from 'react-router-dom'
import { Comment } from 'semantic-ui-react'
import Images from './Images/Images'
import PropTypes from 'prop-types'

const Blog = ({ blog }) => {
  const imagesArray = blog.images.map(image => image.url)
  return (
    <>
      <Comment>
        <Comment.Avatar src={blog.user.picture} style={{ marginGight: '0px' }}/>
        <Comment.Author>
          <Link to={`/profile/${blog.userId}/0`}>{blog.user.userName}</Link>
        </Comment.Author>
        <Comment.Content>
          <Comment.Metadata>
            <div>{blog.createdAt}</div>
          </Comment.Metadata>
          <Comment.Text>
            {blog.content}
            <Images images={imagesArray} />
          </Comment.Text>
        </Comment.Content>
      </Comment>
    </>
  )
}
Blog.propTypes = {
  blog: PropTypes.object
}

export default Blog