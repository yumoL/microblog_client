import blogService from '../services/blogs'
import utilService from '../services/utils'

const blogReducer = (state={}, action) => {
  switch (action.type) {
  case 'CREATE_BLOG':
    return action.publishedBlog
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
      console.log('suc model', uploadedPic.data[0])
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

export default blogReducer