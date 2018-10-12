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

export default class Label extends PureComponent {
  static defaultProps = {
    className: '',
    component: 'label'
  }

  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
  }

  render () {
    const { children, className, component: Comp, ...rest } = this.props
    const classes = classnames('kuali-label', className)

    return (
      <Comp className={classes} {...rest}>
        {children}
      </Comp>
    )
  }
}
