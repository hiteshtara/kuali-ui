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

import { DatePicker as MDDatePicker } from 'react-md'

export default class DatePicker extends PureComponent {
  static defaultProps = {
    ...DatePicker.defaultProps
  }

  static propTypes = {
    ...DatePicker.propTypes,
    pickerClassName: PropTypes.string,
    pickerHeaderClassName: PropTypes.string
  }

  render () {
    const { pickerClassName, pickerHeaderClassName, ...rest } = this.props
    const pickerClasses = classnames('kuali-date-picker', pickerClassName)
    const pickerHeaderClasses = classnames(
      'kuali-date-picker',
      pickerHeaderClassName
    )

    return (
      <MDDatePicker
        pickerClassName={pickerClasses}
        pickerHeaderClassName={pickerHeaderClasses}
        {...rest}
      />
    )
  }
}
