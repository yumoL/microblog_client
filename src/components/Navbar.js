import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Menu, Dropdown, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/userReducer'

const Navbar = props => {

  const [activeItem, setActiveItem ] = useState(props.user.token ? 'Home': 'Login')

  const handleNavClick = (e, { name }) => {
    setActiveItem(name)
  }
  if(!props.user.token) {
    return (
      <Menu tabular>
        <Menu.Item
          name='Login'
          active={activeItem==='Login'}
          onClick={handleNavClick}
          as={Link}
          to='/login'/>
        <Menu.Item
          name='Register'
          active={activeItem==='Register'}
          onClick={handleNavClick}
          as={Link}
          to='/register'/>
      </Menu>
    )
  }
  return (
    <Menu tabular>
      <Menu.Item
        name='Home'
        active={activeItem==='Home'}
        onClick={handleNavClick}
        as={Link}
        to='/home'/>
      <Menu.Item
        name='My blogs'
        active={activeItem==='My blogs'}
        onClick={handleNavClick}
        as={Link}
        to='/myblogs'/>
      <Menu.Item
        name='Discover'
        active={activeItem==='Discover'}
        onClick={handleNavClick}
        as={Link}
        to='/discover'/>
      <Menu.Menu
        position='right'
      >
        <Dropdown item text='Setting'>
          <Dropdown.Menu>
            <Dropdown.Item
              as={Link} to='/setting'>
              Account setting
            </Dropdown.Item>
            <Dropdown.Item>
              <Button onClick={props.logout}><Link to='/login'>Logout</Link></Button>
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
  user: PropTypes.object
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar)
