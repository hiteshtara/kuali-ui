/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { action } from '@storybook/addon-actions'
import toggleable from '../../../../.storybook/mixins/toggleable'

import { Icon, RaisedButton } from '../../..'

import Dialog from '../..'

@toggleable({ startVisible: true })
export default class DialogStoryWrapper extends Component {
  static propTypes = {
    isVisible: PropTypes.bool,
    onClose: PropTypes.func,
    onToggle: PropTypes.func,
    children: PropTypes.node.isRequired,
    title: PropTypes.string
  }

  get actions () {
    const { onClose } = this.props

    const closeBtn = (
      <RaisedButton onClick={onClose} label='Cancel'>
        <Icon name='close' />
      </RaisedButton>
    )

    const deleteBtn = (
      <RaisedButton onClick={action('onDelete')} label='Delete'>
        <Icon name='delete' />
      </RaisedButton>
    )
    const submitBtn = (
      <RaisedButton onClick={action('onSubmit')} label='Submit'>
        <Icon name='check' />
      </RaisedButton>
    )

    return [closeBtn, deleteBtn, submitBtn]
  }

  render () {
    const { children, isVisible, onClose, onToggle, title } = this.props

    return (
      <div>
        <RaisedButton label='Open Dialog' onClick={onToggle} />
        <Dialog
          actions={this.actions}
          id='dialog'
          onHide={onClose}
          title={title}
          visible={isVisible}
          portal
          lastChild
          disableScrollLocking
          renderNode={document.body}
          actionsPosition='right'
        >
          {children}
        </Dialog>
      </div>
    )
  }
}
