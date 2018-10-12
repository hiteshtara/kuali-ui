/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
/* eslint-disable react/no-unused-prop-types */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM, { findDOMNode } from 'react-dom'
import classnames from 'classnames'
import { uniqueId, assign } from 'lodash'
import { autobind } from 'core-decorators'
import FocusTrap from 'focus-trap-react'

export class PopoverContent extends Component {
  static displayName = 'PopoverContent'

  constructor (props) {
    super(props)

    this.state = {
      elementId: uniqueId('kuali-popover-'),
      positionOverride: null,
      clientWidth: document.documentElement.clientWidth,
      clientHeight: document.documentElement.clientHeight
    }

    this.updateDimensions = this.updateDimensions.bind(this)
  }

  static defaultProps = {
    trapFocus: true
  }

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]).isRequired,
    contentClassName: PropTypes.string,
    mouseDownFn: PropTypes.func.isRequired,
    keyDownFn: PropTypes.func.isRequired,
    focusTrapOptions: PropTypes.object,
    position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']).isRequired,
    align: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    hideArrow: PropTypes.bool,
    title: PropTypes.string,
    titleClassName: PropTypes.string,
    trapFocus: PropTypes.bool,
    container: PropTypes.object.isRequired
  }

  componentDidUpdate (prevProps, prevState) {
    const shouldLayout =
      prevProps.position !== this.props.position ||
      prevProps.align !== this.props.align ||
      prevState.clientWidth !== this.state.clientWidth ||
      prevState.clientHeight !== this.state.clientHeight
    if (shouldLayout) {
      this.layout()
    }
  }

  componentDidMount () {
    this.layout()
    window.addEventListener('resize', this.updateDimensions)
    window.addEventListener('mousedown', this.props.mouseDownFn)
    window.addEventListener('keydown', this.props.keyDownFn)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateDimensions)
    window.removeEventListener('mousedown', this.props.mouseDownFn)
    window.removeEventListener('keydown', this.props.keyDownFn)
  }

  updateDimensions () {
    this.setState({
      clientWidth: document.documentElement.clientWidth,
      clientHeight: document.documentElement.clientHeight
    })
  }

  layout () {
    const { align, hideArrow, position } = this.props
    const { clientHeight, clientWidth } = this.state

    const kualiPopoverPointerWidth = hideArrow ? 0 : 10

    const container = findDOMNode(this.props.container)
    const el = findDOMNode(this)

    if (el && container) {
      const isVertical = ['top', 'bottom'].includes(position)
      const contentRect = el.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()

      // Check for clipping and adjust position if needed
      let renderedPosition = position
      let renderedAlign = align

      const clipping = {
        bottom: clientHeight - (containerRect.bottom + contentRect.height) < 0,
        left: containerRect.left - contentRect.width < 0,
        right: clientWidth - (containerRect.right + contentRect.width) < 0,
        top: containerRect.top - contentRect.height < 0
      }

      let positionOverride, alignOverride
      if (isVertical) {
        if (position === 'bottom' && clipping.bottom && !clipping.top) {
          positionOverride = 'top'
        } else if (!clipping.bottom && clipping.top) {
          positionOverride = 'bottom'
        }
        if (align === 'left' && clipping.right && !clipping.left) {
          alignOverride = 'right'
        } else if (align === 'right' && clipping.left && !clipping.right) {
          alignOverride = 'left'
        }
      } else {
        if (position === 'right' && clipping.right && !clipping.left) {
          positionOverride = 'left'
        } else if (!clipping.right && clipping.left) {
          positionOverride = 'right'
        }
        if (align === 'bottom' && clipping.top && !clipping.bottom) {
          alignOverride = 'top'
        } else if (align === 'top' && clipping.bottom && !clipping.top) {
          alignOverride = 'bottom'
        }
      }

      if (positionOverride) {
        renderedPosition = positionOverride
      }

      if (alignOverride) {
        renderedAlign = alignOverride
      }

      // Position popover content relative to the container
      let top = window.scrollY
      let left = window.scrollX
      if (renderedPosition === 'bottom' || renderedPosition === 'top') {
        if (renderedAlign === 'left') {
          left += containerRect.left
        } else if (renderedAlign === 'right') {
          left += containerRect.right - el.offsetWidth
        } else {
          left += containerRect.left + containerRect.width / 2
        }
      }

      if (renderedPosition === 'bottom') {
        top +=
          containerRect.top + containerRect.height + kualiPopoverPointerWidth
      } else if (renderedPosition === 'top') {
        top += containerRect.top - contentRect.height - kualiPopoverPointerWidth
      }

      if (renderedPosition === 'left' || renderedPosition === 'right') {
        if (renderedAlign === 'top') {
          top += containerRect.top
        } else if (renderedAlign === 'bottom') {
          top += containerRect.bottom - el.offsetHeight
        } else {
          top += containerRect.top + containerRect.height / 2
        }
      }

      if (renderedPosition === 'left') {
        left +=
          containerRect.left - contentRect.width - kualiPopoverPointerWidth
      } else if (renderedPosition === 'right') {
        left +=
          containerRect.left + containerRect.width + kualiPopoverPointerWidth
      }

      el.style.position = 'absolute'
      el.style.left = `${left}px`
      el.style.top = `${top}px`

      this.setState({
        positionOverride,
        alignOverride
      })
    }
  }

  render () {
    const {
      children,
      className,
      contentClassName,
      hideArrow,
      titleClassName,
      title,
      focusTrapOptions,
      trapFocus
    } = this.props
    const elementId = this.state.elementId
    const position = this.state.positionOverride || this.props.position
    const align = this.state.alignOverride || this.props.align

    const classes = classnames(
      'popover__content',
      `popover__content--${position}`,
      {
        'popover__content--has-title': !!title
      },
      {
        'popover__content--aligned': !!align,
        [`popover__content--aligned--${align}`]: !!align
      },
      {
        'popover__content--hide-arrow': !!hideArrow
      },
      className
    )

    const titleClasses = classnames('popover__title', titleClassName)

    const contentClasses = classnames(
      'popover__content-inner',
      contentClassName
    )

    let contents = children
    if (trapFocus) {
      const opts = assign(
        {},
        {
          fallbackFocus: `#${elementId}`
        },
        focusTrapOptions
      )

      const focusElementId = `${elementId}-focus-trap`
      contents = (
        <FocusTrap focusTrapOptions={opts} id={focusElementId}>
          {children}
        </FocusTrap>
      )
    }

    return (
      <div id={elementId} className={classes} ref='el'>
        {title ? <h4 className={titleClasses}>{title}</h4> : null}
        <div className={contentClasses} ref='el'>
          {contents}
        </div>
      </div>
    )
  }
}

@autobind
export default class Popover extends Component {
  static displayName = 'Popover'

  state = {
    elementId: uniqueId('kuali-popover-container')
  }

  static defaultProps = {
    position: 'bottom',
    popoverContainerRootId: undefined
  }

  static propTypes = {
    children: PropTypes.node.isRequired,
    content: PropTypes.node.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    popoverContainerRootId: PropTypes.string,
    trapFocus: PropTypes.bool,
    position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    visible: PropTypes.bool.isRequired
  }

  componentWillUpdate (nextProps, nextState) {
    const { visible } = nextProps
    const elementId = this.state.elementId
    const { registry } = Popover
    if (visible) {
      this.renderPopoverContent(nextProps)
    } else if (!visible && registry[elementId]) {
      this.unrenderPopoverContent()
    }
  }

  componentDidMount () {
    if (this.props.visible) {
      this.renderPopoverContent(this.props)
    }
  }

  componentWillMount () {
    this.initPopupContainer()
  }

  componentWillUnmount () {
    const { registry } = Popover
    const elementId = this.state.elementId
    if (registry[elementId]) {
      this.unrenderPopoverContent()
    }
  }

  initPopupContainer () {
    if (!Popover.root) {
      const rootContainerId = this.props.popoverContainerRootId
      let rootContainer = document.getElementById(rootContainerId)
      if (!rootContainer) {
        rootContainer = document.createElement('div')
        rootContainer.id = 'popover-root-container'
        document.body.appendChild(rootContainer)
      }
      Popover.root = rootContainer
      Popover.registry = {}
    }
  }

  renderPopoverContent (props) {
    const { content, visible, ...rest } = props
    const { elementId } = this.state
    const { registry } = Popover

    if (registry[elementId] === undefined) {
      const popoverDiv = document.createElement('div')
      popoverDiv.id = elementId
      Popover.root.appendChild(popoverDiv)
      registry[elementId] = popoverDiv
    }

    ReactDOM.render(
      <PopoverContent
        container={this}
        {...rest}
        mouseDownFn={this.handleWindowMouseDown}
        keyDownFn={this.handleWindowKeyDown}
      >
        {content}
      </PopoverContent>,
      registry[elementId]
    )
  }

  unrenderPopoverContent () {
    const elementId = this.state.elementId
    const { registry } = Popover
    ReactDOM.unmountComponentAtNode(registry[elementId])
    Popover.root.removeChild(registry[elementId])
    delete registry[elementId]
  }

  handleWindowMouseDown (evt) {
    const { elementId } = this.state
    const { registry } = Popover
    const { target } = evt
    if (!registry[elementId].contains(target)) {
      this.requestClose(evt)
    }
  }

  handleWindowKeyDown (evt) {
    const { keyCode } = evt
    if (keyCode === 27) this.requestClose(evt)
  }

  requestClose (evt) {
    if (!this.props.visible) return
    this.props.onRequestClose(evt)
  }

  render () {
    return React.Children.only(this.props.children)
  }
}
