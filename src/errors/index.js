/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Icon from '../icons'

export default class Error extends Component {
  static defaultProps = {
    title: 'UH OH! Something went wrong!',
    message: `Sorry for the inconvenience, it looks like we just had a server error.
    Our team of developers has been notified and will get this problem fixed ASAP!`
  }

  static propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
    customIconClass: PropTypes.string
  }

  render () {
    return (
      <div className='error__container'>
        {this.props.customIconClass ? (
          <i
            className={`error__icon ${this.props.customIconClass}`}
            aria-hidden='true'
          />
        ) : (
          <Icon name='warning' className='error__icon' />
        )}
        <div className='error__title'>{this.props.title}</div>
        <div className='error__message'>
          {this.props.message
            .split('\n')
            .map((line, key) => <p key={key}>{line}</p>)}
        </div>
      </div>
    )
  }
}
