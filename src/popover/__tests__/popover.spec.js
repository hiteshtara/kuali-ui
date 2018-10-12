/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import React from 'react'
import { mount } from 'enzyme'
import sinon from 'sinon'

import Popover from '..'

const noop = () => {}

const mouseEvent = (type, sx, sy, cx, cy) => {
  var evt
  var e = {
    bubbles: true,
    cancelable: type !== 'mousemove',
    view: window,
    detail: 0,
    screenX: sx,
    screenY: sy,
    clientX: cx,
    clientY: cy,
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    metaKey: false,
    button: 0,
    relatedTarget: undefined
  }
  evt = document.createEvent('MouseEvents')
  evt.initMouseEvent(
    type,
    e.bubbles,
    e.cancelable,
    e.view,
    e.detail,
    e.screenX,
    e.screenY,
    e.clientX,
    e.clientY,
    e.ctrlKey,
    e.altKey,
    e.shiftKey,
    e.metaKey,
    e.button,
    document.body.parentNode
  )
  return evt
}

describe('Popover Component', () => {
  it('should render default', () => {
    const content = <div>Popover content is the best</div>
    const wrapper = mount(
      <Popover
        content={content}
        title='My Popover'
        onRequestClose={noop}
        trapFocus={false}
        visible
      >
        <p>render around me</p>
      </Popover>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should render left', () => {
    const content = <div>Popover content is the best</div>
    const wrapper = mount(
      <Popover
        content={content}
        position={'left'}
        title='My Popover'
        onRequestClose={noop}
        trapFocus={false}
        visible
      >
        <p>render around me</p>
      </Popover>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should render right', () => {
    const content = <div>Popover content is the best</div>
    const wrapper = mount(
      <Popover
        content={content}
        position={'right'}
        title='My Popover'
        onRequestClose={noop}
        trapFocus={false}
        visible
      >
        <p>render around me</p>
      </Popover>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should render top', () => {
    const content = <div>Popover content is the best</div>
    const wrapper = mount(
      <Popover
        content={content}
        position={'right'}
        title='My Popover'
        onRequestClose={noop}
        trapFocus={false}
        visible
      >
        <p>render around me</p>
      </Popover>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should render left aligned', () => {
    const content = <div>Popover content is the best</div>
    const wrapper = mount(
      <Popover
        content={content}
        position='top'
        align='left'
        title='My Popover'
        onRequestClose={noop}
        trapFocus={false}
        visible
      >
        <p>render around me</p>
      </Popover>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should render right aligned', () => {
    const content = <div>Popover content is the best</div>
    const wrapper = mount(
      <Popover
        content={content}
        position='top'
        align='right'
        title='My Popover'
        onRequestClose={noop}
        trapFocus={false}
        visible
      >
        <p>render around me</p>
      </Popover>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should render top aligned', () => {
    const content = <div>Popover content is the best</div>
    const wrapper = mount(
      <Popover
        content={content}
        position='left'
        align='top'
        title='My Popover'
        onRequestClose={noop}
        trapFocus={false}
        visible
      >
        <p>render around me</p>
      </Popover>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should render bottom aligned', () => {
    const content = <div>Popover content is the best</div>
    const wrapper = mount(
      <Popover
        content={content}
        position='left'
        align='bottom'
        title='My Popover'
        onRequestClose={noop}
        trapFocus={false}
        visible
      >
        <p>render around me</p>
      </Popover>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should render without arrow', () => {
    const content = <div>Popover content is the best</div>
    const wrapper = mount(
      <Popover
        content={content}
        position='left'
        align='bottom'
        hideArrow
        title='My Popover'
        onRequestClose={noop}
        trapFocus={false}
        visible
      >
        <p>render around me</p>
      </Popover>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should bind/unbind for mousedown events', () => {
    const addSpy = sinon.spy(window, 'addEventListener')
    const removeSpy = sinon.spy(window, 'removeEventListener')

    const content = <div>Popover content is the best</div>
    const wrapper = mount(
      <Popover
        content={content}
        onRequestClose={noop}
        visible
        trapFocus={false}
      >
        <p>render around me</p>
      </Popover>
    )

    expect(addSpy.calledWith('mousedown')).toBeTruthy()
    wrapper.unmount()
    expect(removeSpy.calledWith('mousedown')).toBeTruthy()
    addSpy.restore()
    removeSpy.restore()
  })

  it('should bind/unbind for keydown events', () => {
    const addSpy = sinon.spy(window, 'addEventListener')
    const removeSpy = sinon.spy(window, 'removeEventListener')

    const content = <div>Popover content is the best</div>
    const wrapper = mount(
      <Popover
        content={content}
        onRequestClose={noop}
        visible
        trapFocus={false}
      >
        <p>render around me</p>
      </Popover>
    )

    expect(addSpy.calledWith('keydown')).toBeTruthy()
    wrapper.unmount()
    expect(removeSpy.calledWith('keydown')).toBeTruthy()
    addSpy.restore()
    removeSpy.restore()
  })

  it('should install a focus trap if set', () => {
    const content = <button>My Button</button>
    const wrapper = mount(
      <Popover content={content} onRequestClose={noop} visible trapFocus>
        <p>render around me</p>
      </Popover>
    )

    expect(document.body.innerHTML).toEqual(
      expect.stringMatching(/.*id=".*-focus-trap".*/)
    )
    wrapper.unmount()
  })

  it('should not install a focus trap if not set', () => {
    const content = <button>My Button</button>
    const wrapper = mount(
      <Popover
        content={content}
        onRequestClose={noop}
        visible
        trapFocus={false}
      >
        <p>render around me</p>
      </Popover>
    )

    expect(document.body.innerHTML).not.toEqual(
      expect.stringMatching(/.*id=".*-focus-trap".*/)
    )
    wrapper.unmount()
  })

  it('should call the onRequestClose prop when escape is pressed', () => {
    const spy = sinon.spy()

    const content = <div>Popover content is the best</div>
    mount(
      <Popover content={content} onRequestClose={spy} visible trapFocus={false}>
        <p>render around me</p>
      </Popover>
    )

    const event = new window.Event('keydown')
    event.keyCode = 27
    window.dispatchEvent(event)
    expect(spy.callCount).toEqual(1)
  })

  it('should call the onRequestClose prop when the window is clicked', () => {
    const spy = sinon.spy()

    const content = <div>Popover content is the best</div>
    mount(
      <Popover content={content} onRequestClose={spy} visible trapFocus={false}>
        <p>render around me</p>
      </Popover>
    )

    const event = mouseEvent('mousedown')
    document.body.dispatchEvent(event)
    expect(spy.callCount).toEqual(1)
  })
})
