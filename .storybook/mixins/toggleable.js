/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import React, { Component } from 'react'

export default function toggleable (config) {
  const startVisible =
    config && config.startVisible ? config.startVisible : false

  return function decorateSource (DecoratedComponent) {
    return class Toggleable extends Component {
      state = { isVisible: startVisible }

      handleToggle = () => {
        this.setState(prevState => ({ isVisible: !prevState.isVisible }))
      }

      handleClose = () => {
        this.setState({ isVisible: false })
      }

      handleOpen = () => {
        this.setState({ isVisible: true })
      }

      render () {
        return (
          <DecoratedComponent
            {...this.props}
            {...this.state}
            onToggle={this.handleToggle}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
          />
        )
      }
    }
  }
}
