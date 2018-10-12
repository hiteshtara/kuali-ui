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

import { TextField as MDTextField } from 'react-md'

@autobind
export default class TextFieldCustom extends Component {
  static defaultProps = {
    className: '',
    fullWidth: false,
    placeholder: ''
  }

  static propTypes = {
    className: PropTypes.string
  }

  render () {
    const { className, ...rest } = this.props
    const classes = classnames('filter-editor__text-field', className)

    return <MDTextField className={classes} {...rest} />
  }
}
