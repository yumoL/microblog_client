import React, { useState } from 'react'
import { Button, Divider } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const PageDivider = props => {
  const { userId, getBlogsByUser, noMore } = props
  const [pageIndex, setPageIndex ] = useState(1)

  const handleLoadMore = () => {
    console.log('more', pageIndex)
    setPageIndex(pageIndex+1)
    getBlogsByUser(userId, pageIndex)
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
  getBlogsByUser: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  noMore: PropTypes.bool.isRequired
}

export default PageDivider