/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import React, { PureComponent } from 'react'
import Snackbar from '..'
import Button from '../../buttons'

export default class SnackExamples extends PureComponent {
  state = { toasts: [], autohide: true }

  addToast = (text, action, autohide = true) => {
    this.setState(state => {
      const toasts = state.toasts.slice()
      toasts.push({ text, action })
      return { toasts, autohide }
    })
  }

  dismissToast = () => {
    const [, ...toasts] = this.state.toasts
    this.setState({ toasts })
  }

  toastHello = () => {
    this.addToast('Hello, World!')
  }

  toastRetry = () => {
    this.addToast('Something happened...', 'Retry', false)
  }

  chainToasts = () => {
    this.addToast('Sent', 'Undo')
    this.addToast('Connection timed out. Showing limited messages.', {
      children: 'Retry',
      onClick: () => {
        console.log('You tried again for some reason...') // eslint-disable-line no-alert
      }
    })
  }

  render () {
    const { toasts, autohide } = this.state

    return (
      <div className='buttons__group'>
        <Button raised onClick={this.toastHello} label='Toast Hello, World!' />
        <Button
          raised
          onClick={this.toastRetry}
          label='Requiring action to dismiss'
        />
        <Button raised onClick={this.chainToasts} label='Chained toasts' />
        <Snackbar
          id='example-snackbar'
          toasts={toasts}
          autohide={autohide}
          onDismiss={this.dismissToast}
        />
      </div>
    )
  }
}
