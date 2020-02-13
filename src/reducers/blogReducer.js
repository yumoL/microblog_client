import blogService from '../services/blogs'
import utilService from '../services/utils'

const blogReducer = (state={}, action) => {
  switch (action.type) {
  case 'CREATE_BLOG':
    return action.publishedBlog
  case 'GET_BLOGS_BY_USER':
    return action.blogList
  default:
    return state
  }
}

export const createBlog = (userId, content, formData) => {
  return async dispatch => {
    let newBlog = {
      content
    }

    if(formData !== null){
      // upload picture and get the urls of saved pictures from backend
      const uploadedPic = await utilService.uploadFile(formData)
      /**
     * uploadedPic = {
     *  errno: 0
     *  data: [url]
     * }
     */
      const urls = uploadedPic.data
      newBlog = {
        ...newBlog,
        urls
      }
    }
    const res = await blogService.createBlog(userId, newBlog)
    const publishedBlog = res.data
    dispatch({
      type: 'CREATE_BLOG',
      publishedBlog
    })
  }
}

export const getBlogsByUser = (userId, pageIndex) => {
  return async dispatch => {
    const res = await blogService.getBlogsByUser(userId, pageIndex)
    const blogList = res.data
    console.log('blogList', blogList)
    dispatch({
      type: 'GET_BLOGS_BY_USER',
      blogList
    })
  }
}

export default blogReducer