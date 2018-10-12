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

import { SelectField as MDSelectField } from 'react-md'

export default class SelectField extends Component {
  static Positions = MDSelectField.Positions

  static defaultProps = {
    ...MDSelectField.defaultProps
  }

  static propTypes = {
    ...MDSelectField.propTypes,

    className: PropTypes.string,
    position: PropTypes.oneOf([
      MDSelectField.Positions.BOTTOM_LEFT,
      MDSelectField.Positions.TOP_LEFT,
      MDSelectField.Positions.TOP_RIGHT,
      MDSelectField.Positions.BELOW
    ]).isRequired
  }

  render () {
    const { className, ...rest } = this.props
    const classes = classnames('kuali-select-field', className)

    return <MDSelectField className={classes} {...rest} />
  }
}
