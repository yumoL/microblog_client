/* eslint-disable eqeqeq */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Menu, Dropdown, Button } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'
import { logout } from '../reducers/userReducer'

const Navbar = props => {
  const onLogin = props.location.pathname == '/login'
  const onRegister = props.location.pathname == '/register'
  const onHome = props.location.pathname == '/home'
  const onProfile = props.location.pathname.includes('/profile')
  const onDiscover = props.location.pathname == '/discover'


  if(!props.user.token) {
    return (
      <Menu tabular>
        <Menu.Item
          id='loginMenu'
          name='Login'
          active={onLogin}
          as={Link}
          to='/login'/>
        <Menu.Item
          id='registerMenu'
          name='Register'
          active={onRegister}
          as={Link}
          to='/register'/>
      </Menu>
    )
  }
  return (
    <Menu tabular>
      <Menu.Item
        id='homeMenu'
        name='Home'
        active={onHome}
        as={Link}
        to='/home'/>
      <Menu.Item
        id='profileMenu'
        name='Profile'
        active={onProfile}
        as={Link}
        to={`/profile/${props.user.id}/0`}/>
      <Menu.Item
        id='discoverMenu'
        name='Discover'
        active={onDiscover}
        as={Link}
        to='/discover'/>
      <Menu.Menu
        position='right'
      >
        <Dropdown id='settingDropdown' item text='Setting'>
          <Dropdown.Menu>
            <Dropdown.Item
              id='accountSettingItem'
              as={Link} to='/setting'>
              Account setting
            </Dropdown.Item>
            <Dropdown.Item>
              <Button id='logoutButton' onClick={props.logout}><Link to='/login'>Logout</Link></Button>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    </Menu>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  logout
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.object,
  location: PropTypes.object.isRequired
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar))
