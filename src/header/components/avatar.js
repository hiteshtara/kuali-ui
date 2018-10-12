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

export default class Avatar extends PureComponent {
  static propTypes = {
    className: PropTypes.string
  }

  render () {
    const { className } = this.props
    const classes = classnames('avatar', className)

    return <div className={classes} />
  }
}
