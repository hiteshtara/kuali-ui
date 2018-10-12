/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { injectInk } from 'react-md'
import classnames from 'classnames'

import { unsupported as UnsupportedProp } from '../utils/proptypes'
import Icon from '../icons'
import injectTooltip from '../tooltips'

export const supportedVariants = [
  'default',

  // all purpose
  'clear',
  'plain',

  // brand colors
  'primary',

  // actions
  'error',
  'info',
  'success',
  'warning',

  // brand colors
  'wintergreen',
  'frost',
  'glacier',
  'mint',
  'popsicle',
  'magma',
  'chili',
  'flare',
  'torch'
]

const unsupportedProps = [
  'forceIconSize',
  'forceIconFontSize',
  'floating',
  'fixed',
  'fixedPosition',
  'mini',
  'primary',
  'secondary'
].reduce((acc, cur) => ({ ...acc, [cur]: UnsupportedProp }), {})

@injectInk
@injectTooltip
export default class Button extends PureComponent {
  static defaultProps = {
    block: false,
    children: null,
    component: 'button',
    icon: false,
    iconBefore: true,
    size: 'default',
    type: 'submit',
    variant: 'default'
  }

  static propTypes = {
    ...unsupportedProps,
    block: PropTypes.bool.isRequired,
    children: PropTypes.node,
    className: PropTypes.string,
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    flat: PropTypes.bool,
    icon: PropTypes.bool,
    iconBefore: PropTypes.bool.isRequired,
    iconClassName: PropTypes.string,
    ink: PropTypes.node,
    innerRef: PropTypes.func,
    label: PropTypes.node,
    raised: PropTypes.bool,
    size: PropTypes.oneOf(['default', 'small']).isRequired,
    type: PropTypes.oneOf(['button', 'reset', 'submit']),
    variant: PropTypes.oneOf(supportedVariants).isRequired
  }

  get icon () {
    let { children: stringOrIcon, iconClassName } = this.props

    if (!stringOrIcon) return null

    const isString = typeof stringOrIcon === 'string'
    const ToRender = isString ? <Icon name={stringOrIcon} /> : stringOrIcon

    return React.cloneElement(ToRender, {
      className: classnames(
        'kuali-button__icon',
        ToRender.props.className,
        iconClassName
      )
    })
  }

  render () {
    const {
      block,
      className,
      component: Component,
      flat,
      label,
      icon,
      iconBefore,
      ink,
      innerRef,
      raised,
      size,
      tooltip,
      variant,
      ...rest
    } = this.props

    delete rest.children
    delete rest.iconClassName
    delete rest.tooltipLabel
    delete rest.tooltipDelay
    delete rest.tooltipPosition

    const classes = classnames(
      'kuali-button',
      `kuali-button--${variant}`,
      `kuali-button--size__${size}`,
      {
        'kuali-button--block': block,
        'kuali-button--flat': flat,
        'kuali-button--icon': icon,
        'kuali-button--raised': raised
      },
      className
    )

    if (innerRef) {
      rest.ref = innerRef
    }

    return (
      <Component className={classes} {...rest}>
        {ink}
        {tooltip}

        {iconBefore && this.icon}
        {label && <span className='kuali-button__label'>{label}</span>}
        {!iconBefore && this.icon}
      </Component>
    )
  }
}
