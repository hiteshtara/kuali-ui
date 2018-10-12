/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import classnames from 'classnames'

import { SelectField as MDSelectField } from 'react-md'

const { BELOW } = MDSelectField.Positions

@autobind
export default class SelectFieldButton extends Component {
  static defaultProps = {
    className: '',
    listClassName: '',
    placeholder: 'Choose',
    position: BELOW
  }
  static propTypes = {
    className: PropTypes.string,
    listClassName: PropTypes.string
  }

  render () {
    const { className, listClassName, ...rest } = this.props

    const classes = classnames('filter-editor__select-field-button', className)
    const listClasses = classnames(
      'filter-editor__select-field-button__list',
      listClassName
    )

    return (
      <MDSelectField
        className={classes}
        listClassName={listClasses}
        {...rest}
      />
    )
  }
}
