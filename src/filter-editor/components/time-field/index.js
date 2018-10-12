/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import classnames from 'classnames'
import TextField from '../text-field-custom'
import { getStartOfDay, getSecondsFromString } from '../../constants'

@autobind
export default class TimeField extends PureComponent {
  static defaultProps = {
    className: ''
  }

  static propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        time: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
      })
    ])
  }

  get time () {
    const { value: propValue } = this.props
    if (!propValue) return ''

    const seconds =
      typeof propValue === 'string'
        ? getSecondsFromString(propValue)
        : propValue.time
    const date = new Date(getStartOfDay().getTime() + seconds * 1000)
    return date.toLocaleString(
      {},
      { hour: 'numeric', minute: 'numeric', hour12: false }
    )
  }

  handleTimeChange (value) {
    return {
      time: getSecondsFromString(value)
    }
  }

  render () {
    const { className, onChange, value, ...rest } = this.props
    const classes = classnames('filter-editor__time-field', className)

    return (
      <TextField
        className={classes}
        onChange={value => onChange(this.handleTimeChange(value))}
        type='time'
        value={this.time}
        {...rest}
      />
    )
  }
}
