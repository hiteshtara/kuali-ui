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

export default class BrandIcon extends PureComponent {
  static propTypes = {
    className: PropTypes.string
  }

  render () {
    const { className, ...rest } = this.props
    const classes = classnames('brand-icon', className)

    return (
      <svg
        aria-labelledby='brand-icon__title'
        className={classes}
        role='img'
        width='20px'
        height='21px'
        viewBox='0 0 20 21'
        xmlns='http://www.w3.org/2000/svg'
        {...rest}
      >
        <title id='brand-icon__title'>Kuali</title>
        <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
          <g className='brand-icon-group'>
            <polygon points='0 0 0 21 20 21 10.0000643 10.5000675 20 0' />
          </g>
        </g>
      </svg>
    )
  }
}
