import React, { useState } from 'react'
import { Form, TextArea, Button, Icon, Grid } from 'semantic-ui-react'
import { useField } from '../../hooks/useField'
import PropTypes from 'prop-types'
import SingleImage from './Images/SingleImage'

const BlogInput = props => {
  const [files, setFiles ] = useState([])
  const [tempUrls, setTempUrls ] = useState([])
  const content = useField('text')
  const [id, setId] = useState(0)

  const handleFileChange = e => {
    if(files.length===3){
      props.setNotification({ message:'You can upload max 3 images', error:true })
      return
    }
    setId(id+1)
    const fileToAdd = {
      fileContent: e.target.files[0],
      id
    }
    const tempUrl = {
      urlContent: URL.createObjectURL(fileToAdd.fileContent),
      id
    }
    setFiles([...files, fileToAdd])
    setTempUrls([...tempUrls, tempUrl])
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if(content.value.trim().length===0 && files.length===0){
      props.setNotification({ message:'Cannot post an empty blog', error:true })
      return

    }
    let formData = null
    if(files.length > 0){
      formData = new FormData()
      files.map(file => formData.append('file',file.fileContent))
    }
    await props.createBlog(props.userId, content.value, formData )
    setFiles([])
    setTempUrls([])
    setId(0)
    content.clear()
    props.setNotification({ message:'You created a blog', error: false })
  }
  let imageInput = React.createRef()
  const insertImageButtonOnClick = () => {
    imageInput.current.click()
  }

  const removeImage = id => {
    setFiles(files.filter(file => file.id!==id))
    setTempUrls(tempUrls.filter(url => url.id!==id))
  }
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <TextArea id='blogTextField' placeholder='new blog...' {...content} style={{ minHeight: 100 }} clear='clear'/>
          <Button id='insertImageButton' type='button' onClick={insertImageButtonOnClick}><Icon name='picture'/>insert an image (max 3)</Button>
          <input id='fileInput' type='file' accept='image/*' ref={imageInput} onChange={handleFileChange} style={{ 'display':'none' }}/>
        </Form.Field>
        {files.length>0&&<Grid style={{ height:'33%', width:'33%' }}>
          {<Grid.Row columns={3} >
            {tempUrls.map(url => <Grid.Column key={url.id}>
              <SingleImage image={url.urlContent} toUpload={true}
                removeImage={() => removeImage(tempUrls.find(tempUrl => tempUrl.urlContent===url.urlContent).id)}/>
            </Grid.Column>)}
          </Grid.Row>}
        </Grid>}
        <Button id='publishBlogButton' color='green'>Publish your microblog</Button>
      </Form>
    </div>
  )
}

BlogInput.propTypes = {
  userId: PropTypes.number.isRequired,
  createBlog: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
}

export default BlogInput