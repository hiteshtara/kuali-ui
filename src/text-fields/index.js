/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import Icon from '../icons'
import React from 'react'
import cn from 'classnames'
import { TextField as ReactMDTextField } from 'react-md'

export default class TextField extends ReactMDTextField {
  setField = field => {
    if (field !== null) {
      this._field = field
    }
  }

  render () {
    const hasError = this.props.error
    const className = cn(this.props.className, {
      'kuali-text-field__hidden-icon': !hasError && !this.props.leftIcon
    })
    const iconStyle = !hasError ? { display: 'none' } : {}

    const errorIcon = (
      <Icon name='report_problem' variant='error' style={iconStyle} />
    )

    const props = hasError
      ? {
        ...this.props,
        leftIcon: errorIcon
      }
      : {
        leftIcon: errorIcon,
        ...this.props,
        className
      }

    return <ReactMDTextField ref={this.setField} {...props} />
  }
}
