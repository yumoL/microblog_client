import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form, Grid, Header, Button, Image } from 'semantic-ui-react'
import { useDebounce } from '../hooks/useDebounce'
import { useField } from '../hooks/useField'
import ValidateInput from './ValidateInput'
import { checkUserNameExisted, changeBasicInfo, changePwd } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'

const Setting = props => {
  const userName = useField('text', props.user.userName)
  const debouncedUsername = useDebounce(userName.value, 500)
  const oldPwd = useField('password')
  const newPwd = useField('password')
  const newPwdConfirm = useField('password')

  const [selectedFile, setSelectedFile]=useState(null)
  const [previewUrl, setPreviewUrl ] = useState('')

  useEffect(() => {
    if (debouncedUsername) {
      const existedUserName = async () => {
        await props.checkUserNameExisted(debouncedUsername)
      }
      existedUserName()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedUsername])

  const handleBasicInfoChange = async e => {
    e.preventDefault()
    let formData = null
    if(selectedFile !== null){
      formData = new FormData()
      formData.append('file', selectedFile)
    }
    try{
      await props.changeBasicInfo(props.user.id, userName.value, formData )
      props.setNotification({ message: 'You have changed your basic information', error: false })
    } catch (e){
      props.setNotification( { message:'Fail to change basic information', error: true })
    }
  }

  const handleFileChange = e => {
    const file = e.target.files[0]
    setSelectedFile(file)
    setPreviewUrl(URL.createObjectURL(file))
  }

  const handlePwdChange = async e => {
    e.preventDefault()
    try{
      await props.changePwd(props.user.id, oldPwd.value, newPwd.value)
      props.setNotification({ message: 'You have changed your password', error: false })
    }catch (e){
      props.setNotification( { message:'Fail to change password, please make sure that your old password is correct', error: true })
    }
    oldPwd.clear()
    newPwd.clear()
    newPwdConfirm.clear()
  }

  const disableChangeBasicInfoButton = (props.user.userNameExisted && userName.value !== props.user.userName) ||
                                        userName.value.length < 3 || userName.value.length > 255
  const disableChangePwdButton = newPwd.value.length <3 || newPwd.value.length>255 || newPwd.value!==newPwdConfirm.value

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
        Account Setting
        </Header>
        <Header as='h3' color='teal' textAlign='center'>
        Basic information
        </Header>
        <Form onSubmit={handleBasicInfoChange}>
          <Form.Field>
            <label>User name</label>
            <input id='newUserNameField' {...userName} clear='clear'/>
            <ValidateInput fieldName={'Username'} input={userName.value} minLength={3} maxLength={255}
              extraRequirement={!props.user.userNameExisted || userName.value===props.user.userName} extraErrorMessage={'User name is already existed'} />
          </Form.Field>
          <Form.Field>
            <label>Change head portrait</label>
            <Form.Input type='file' accept='image/*' onChange={handleFileChange} />
            <Image src={previewUrl!=='' ? previewUrl : props.user.picture} size='small' />
          </Form.Field>
          <Button id='saveBIChangeButton' color='teal' fluid size='large' disabled={disableChangeBasicInfoButton}>
            Save basic information changes
          </Button>
        </Form>
        <Header as='h3' color='teal' textAlign='center'>
            Password
        </Header>
        <Form onSubmit={handlePwdChange}>
          <Form.Field>
            <label>Current password</label>
            <input id='oldPwdField' placeholder='current password' {...oldPwd} clear='clear'/>
          </Form.Field>

          <Form.Field>
            <label>New password</label>
            <input id='newPwdField' placeholder='new password' {...newPwd} clear='clear' />
            <ValidateInput fieldName={'Password'} input={newPwd.value} minLength={3} maxLength={255} />
          </Form.Field>
          <Form.Field>
            <label>Confirm new password</label>
            <input id='pwdConfirmField' placeholder='new password confirmation' {...newPwdConfirm} clear='clear'/>
          </Form.Field>
          <ValidateInput fieldName={'Password confirmation'} input={newPwdConfirm.value}
            extraRequirement={newPwd.value === newPwdConfirm.value} extraErrorMessage={'Confirmation does not match the password'} />
          <Button id='pwdSaveButton' color='teal' fluid size='large' disabled={disableChangePwdButton}>
            Save new password
          </Button>
        </Form>
      </Grid.Column>
    </Grid>
  )
}

const mapStateToProps = state  => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  checkUserNameExisted,
  changeBasicInfo,
  changePwd,
  setNotification
}

Setting.propTypes = {
  checkUserNameExisted: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  setNotification: PropTypes.func.isRequired,
  changeBasicInfo: PropTypes.func.isRequired,
  changePwd:PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Setting)