/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import React, { Component, PureComponent } from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import classnames from 'classnames'

import { injectInk } from 'react-md'
import { Icon, RaisedButton } from '../..'

@autobind
export class JumpToMenu extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
  }

  state = {
    expanded: false
  }

  handleToggle (evt) {
    this.setState({ expanded: !this.state.expanded })
  }

  render () {
    const { children, className } = this.props
    const { expanded } = this.state

    const classes = classnames(
      'jump-to-menu',
      {
        'jump-to-menu--expanded': expanded
      },
      className
    )

    return (
      <div className={classes}>
        <RaisedButton
          block
          className='jump-to-menu__expand-button'
          label='Jump To'
          onClick={this.handleToggle}
          variant='plain'
        >
          <Icon name='arrow_downward' />
        </RaisedButton>

        <ul className='jump-to-menu__list'>{children}</ul>
      </div>
    )
  }
}

export class JumpToMenuBadge extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    count: PropTypes.number.isRequired
  }

  render () {
    const { className, count, ...rest } = this.props
    const classes = classnames('jump-to-menu__badge', className)

    return (
      <span className={classes} {...rest}>
        {count}
      </span>
    )
  }
}

@injectInk
export class JumpToMenuItem extends PureComponent {
  static defaultProps = {
    badgeCount: 0,
    checked: false
  }

  static propTypes = {
    badgeCount: PropTypes.number,
    className: PropTypes.string,
    error: PropTypes.bool,
    checked: PropTypes.bool,
    children: PropTypes.node.isRequired,
    icon: PropTypes.node,
    ink: PropTypes.node
  }

  get indicator () {
    const { badgeCount, checked, icon, error } = this.props

    let toRender

    if (error) {
      toRender = <Icon name='error' variant='error' />
    } else if (badgeCount > 0) {
      toRender = <JumpToMenuBadge count={badgeCount} />
    } else if (icon) {
      toRender = icon
    } else if (checked) {
      toRender = <Icon name='done' variant='success' />
    }

    if (!toRender) return null

    return <div className='jump-to-menu__item__indicator'>{toRender}</div>
  }

  render () {
    const { children, className, ink, ...rest } = this.props
    delete rest.badgeCount
    delete rest.checked
    delete rest.icon

    const classes = classnames('jump-to-menu__item', className)

    return (
      <li>
        <a className={classes} tabIndex='0' {...rest}>
          <span className='jump-to-menu__item-inner'>{children}</span>

          {this.indicator}
          {ink}
        </a>
      </li>
    )
  }
}
