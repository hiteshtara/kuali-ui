/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import classnames from 'classnames'

import { AccessibleFakeButton } from 'react-md'
import { Menu } from '../menus'
import { ListItem } from '../lists'

import { BrandLogo } from '../brand'
import UserDetails from './components/user-details'

@autobind
export default class Header extends Component {
  static defaultProps = {
    Logo: <BrandLogo />,
    menuItems: []
  }

  static propTypes = {
    className: PropTypes.string,
    Logo: PropTypes.node,
    menuItems: PropTypes.arrayOf(
      PropTypes.shape({
        primaryText: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired
      })
    ),
    module: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired,
    onBrandSelected: PropTypes.func.isRequired,
    user: PropTypes.object
  }

  state = {
    menuIsOpen: false
  }

  handleLogoClick (evt) {
    this.props.onBrandSelected(evt)
  }

  handleLogoKeyPress (evt) {
    if (evt.key === 'Enter') this.props.onBrandSelected(evt)
  }

  handleMenuKeyPress (evt) {
    if (evt.key === 'Enter') this.handleMenuToggled(evt)
  }

  handleMenuClose (evt) {
    this.setState({ menuIsOpen: false })
  }

  handleMenuToggled (evt) {
    this.setState({ menuIsOpen: !this.state.menuIsOpen })
  }

  render () {
    const { className, Logo, menuItems, module, user } = this.props
    const { menuIsOpen } = this.state

    return (
      <header className={classnames('layout__header', className)}>
        <span className={'header__title'}>{module.name}</span>

        <span
          className='header__brand-logo-container'
          onClick={this.handleLogoClick}
          onKeyPress={this.handleLogoKeyPress}
          role='link'
          tabIndex={0}
        >
          {React.cloneElement(Logo, {
            className: classnames(Logo.props.className, 'header__brand-logo')
          })}
        </span>

        {user && <div className='header__brand-divider' />}

        <Menu
          id='header-menu'
          className='header__menu-container'
          sameWidth={false}
          visible={menuIsOpen}
          position={Menu.Positions.TOP_RIGHT}
          toggle={
            <AccessibleFakeButton className='header__menu-button'>
              {user && <UserDetails user={user} />}
            </AccessibleFakeButton>
          }
          onClick={this.handleMenuToggled}
          onKeyPress={this.handleMenuKeyPress}
          onClose={this.handleMenuClose}
          listStyle={{ top: '100%', right: 10 }}
        >
          {menuItems.map((attrs, idx) => <ListItem key={idx} {...attrs} />)}
        </Menu>
      </header>
    )
  }
}
