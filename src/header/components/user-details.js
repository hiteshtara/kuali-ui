/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { injectInk } from 'react-md'

import Avatar from './avatar'

@injectInk
export default class UserDetails extends PureComponent {
  static propTypes = {
    ink: PropTypes.node,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired
  }

  render () {
    const { ink, user } = this.props

    return (
      <div className='header__user-details' tabIndex='0' role='button'>
        <Avatar className='header__avatar' />
        <p className='header__user-name'>{user.name}</p>
        {ink}
      </div>
    )
  }
}
