/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import React, { cloneElement, Component, Children, PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { autobind } from 'core-decorators'
import { injectInk, AccessibleFakeButton } from 'react-md'
import { FlatButton, Icon } from '..'

export class NavList extends PureComponent {
  static defaultProps = {
    collapsed: false,
    nested: false
  }

  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    collapsed: PropTypes.bool,
    nested: PropTypes.bool,
    handleOpenToggle: PropTypes.func
  }

  render () {
    const { className, collapsed, nested, handleOpenToggle } = this.props
    let { children } = this.props
    if (nested && handleOpenToggle) {
      children = Children.map(children, child =>
        cloneElement(child, { handleOpenToggle })
      )
    }
    const classes = classnames(
      'nav-list',
      {
        'nav-list--collapsed': collapsed,
        'nav-list--nested': nested
      },
      className
    )

    return <ul className={classes}>{children}</ul>
  }
}

@injectInk
@autobind
export class NavListItem extends Component {
  static defaultProps = {
    active: false,
    container: AccessibleFakeButton,
    defaultNestedCollapsed: false
  }

  static propTypes = {
    active: PropTypes.bool.isRequired,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    container: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
      .isRequired,
    defaultNestedCollapsed: PropTypes.bool,
    iconName: PropTypes.string,
    ink: PropTypes.node,
    handleOpenToggle: PropTypes.func
  }

  constructor (props) {
    super(...arguments)

    this.state = {
      collapsed: props.defaultNestedCollapsed
    }
  }

  get nestedMenu () {
    const nestedMenu = Children.toArray(this.props.children).find(child => {
      return child.type === NavList
    })

    return nestedMenu || null
  }

  handleCollapseToggle () {
    this.setState({ collapsed: !this.state.collapsed })
  }

  handleOpenToggle () {
    this.setState({ collapsed: false })
  }

  render () {
    const { nestedMenu } = this
    const { collapsed } = this.state
    const {
      active,
      children,
      className,
      container: Container,
      iconName,
      ink,
      handleOpenToggle: parentHandleOpenToggle,
      ...rest
    } = this.props
    delete rest.defaultNestedCollapsed

    const classes = classnames(
      'nav-list__item',
      { 'nav-list__item--active': active },
      className
    )

    const label = Children.toArray(children).find(child => {
      return child.type !== NavList
    })

    return (
      <div className={classes}>
        <div className='nav-list__item-wrapper'>
          <Container
            onFocus={() => {
              if (parentHandleOpenToggle) {
                parentHandleOpenToggle()
              }
            }}
            className='nav-list__item-content'
            tabIndex={0}
            {...rest}
          >
            {iconName ? (
              <Icon className='nav-list__icon' name={iconName} />
            ) : null}

            <span className='nav-list__item-content-inner'>{label}</span>

            {ink}
          </Container>

          {nestedMenu && (
            <FlatButton
              className='nav-list__collapse'
              onClick={this.handleCollapseToggle}
              variant='clear'
            >
              <Icon
                className='nav-list__collapse-icon'
                name={collapsed ? 'arrow_drop_down' : 'arrow_drop_up'}
              />
            </FlatButton>
          )}
        </div>

        {nestedMenu &&
          cloneElement(nestedMenu, {
            handleOpenToggle: this.handleOpenToggle,
            collapsed,
            nested: true
          })}
      </div>
    )
  }
}
