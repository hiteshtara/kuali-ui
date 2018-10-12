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

import { deprecated } from '../utils/proptypes'

export default class Form extends PureComponent {
  static defaultProps = {
    showGrid: false,
    style: {}
  }

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    formStyle: deprecated(
      PropTypes.object,
      'formStyle is deprecated. Use style instead'
    ),
    showGrid: PropTypes.bool,
    style: PropTypes.object
  }

  render () {
    const {
      children,
      className,
      formStyle,
      showGrid,
      style,
      ...rest
    } = this.props

    const classes = classnames(
      {
        'kuali-form': true,
        'kuali-form--gridded': showGrid
      },
      className
    )
    const styles = { ...formStyle, ...style }

    return (
      <form className={classes} style={styles} {...rest}>
        <div className='kuali-form--fieldset'>{children}</div>
      </form>
    )
  }
}
