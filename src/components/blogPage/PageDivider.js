import React, { useState } from 'react'
import { Button, Divider } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const PageDivider = props => {
  const { userId, getBlogsByUser, noMore, getAllBlogs } = props
  const [pageIndex, setPageIndex ] = useState(1)

  const handleLoadMore = () => {
    setPageIndex(pageIndex+1)
    if(userId){
      getBlogsByUser(userId, pageIndex)
    } else {
      getAllBlogs(pageIndex)
    }

  }
  if(noMore === true){
    return (
      <div>
        <Divider horizontal>end</Divider>
      </div>
    )
  }
  return (
    <div>
      <Button id='loadMoreButton' color='blue' onClick={handleLoadMore}>
      Click to load more
      </Button>
    </div>

  )
}

PageDivider.propTypes = {
  getBlogsByUser: PropTypes.func,
  getAllBlogs: PropTypes.func,
  userId: PropTypes.string,
  noMore: PropTypes.bool.isRequired
}

export default PageDivider