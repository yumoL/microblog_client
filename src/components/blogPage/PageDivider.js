import React, { useState } from 'react'
import { Button, Divider } from 'semantic-ui-react'

const PageDivider = props => {
  const { userId, getBlogsByUser, noMore } = props
  const [pageIndex, setPageIndex ] = useState(1)

  const handleLoadMore = () => {
    console.log('more', pageIndex)
    setPageIndex(pageIndex+1)
    getBlogsByUser(userId, pageIndex)
  }
  if(noMore){
    return (
      <div>
        <Divider horizontal>end</Divider>
      </div>
    )
  }
  return (
    <div>
      <Button color='blue' onClick={handleLoadMore}>
      Click to load more
      </Button>
    </div>

  )
}

export default PageDivider