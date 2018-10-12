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

import { TimePicker as MDTimePicker } from 'react-md'

export default class TimePicker extends PureComponent {
  static defaultProps = {
    ...TimePicker.defaultProps
  }

  static propTypes = {
    ...TimePicker.propTypes,
    pickerClassName: PropTypes.string
  }

  render () {
    const { pickerClassName, ...rest } = this.props
    const pickerClasses = classnames('kuali-time-picker', pickerClassName)

    return <MDTimePicker pickerClassName={pickerClasses} {...rest} />
  }
}
