/**
 * @description login form
 */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Grid, Header, Form, Segment, Button, Message } from 'semantic-ui-react'
import { Link, withRouter, Redirect } from 'react-router-dom'
import { useField } from '../hooks/useField'
import { login } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'

const LoginForm = props => {
  const userName = useField('text')
  const password = useField('password')

  const loginButtonDisabled = userName.value.length === 0 || password.value.length === 0

  const handleSubmit = async e => {
    e.preventDefault()
    const user = {
      userName: userName.value,
      password: password.value
    }
    try {
      await props.login(user)
    } catch (e) {
      props.setNotification({ message: 'Login failed, wrong username or password', error: true })
    }
  }

  const { from } = props.location.state || { from: { pathname: '/home' } }
  if (props.user.token) {
    props.setNotification({ message: 'You have logged in', error: false })
    return (
      <div className='redirect'>
        <Redirect to={from} />
      </div>

    )
  }

  return (
    <div>
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            Log in to your account
          </Header>
          <Form size='large' onSubmit={handleSubmit}>
            <Segment stacked>
              <Form.Input className='userName' fluid icon='user' iconPosition='left' placeholder='User Name' {...userName} required />
              <Form.Input
                className='pwd'
                fluid
                icon='lock'
                placeholder='Password'
                {...password}
                required
              />
              <Button type='submit' color='teal' fluid size='large' disabled={loginButtonDisabled}>
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            New to us? <Link to='/register'>Sign Up</Link>
          </Message>
        </Grid.Column>
      </Grid>

    </div>

  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  login,
  setNotification
}

LoginForm.propTypes = {
  history: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
  user: PropTypes.object,
  location: PropTypes.object.isRequired
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginForm)
)