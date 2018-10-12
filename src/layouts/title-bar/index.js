/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { injectInk } from 'react-md'

import { RaisedButton, Icon } from '../../'

@injectInk
export class NavButton extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    ink: PropTypes.node
  }

  render () {
    const { children, ink, ...rest } = this.props

    return (
      <button className='title-bar__nav-button' {...rest}>
        {ink}
        {children}
      </button>
    )
  }
}

export default class TitleBar extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    hasNav: PropTypes.bool,
    onToggleNavOverlay: PropTypes.func,
    onBack: PropTypes.func
  }

  render () {
    const {
      children,
      className,
      hasNav,
      onBack,
      onToggleNavOverlay,
      ...rest
    } = this.props

    const classes = classnames(
      'title-bar',
      { 'title-bar--withNav': hasNav },
      className
    )

    return (
      <div className={classes} {...rest}>
        {hasNav ? (
          <NavButton onClick={onToggleNavOverlay}>
            <Icon name='menu' />
          </NavButton>
        ) : null}

        <div className='title-bar__inner'>
          <h1 className='title-bar__heading'>{children}</h1>

          {onBack ? (
            <RaisedButton
              className='title-bar__button-back'
              size='small'
              label='Back'
              onClick={onBack}
            >
              <Icon name='arrow_back' />
            </RaisedButton>
          ) : null}
        </div>
      </div>
    )
  }
}
