import React from 'react'
import { Image, Modal, Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const SingleImage = ({ image, toUpload, removeImage }) => {
  if(!image)return null

  return(
    <div id='image'>
      <Modal key={image} trigger={<Image src={image} size="medium" />}>
        <Modal.Content image>
          <Image wrapped src={image} />
        </Modal.Content>
      </Modal>
      {toUpload&&(<Icon name="delete" onClick={removeImage}/>)}
    </div>
  )
}

SingleImage.propTypes = {
  image: PropTypes.string,
  toUpload: PropTypes.bool,
  removeImage: PropTypes.func
}
export default SingleImage