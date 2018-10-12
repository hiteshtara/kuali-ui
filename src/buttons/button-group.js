/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class ButtonGroup extends PureComponent {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired
  }

  render () {
    return (
      <div className='kuali-button-group'>
        {this.props.children}
      </div>
    )
  }
}
