/* eslint-disable no-undef */
import React from 'react'
import RegisterForm from '../components/RegisterForm'
import { renderWithReduxAndRouter } from './testHelper'
import { fireEvent, wait } from '@testing-library/react'
jest.mock('../services/user')

describe('Register', () => {
  let Wrapper
  let userNameInput
  let pwdInput
  let pwdConfirmInput

  beforeEach(() => {
    Wrapper = renderWithReduxAndRouter(<RegisterForm />)
    userNameInput = Wrapper.container.querySelector('.userName').querySelector('input')
    pwdInput = Wrapper.container.querySelector('.pwd').querySelector('input')
    pwdConfirmInput = Wrapper.container.querySelector('.pwdConfirm').querySelector('input')
  })

  test('should render register form correctly', () => {
    expect(Wrapper).toMatchSnapshot()
  })

  describe('Show warning message when input is invalid', () => {
    test('Username is already existed', async () => {
      fireEvent.change(userNameInput, { target: { value: 'user1' } })
      await wait(() => expect(Wrapper.getByText('User name is already existed')).toBeInTheDocument())
    })

    test('Password confirmation does not match the password input', () => {
      fireEvent.change(pwdInput, { target: { value: 'pwd' } })
      fireEvent.change(pwdConfirmInput, { target: { value: 'unmatchedPwd' } })
      expect(Wrapper.getByText('Confirmation does not match the password')).toBeInTheDocument()
    })
  })

  test('Redirect to login page after successful registration', async () => {
    const form = Wrapper.container.querySelector('form')
    fireEvent.change(userNameInput, { target: { value: 'user1' } })
    fireEvent.change(pwdInput, { target: { value: 'pwd' } })
    fireEvent.change(pwdConfirmInput, { target: { value: 'pwd' } })

    fireEvent.submit(form)

    await wait(() => expect(Wrapper.container.querySelector('.redirect')).toBeInTheDocument())
    expect(Wrapper.container.querySelector('.pwdConfirm')).not.toBeTruthy()
  })
})