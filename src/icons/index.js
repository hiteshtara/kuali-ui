/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { FontIcon } from '..'

import allowedIcons from './allowed-icons'
import enforceAllowedIcons from './enforce-allowed-icons-proptype'

export const supportedVariants = [
  'default',

  // actions
  'error',
  'info',
  'success',
  'warning',

  // brand colors
  'wintergreen',
  'frost',
  'glacier',
  'mint',
  'popsicle',
  'magma',
  'chili',
  'flare',
  'torch'
]

export default class Icon extends Component {
  static propTypes = {
    'aria-hidden': PropTypes.bool,
    'aria-label': PropTypes.string,
    className: PropTypes.string,

    // NOTE: limits the available icons to use from the Material Icons font
    //
    // You'll get warning if not using an approved icon. This is to enforce
    // styleguide requirements but mostly so we know what icons are being used
    // We'll want the flexiblity to trim the webfont size or re-implement in svg
    //
    name: enforceAllowedIcons(PropTypes.string.isRequired, allowedIcons),
    variant: PropTypes.oneOf(supportedVariants).isRequired
  }

  static defaultProps = {
    iconClassName: 'material-icons',
    variant: 'default',
    'aria-hidden': true
  }

  render () {
    const { className, name, variant, ...rest } = this.props
    const classes = classnames(
      'kuali-icon',
      `kuali-icon--${variant}`,
      className
    )

    return (
      <FontIcon className={classes} {...rest}>
        {name}
      </FontIcon>
    )
  }
}
