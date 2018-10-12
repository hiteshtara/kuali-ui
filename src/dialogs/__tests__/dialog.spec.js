/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import React from 'react'
import { shallow } from 'enzyme'

import { RaisedButton } from '../../buttons'
import Dialog from '..'

describe('Dialog Component', () => {
  it('should render with a close button', () => {
    const wrapper = shallow(
      <Dialog
        id='modal-dialog'
        visible
        onHide={() => {}}
        title='Modal Dialog'
        showClose
      >
        <div>Some really nice modal content goes here!</div>
      </Dialog>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should render without a close button', () => {
    const wrapper = shallow(
      <Dialog id='modal-dialog' visible onHide={() => {}} title='Modal Dialog'>
        <div>Some really nice modal content goes here!</div>
      </Dialog>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should render without header', () => {
    const wrapper = shallow(
      <Dialog
        id='modal-dialog'
        visible
        onHide={() => {}}
        title='Modal Dialog'
        showHeader={false}
      >
        <div>Some really nice modal content goes here!</div>
      </Dialog>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should render without footer', () => {
    const wrapper = shallow(
      <Dialog
        id='modal-dialog'
        visible
        onHide={() => {}}
        title='Modal Dialog'
        showFooter={false}
      >
        <div>Some really nice modal content goes here!</div>
      </Dialog>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should render without header or footer', () => {
    const wrapper = shallow(
      <Dialog
        id='modal-dialog'
        visible
        onHide={() => {}}
        title='Modal Dialog'
        showHeader={false}
        showFooter={false}
      >
        <div>Some really nice modal content goes here!</div>
      </Dialog>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should render with actions positioned right', () => {
    const actions = [
      <RaisedButton label='first' />,
      <RaisedButton label='second' />
    ]
    const wrapper = shallow(
      <Dialog
        id='modal-dialog'
        visible
        onHide={() => {}}
        title='Modal Dialog'
        actionsPosition='right'
        actions={actions}
      >
        <div>Some really nice modal content goes here!</div>
      </Dialog>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should render with actions positioned left', () => {
    const actions = [
      <RaisedButton label='first' />,
      <RaisedButton label='second' />
    ]
    const wrapper = shallow(
      <Dialog
        id='modal-dialog'
        visible
        onHide={() => {}}
        title='Modal Dialog'
        actionsPosition='left'
        actions={actions}
      >
        <div>Some really nice modal content goes here!</div>
      </Dialog>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
