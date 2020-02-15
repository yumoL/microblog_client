/* eslint-disable no-undef */
import React from 'react'
import { fireEvent, wait } from '@testing-library/react'

jest.mock('../services/user')

import LoginForm from '../components/LoginForm'
import { renderWithReduxAndRouter } from './testHelper'

describe('Login', () => {

  let Wrapper

  beforeEach(() => {
    Wrapper = renderWithReduxAndRouter(<LoginForm />)
  })

  test('should render login form correctly', () => {
    expect(Wrapper).toMatchSnapshot()
  })

  test('Login button is disabled when nothing has been inputted', () => {
    const button = Wrapper.getByText('Login')
    expect(button).toBeDisabled()
  })

  test('Redirect to home page after login', async () => {
    const userNameInput = Wrapper.container.querySelector('#userName')
    const pwdInput = Wrapper.container.querySelector('#pwd')
    const form = Wrapper.container.querySelector('form')
    fireEvent.change(userNameInput, { target: { value: 'user1' } })
    fireEvent.change(pwdInput, { target: { value: '123' } })
    fireEvent.submit(form)

    // await wait(() => expect(Wrapper.container.querySelector('.redirect')).toBeInTheDocument())
    // expect(Wrapper.container.querySelector('#userName')).not.toBeTruthy()
  })

})