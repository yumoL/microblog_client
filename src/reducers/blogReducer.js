import blogService from '../services/blogs'
import utilService from '../services/utils'

const initialState = {
  allNumber: 0,
  blogList: []
}

const blogReducer = (state=initialState, action) => {
  switch (action.type) {
  case 'CREATE_BLOG':
    return state
    //return { ...state, allNumber:state.allNumber+1,blogList:state.blogList.concat(action.publishedBlog) }
  case 'GET_BLOGS_BY_USER':
    return { ...state, allNumber:action.allNumber,blogList:state.blogList.concat(action.blogList) }
  case 'GET_ALL_BLOGS':
    return { ...state, allNumber:action.allNumber,blogList:state.blogList.concat(action.blogList) }
  case 'CLEAR_USER':
    return initialState
  case 'CLEAR_BLOG_LIST':
    return initialState
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
    dispatch({
      type: 'GET_BLOGS_BY_USER',
      allNumber: res.data.allNumber,
      blogList: res.data.blogList
    })
  }
}

export const getAllBlogs = (pageIndex) => {
  return async dispatch => {
    const res = await blogService.getAllBlogs(pageIndex)
    dispatch({
      type: 'GET_ALL_BLOGS',
      allNumber: res.data.allNumber,
      blogList: res.data.blogList
    })
  }
}

export const clearBlogList = () => {
  return dispatch => {
    dispatch({
      type:'CLEAR_BLOG_LIST'
    })
  }
}
export default blogReducer