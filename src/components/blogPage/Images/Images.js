import React from 'react'
import { Grid } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import SingleImage from './SingleImage'

const Images = props => {
  return (
    <div>
      <Grid>
        {<Grid.Row columns={3} >
          {props.images.map(url => <Grid.Column key={url}>
            <SingleImage image={url} />
          </Grid.Column>)}
        </Grid.Row>}
      </Grid>
    </div>
  )
}

Images.propTypes = {
  images: PropTypes.array.isRequired
}

export default Images