/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import { action } from '@storybook/addon-actions'

import React, { Component } from 'react'
import { autobind } from 'core-decorators'

import Lorem from 'react-lorem-component'
import { RaisedButton, Icon } from '../../..'
import { Radio } from '../../../selection-controls'

import Dialog from '../..'

@autobind
export default class DialogPlayground extends Component {
  state = {
    showClose: true,
    showHeader: true,
    showFooter: true,
    actionsPosition: 'center',
    showSubDialog: false
  }

  toggleHeader () {
    this.setState({ showHeader: !this.state.showHeader })
  }

  toggleCloseX () {
    this.setState({ showClose: !this.state.showClose })
  }

  toggleFooter () {
    this.setState({ showFooter: !this.state.showFooter })
  }

  changeActionsPosition = value => {
    this.setState({ actionsPosition: value })
  }

  showSubDialog () {
    this.setState({ showSubDialog: true })
  }

  closeSubDialog () {
    this.setState({ showSubDialog: false })
  }

  get actions () {
    const closeBtn = (
      <RaisedButton onClick={action('onCancel')} label='Cancel' variant='plain'>
        <Icon name='close' />
      </RaisedButton>
    )

    const deleteBtn = (
      <RaisedButton onClick={action('onDelete')} label='Delete' variant='plain'>
        <Icon name='delete' />
      </RaisedButton>
    )
    const submitBtn = (
      <RaisedButton onClick={action('onSubmit')} label='Submit' variant='plain'>
        <Icon name='check' />
      </RaisedButton>
    )

    return [closeBtn, deleteBtn, submitBtn]
  }

  render () {
    return (
      <div>
        <Dialog
          actions={this.actions}
          id='modal'
          visible
          onHide={action('Trigger Hide')}
          title='Modal Dialog'
          showClose={this.state.showClose}
          showHeader={this.state.showHeader}
          showFooter={this.state.showFooter}
          actionsPosition={this.state.actionsPosition}
        >
          <h3>Adjust Modal Props</h3>
          <fieldset>
            <legend className='md-subheading-1'>Footer Options</legend>
            <RaisedButton
              onClick={this.toggleHeader}
              label='Toggle Header Visibility'
            />
            <RaisedButton
              onClick={this.toggleCloseX}
              style={{ marginLeft: '15px' }}
              label='Toggle Close X'
            />
          </fieldset>

          <br />

          <fieldset>
            <legend className='md-subheading-1'>Footer Options</legend>
            <RaisedButton
              onClick={this.toggleFooter}
              label='Toggle Footer Visibility'
            />
            <div>
              <Radio
                id='left'
                inline
                name='actions-position'
                value='left'
                label='Left'
                checked={this.state.actionsPosition === 'left'}
                onChange={this.changeActionsPosition}
              />
              <Radio
                id='center'
                inline
                name='actions-position'
                value='center'
                label='Center'
                checked={this.state.actionsPosition === 'center'}
                onChange={this.changeActionsPosition}
              />
              <Radio
                id='right'
                inline
                name='actions-position'
                value='right'
                label='Right'
                checked={this.state.actionsPosition === 'right'}
                onChange={this.changeActionsPosition}
              />
            </div>
          </fieldset>

          <br />

          <fieldset>
            <legend className='md-subheading-1'>Dialog Inside A Dialog</legend>
            <RaisedButton
              onClick={this.showSubDialog}
              label='Open Another Dialog'
            />
          </fieldset>
        </Dialog>

        <Dialog
          id='sub-dialog'
          visible={this.state.showSubDialog}
          onHide={this.closeSubDialog}
          title='Sub Dialog'
          showClose
          showFooter={false}
        >
          <Lorem />
        </Dialog>
      </div>
    )
  }
}
