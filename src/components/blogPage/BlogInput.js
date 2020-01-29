import React, { useState } from 'react'
import { Form, TextArea, Button, Grid, Image } from 'semantic-ui-react'
import { useField } from '../../hooks/useField'
import PropTypes from 'prop-types'

const BlogInput = props => {
  const [files, setFiles ] = useState([])
  const [urls, setUrls ] = useState([])
  const content = useField('text')

  const handleFileChange = e => {
    const fileToAdd = e.target.files[0]
    setFiles([...files, fileToAdd])
    setUrls([...urls, URL.createObjectURL(fileToAdd)])
  }

  const handleSubmit = async e => {
    e.preventDefault()
    let formData = null
    if(files.length > 0){
      formData = new FormData()
      files.map(file => formData.append('file',file))
    }
    await props.createBlog(props.userId, content.value, formData )
    setFiles([])
    setUrls([])
    content.clear()
    props.setNotification({ message:'You created a blog', error: false })
  }
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <TextArea placeholder='new blog...(click Choose Files below to upload max 5 images)' {...content} style={{ minHeight: 100 }} clear='clear'/>
          <input type='file' accept='image/*' onChange={handleFileChange}/>
          <Grid>
            <Grid.Row columns={5}>
              {urls.map(url => <Grid.Column key={url}>
                <Image src={url} size='small' />
              </Grid.Column>)}
            </Grid.Row>

          </Grid>
        </Form.Field>
        <Button>Publish your microblog</Button>
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