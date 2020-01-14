import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Message, Transition } from 'semantic-ui-react'

const Notification = props => {
  const { message, error } = props.notification

  const style = {
    position: 'fixed !important',
    top: '32px',
    right: '0',
    left: '0',
    textAlign: 'center',
    zIndex: '10000'
  }

  if(!message) return null

  return (
    <Transition visible={!!message} animation='fly down' duration={250}>
      <div style={style}>
        {!error ? (
          <Message floating color='green' size='large'>
            {message}
          </Message>
        ) : (
          <Message floating color='red' size='large'>
            {message}
          </Message>
        )}
      </div>


    </Transition>
  )
}

const mapStateToProps = state => {
  return {
    notification: state.notification
  }
}

Notification.propTypes = {
  notification: PropTypes.object.isRequired
}

export default connect(
  mapStateToProps
)(Notification)