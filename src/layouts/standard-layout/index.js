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

import { FlatButton, Icon, NavList, NavListItem } from '../..'

@autobind
export default class StandardLayout extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    header: PropTypes.element.isRequired,
    navList: PropTypes.element,
    sidebar: PropTypes.element,
    titleBar: PropTypes.element.isRequired
  }

  state = {
    navCollapsed: false,
    navOverlayed: false
  }

  toggleNavCollapse (evt) {
    this.setState({ navCollapsed: !this.state.navCollapsed })
  }

  toggleNavOverlay (evt) {
    this.setState({ navOverlayed: !this.state.navOverlayed })
  }

  renderNavList () {
    if (!this.props.navList) {
      return null
    }

    const { navCollapsed, navOverlayed } = this.state
    const navClasses = classnames('layout__nav', {
      'layout__nav--collapsed': navCollapsed,
      'layout__nav--overlayed': navOverlayed
    })

    return (
      <nav id='nav' className={navClasses}>
        <NavList>
          <NavListItem
            className='nav-list__item--hide'
            iconName={navCollapsed ? 'menu' : 'clear'}
            onClick={this.toggleNavCollapse}
          >
            Hide Menu
          </NavListItem>
        </NavList>

        {this.props.navList}

        <FlatButton
          className='layout__nav-close'
          onClick={this.toggleNavOverlay}
          variant='clear'
        >
          <Icon name='close' />
        </FlatButton>
      </nav>
    )
  }

  render () {
    const {
      children,
      className,
      header,
      navList,
      sidebar,
      titleBar
    } = this.props

    const classes = classnames('layout', 'layout--standard', className)

    return (
      <div className={classes}>
        <div id='skipmenu'>
          <a href='#nav' className='layout__skippy'>
            Skip directly to navigation
          </a>
          <a href='#mainContent' className='layout__skippy'>
            Skip directly to main content
          </a>
        </div>
        {header}

        <div className='layout__body'>
          {this.renderNavList()}

          <main className='layout__main'>
            {React.cloneElement(titleBar, {
              hasNav: !!navList,
              onToggleNavOverlay: this.toggleNavOverlay
            })}

            <div className='layout__content-wrapper'>
              <div id='mainContent' className='layout__content'>
                {children}
              </div>

              {sidebar
                ? React.cloneElement(sidebar, { className: 'layout__sidebar' })
                : null}
            </div>
          </main>
        </div>
      </div>
    )
  }
}
