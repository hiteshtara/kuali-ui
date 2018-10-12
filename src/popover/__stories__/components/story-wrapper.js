/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'

import Popover from '../..'
import { RaisedButton } from '../../..'

import Lorem from 'react-lorem-component'

@autobind
export default class PopoverStoryWrapper extends Component {
  static propTypes = {
    align: PropTypes.string,
    hideArrow: PropTypes.bool,
    position: PropTypes.string,
    title: PropTypes.string.isRequired
  }

  state = {
    visible: false
  }

  handleToggleVisibility (e) {
    this.setState({ visible: !this.state.visible })
  }

  handleRequestClose (evt) {
    this.setState({ visible: false })
  }

  render () {
    const { align, hideArrow, position, title } = this.props
    const { visible } = this.state

    const content = <Lorem count='1' />

    return (
      <div style={{ margin: '20px' }}>
        <Popover
          content={content}
          onRequestClose={this.handleRequestClose}
          position={position}
          align={align}
          hideArrow={hideArrow}
          title={title}
          visible={visible}
        >
          <RaisedButton
            label={title}
            onClick={this.handleToggleVisibility}
            tabIndex='0'
          />
        </Popover>
      </div>
    )
  }
}
