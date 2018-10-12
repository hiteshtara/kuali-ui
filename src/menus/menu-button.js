/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import { findDOMNode } from 'react-dom'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'

import Button from '../buttons'
import { ESC, UP, DOWN } from '../utils/keyCodes'
import { Menu } from '..' // eslint-disable-line import/named

@autobind
export default class MenuButton extends PureComponent {
  static propTypes = {
    id: PropTypes.string,
    buttonChildren: PropTypes.node,
    buttonId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    children: PropTypes.node,
    sameWidth: PropTypes.string,
    defaultOpen: PropTypes.bool,
    fullWidth: PropTypes.string,
    listClassName: PropTypes.string,
    listId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    listStyle: PropTypes.string,
    menuStyle: PropTypes.object,
    menuClassName: PropTypes.string,
    onClick: PropTypes.func,
    onMenuToggle: PropTypes.func,
    position: PropTypes.string,
    transitionEnterTimeout: PropTypes.number,
    transitionLeaveTimeout: PropTypes.number,
    transitionName: PropTypes.string
  }

  constructor (props) {
    super(props)
    this._activeItem = null
    this._menuItems = []
    this.state = { visible: props.defaultOpen || false }
  }

  _setActiveItem (item) {
    if (!item) {
      return
    }

    if (item.focus) {
      item.focus()
    }
    this._activeItem = item
  }

  _toggleMenu (e) {
    const visible = !this.state.visible

    if (this.props.onClick) this.props.onClick(e)
    if (this.props.onMenuToggle) this.props.onMenuToggle(visible, e)

    this.setState({ visible }, () => {
      if (visible && this._menuItems.length > 0) {
        this._setActiveItem(this._menuItems[0])
      }
    })
  }

  _closeMenu (e) {
    if (this.props.onMenuToggle) this.props.onMenuToggle(false, e)
    this.setState({ visible: false }, () => {
      this._menuItems = []
      this._activeItem = null
    })
  }

  _handleKeyDown (e) {
    const key = e.which || e.keyCode
    if (key === ESC) {
      this._closeMenu()
      this.button.focus()
    } else if (key === UP || key === DOWN) {
      const itemIndex = this._menuItems.indexOf(this._activeItem)
      const direction = key === UP ? -1 : 1

      let newItemIndex
      if (itemIndex >= this._menuItems.length - 1 && direction === 1) {
        newItemIndex = 0
      } else if (itemIndex === 0 && direction === -1) {
        newItemIndex = this._menuItems.length - 1
      } else {
        newItemIndex = itemIndex + direction
      }
      this._setActiveItem(this._menuItems[newItemIndex])
    }
  }

  _handleBlur (e) {
    const blurTarget = e.relatedTarget

    let foundParent = false
    let node = blurTarget
    while (foundParent === false && node != null && node !== window) {
      foundParent = node === this._menu
      node = node.parentNode
    }

    if (!foundParent) {
      this._closeMenu()
    }
  }

  _setMenuItem (item) {
    if (item) {
      this._menuItems.push(item)
    }
  }

  render () {
    const { visible } = this.state
    const {
      id,
      listId,
      buttonId,
      menuStyle,
      menuClassName,
      listStyle,
      listClassName,
      buttonChildren,
      children,
      fullWidth,
      position,
      sameWidth,
      transitionName,
      transitionEnterTimeout,
      transitionLeaveTimeout,
      ...props
    } = this.props

    delete props.onClick
    delete props.onMenuToggle
    delete props.defaultOpen

    const menuChildren = children.map((child, index) =>
      React.cloneElement(child, {
        ref: this._setMenuItem,
        key: index,
        tabIndex: -1
      })
    )

    const toggle = (
      <Button
        key='menu-button'
        {...props}
        id={buttonId}
        onClick={this._toggleMenu}
        role='menu'
        aria-controls={id}
        ref={ref => {
          this.button = ref
        }}
      >
        {buttonChildren}
      </Button>
    )

    return (
      <Menu
        id={id}
        listId={listId}
        style={menuStyle}
        className={menuClassName}
        listStyle={listStyle}
        listClassName={listClassName}
        toggle={toggle}
        visible={visible}
        onClose={this._closeMenu}
        onKeyDown={this._handleKeyDown}
        onBlur={this._handleBlur}
        sameWidth={sameWidth}
        position={position}
        fullWidth={fullWidth}
        transitionName={transitionName}
        transitionEnterTimeout={transitionEnterTimeout}
        transitionLeaveTimeout={transitionLeaveTimeout}
        ref={ref => (this._menu = findDOMNode(ref))}
      >
        {menuChildren}
      </Menu>
    )
  }
}
