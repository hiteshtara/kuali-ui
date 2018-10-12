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

export default class Content extends PureComponent {
  static defaultProps = {
    className: '',
    tag: 'div'
  }

  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string.isRequired,
    tag: PropTypes.oneOf(['div', 'section', 'form'])
  }

  render () {
    const { children, className, tag: Tag, ...rest } = this.props
    const classes = classnames('filter-editor__content', className)

    return (
      <Tag className={classes} {...rest}>
        {children}
      </Tag>
    )
  }
}
