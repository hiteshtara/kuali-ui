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

import { OPERATION_TYPES } from '../../constants'

import SelectFieldButton from '../select-field-button'

const valueTypes = [OPERATION_TYPES.AND, OPERATION_TYPES.OR]

export default class Operation extends PureComponent {
  static defaultProps = {
    className: ''
  }

  static propTypes = {
    className: PropTypes.string,
    rowIndex: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOf(valueTypes)
  }

  static defaultProps = {
    value: OPERATION_TYPES.AND
  }

  get classes () {
    return classnames('filter-editor__operation', this.props.className)
  }

  get label () {
    const { rowIndex, value } = this.props

    const label = rowIndex === 0 ? 'Where' : value
    const labelClasses = classnames(
      'filter-editor__operation__label',
      this.classes
    )

    return <span className={labelClasses}>{label}</span>
  }

  get selector () {
    const { onChange, value } = this.props

    return (
      <SelectFieldButton
        className={this.classes}
        id='operation selector'
        menuItems={valueTypes}
        value={value}
        onChange={onChange}
      />
    )
  }

  render () {
    const shouldRenderSelector = this.props.rowIndex === 1
    return shouldRenderSelector ? this.selector : this.label
  }
}
