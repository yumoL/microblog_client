import React from 'react'
import PropTypes from 'prop-types'

const ValidateInput = props => {
  const { fieldName, input, minLength, maxLength, extraRequirement, extraErrorMessage } = props
  if (!input) {
    return null
  }
  if ((minLength && maxLength) && (input.length < minLength || input.length > maxLength)) {
    return (
      <p style={{ color: 'red' }}>
        {fieldName} should be between {minLength} and {maxLength} characters
      </p>
    )
  }
  if (extraRequirement === false) {
    return (
      <p style={{ color: 'red' }}>
        {extraErrorMessage}
      </p>
    )
  }
  return (
    <p style={{ color: 'green' }}>
      Valid {fieldName}
    </p>
  )
}

ValidateInput.propTypes = {
  fieldName: PropTypes.string.isRequired,
  input: PropTypes.string.isRequired,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  extraRequirement: PropTypes.bool,
  extraErrorMessage: PropTypes.string
}

export default ValidateInput