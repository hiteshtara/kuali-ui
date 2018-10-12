/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { IconButton } from '../buttons'
import Icon from '../icons'
import { CSSTransition } from 'react-transition-group'
import classnames from 'classnames'

const kualiAlertTypeInfo = {
  info: {
    headerLabel: 'Info',
    iconName: 'info',
    iconColor: 'info'
  },
  success: {
    headerLabel: 'Success',
    iconName: 'check_circle',
    iconColor: 'success'
  },
  warning: {
    headerLabel: 'Warning',
    iconName: 'warning',
    iconColor: 'warning'
  },
  error: {
    headerLabel: 'Error',
    iconName: 'cancel',
    iconColor: 'error'
  }
}

function generateAlertHeader (title, type, useHeaderLabel) {
  if (useHeaderLabel && title) {
    return `${kualiAlertTypeInfo[type].headerLabel} - ${title}`
  }
  return useHeaderLabel ? kualiAlertTypeInfo[type].headerLabel : title
}

export default class Alert extends Component {
  static TYPES = {
    INFO: 'info',
    SUCCESS: 'success',
    WARNING: 'warning',
    ERROR: 'error'
  }

  static defaultProps = {
    autoHide: false,
    useHeaderLabel: true,
    type: Alert.TYPES.INFO,
    visibleFor: 5000
  }

  static propTypes = {
    autoHide: PropTypes.bool,
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func,
    title: PropTypes.string,
    type: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
    useHeaderLabel: PropTypes.bool,
    visibleFor: PropTypes.number
  }

  constructor (props) {
    super(props)
    this.state = { isOpen: true }
  }

  closeAlert = () => {
    this.setState({ isOpen: false })
    if (this.props.onClose) {
      this.props.onClose()
    }
  }

  autoHide (visibleFor) {
    setTimeout(() => {
      this.closeAlert()
    }, visibleFor)
  }

  componentDidMount () {
    if (this.props.autoHide) {
      this.autoHide(this.props.visibleFor)
    }
  }

  render () {
    const { type, title, useHeaderLabel, message } = this.props
    return (
      <CSSTransition
        classNames='kuali-alert'
        timeout={{
          appear: 650,
          exit: 600
        }}
        appear
        mountOnEnter
        unmountOnExit
        in={this.state.isOpen}
      >
        <div
          className={classnames(
            'kuali-alert--container',
            `kuali-alert--type---${type}`
          )}
        >
          <div className='kuali-alert--icon---box'>
            <Icon
              name={kualiAlertTypeInfo[type]['iconName']}
              variant={kualiAlertTypeInfo[type]['iconColor']}
            />
          </div>
          <div className='kuali-alert--data---box'>
            <h1>{generateAlertHeader(title, type, useHeaderLabel)}</h1>
            <p>{message}</p>
          </div>
          <div className='kuali-alert--header---close'>
            <IconButton onClick={this.closeAlert}>
              <Icon name='clear' />
            </IconButton>
          </div>
        </div>
      </CSSTransition>
    )
  }
}
