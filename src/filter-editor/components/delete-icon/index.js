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

import { Icon, IconButton } from '../../..'

@autobind
export default class DeleteIcon extends PureComponent {
  static defaultProps = {
    className: ''
  }

  static propTypes = {
    className: PropTypes.string,
    onDelete: PropTypes.func.isRequired
  }

  handleClick (evt) {
    this.props.onDelete(evt)
  }

  render () {
    const { className } = this.props
    const classes = classnames('filter-editor__delete-icon', className)

    return (
      <IconButton className={classes} onClick={this.handleClick}>
        <Icon name='delete' />
      </IconButton>
    )
  }
}
