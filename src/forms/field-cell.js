/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/onclick-has-role */

import React, { cloneElement, Children, Component } from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import { autobind } from 'core-decorators'
import classnames from 'classnames'

import { Label } from '..'

@autobind
export default class FieldCell extends Component {
  static defaultProps = {
    disabled: false
  }

  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    style: PropTypes.object
  }

  handleClick (evt) {
    const { target } = evt

    const targetIsCell = target === this.cell

    if (targetIsCell && this._label && this._label.props.htmlFor) {
      const el = findDOMNode(this._label)
      if (el) el.click()
    }

    if (this.props.onClick) this.props.onClick(...arguments)
  }

  get children () {
    return Children.map(this.props.children, child =>
      cloneElement(child, {
        ref: node => {
          if (child.type === Label) this._label = node
          if (typeof child.ref === 'function') child.ref(node)
        }
      })
    )
  }

  render () {
    const { className, disabled, ...rest } = this.props
    delete rest.onClick

    const classes = classnames(
      'kuali-form__cell',
      { 'kuali-form__cell--disabled': disabled },
      className
    )
    return (
      <div
        className={classes}
        onClick={this.handleClick}
        {...rest}
        ref={ref => {
          this.cell = ref
        }}
      />
    )
  }
}
