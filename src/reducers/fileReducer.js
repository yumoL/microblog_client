import utilService from '../services/utils'


const fileReducer = (state={}, action) => {
  switch(action.type){
  case 'UPLOAD':
    return action.url
  default:
    return state
  }
}

export const uploadFile = formData => {
  return async dispatch => {
    const uploadedFile = await utilService.uploadFile(formData)
    dispatch({
      type: 'UPLOAD',
      url: uploadedFile.data
    })
  }
}

export default fileReducer