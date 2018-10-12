/* Copyright © 2018 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import React, { cloneElement, Component } from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import classnames from 'classnames'
import { Drawer, FontIcon } from '../../'
import { BrandIcon } from '../../brand'
import { NavList, NavListItem } from '../../nav-lists'
import TitleBar from '../title-bar'

@autobind
export default class GrayjoyLayout extends Component {
  constructor (props) {
    super(props)
    this.state = { sidebarIsExpanded: false }
  }

  static propTypes = {
    appName: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    pageTitle: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.node.isRequired
    ]),
    sidebarBodyLinks: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node)
    ]),
    sidebarFooterLinks: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node)
    ])
  }

  applySidebarItemClassNames = element =>
    cloneElement(element, {
      className: classnames('grayjoy-layout__sidebar-item', {
        'grayjoy-layout__sidebar-item-active': element.props.active
      })
    })

  toggleSidebarVisibility = () => {
    this.setState({ sidebarIsExpanded: !this.state.sidebarIsExpanded })
  }

  render () {
    const {
      children,
      className,
      appName,
      pageTitle,
      sidebarBodyLinks,
      sidebarFooterLinks
    } = this.props

    const { sidebarIsExpanded } = this.state

    const classes = classnames('grayjoy-layout', className)

    return (
      <div className={classes}>
        <div className='grayjoy-layout__skipNav'>
          <a href='#mainContent' className='grayjoy-layout__skipNav--link'>
            Skip to main content
          </a>
        </div>
        <Drawer
          visible={sidebarIsExpanded}
          onVisibilityChange={() => {}}
          onMediaTypeChange={() => {}}
          className={classnames('grayjoy-layout__sidebar', {
            'grayjoy-layout__sidebar--mini': !sidebarIsExpanded
          })}
          mobileType={Drawer.DrawerTypes.TEMPORARY}
          type={
            sidebarIsExpanded
              ? Drawer.DrawerTypes.PERSISTENT
              : Drawer.DrawerTypes.PERSISTENT_MINI
          }
          header={
            <div className='grayjoy-layout__sidebar-header'>
              <BrandIcon />
              <span className='grayjoy-layout__sidebar-header-text'>
                {appName}
              </span>
            </div>
          }
        >
          <NavList className='grayjoy-layout__sidebar-body'>
            {sidebarBodyLinks}
          </NavList>
          <NavList className='grayjoy-layout__sidebar-footer'>
            {sidebarFooterLinks}
            <NavListItem
              onClick={this.toggleSidebarVisibility}
              iconName={
                sidebarIsExpanded
                  ? 'keyboard_arrow_left'
                  : 'keyboard_arrow_right'
              }
            >
              {sidebarIsExpanded ? 'Collapse menu' : ''}
            </NavListItem>
          </NavList>
        </Drawer>
        <div className='grayjoy-layout__body'>
          <TitleBar className='grayjoy-layout__titlebar'>
            <FontIcon
              className='grayjoy-layout__titlebar-menu-icon'
              onClick={this.toggleSidebarVisibility}
            >
              menu
            </FontIcon>
            <div
              className={classnames('grayjoy-layout__titlebar-title', {
                'grayjoy-layout__titlebar-title--sidebar-expanded': sidebarIsExpanded
              })}
            >
              {pageTitle}
            </div>
          </TitleBar>

          <div
            id='mainContent'
            className={classnames('grayjoy-layout__main', {
              'grayjoy-layout__main--sidebar-expanded': sidebarIsExpanded
            })}
          >
            {children}
          </div>
        </div>
      </div>
    )
  }
}
