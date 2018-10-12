/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class IconGroup extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  }

  style = {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: -5,
    marginRight: -5
  }

  render () {
    return <div style={this.style}>{this.props.children}</div>
  }
}
