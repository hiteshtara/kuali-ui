/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Icon from '../..'

export default class IconPreview extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    variant: PropTypes.string
  }

  styles = {
    container: {
      minWidth: 100,
      flexGrow: 1,
      flexBasis: '5%',
      padding: '0 5px 20px'
    },
    inner: {
      display: 'block',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFF',
      borderRadius: 2,
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      padding: 10
    },
    display: {},
    title: {
      fontSize: 12,
      color: 'rgba(0, 0, 0, .4)'
    }
  }

  render () {
    return (
      <div style={this.styles.container}>
        <div style={this.styles.inner}>
          <div style={this.styles.display}>
            <Icon {...this.props} />
          </div>
          <span style={this.styles.title}>
            {this.props.variant || this.props.name}
          </span>
        </div>
      </div>
    )
  }
}
