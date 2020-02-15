/**
 * @description register form
 */
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Grid, Header, Form, Segment, Button, Message } from 'semantic-ui-react'
import { Link, withRouter, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { checkUserNameExisted, register } from '../reducers/userReducer'
import { useDebounce } from '../hooks/useDebounce'
import { useField } from '../hooks/useField'
import { setNotification } from '../reducers/notificationReducer'
import ValidateInput from './ValidateInput'
import RedirectToMain from './RedirectToMain'


const RegisterForm = props => {
  const [registerSuccess, setRegisterSuccess] = useState(false)
  const userName = useField('text')
  const password = useField('password')
  const passwordConfirm = useField('password')
  const debouncedUsername = useDebounce(userName.value, 500)

  useEffect(() => {
    if (debouncedUsername) {
      const existedUserName = async () => {
        await props.checkUserNameExisted(debouncedUsername)
      }
      existedUserName()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedUsername])

  const submitButtonDisabled = props.user.userNameExisted || userName.value.length < 3 || userName.value.length > 255 || password.value.length < 3 || password.value.length > 255 || password.value !== passwordConfirm.value

  const handleSubmit = async e => {
    e.preventDefault()
    const newUser = {
      userName: userName.value,
      password: passwordConfirm.value
    }
    try {
      await props.register(newUser)
      setRegisterSuccess(true)
      //props.history.push('/login')
      props.setNotification({ message: 'Register succeeded, please log in', error: false })
    } catch (e) {
      props.setNotification({ message: 'Register failed', error: true })
    }
  }

  if (registerSuccess) {
    return (
      <div className='redirect'>
        <Redirect to='/login' />
      </div>
    )
  }

  if (props.user.token) {
    return (
      <RedirectToMain />
    )
  }

  return (
    <div>
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            Sign Up
          </Header>
          <Form size='large' onSubmit={handleSubmit}>
            <Segment stacked>
              <Form.Input id='userName' fluid icon='user' iconPosition='left' placeholder='Username (between 3 and 255 characters)'
                {...userName} required
              />
              <ValidateInput fieldName={'Username'} input={userName.value} minLength={3} maxLength={255}
                extraRequirement={!props.user.userNameExisted} extraErrorMessage={'User name is already existed'} />
              <Form.Input
                id='pwd'
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password (between 3 and 255 characters)'
                {...password}
                required
              />
              <ValidateInput fieldName={'Password'} input={password.value} minLength={3} maxLength={255} />
              <Form.Input
                id='pwdConfirm'
                fluid
                placeholder='Confirm Your Password'
                {...passwordConfirm}
                required
              />
              <ValidateInput fieldName={'Password confirmation'} input={passwordConfirm.value}
                extraRequirement={password.value === passwordConfirm.value} extraErrorMessage={'Confirmation does not match the password'} />
              <Button color='teal' fluid size='large' disabled={submitButtonDisabled}>
                Sign Up
              </Button>
            </Segment>
          </Form>
          <Message>Already have an account? <Link to='/login'>Back to login</Link></Message>
        </Grid.Column>
      </Grid>

    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user,
    file: state.file
  }
}

const mapDispatchToProps = {
  checkUserNameExisted,
  register,
  setNotification
}

RegisterForm.propTypes = {
  history: PropTypes.object.isRequired,
  checkUserNameExisted: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  setNotification: PropTypes.func.isRequired
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(RegisterForm)
)
