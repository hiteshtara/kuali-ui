/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import React, { Component, PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { DialogContainer as MDDialog } from 'react-md'

import { IconButton } from '../buttons'
import Icon from '../icons'

class DialogInner extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired
  }

  render () {
    const { children, ...rest } = this.props

    return (
      <div {...rest}>
        <div className='kuali-dialog-inner'>{children}</div>
      </div>
    )
  }
}

export default class Dialog extends Component {
  static defaultProps = {
    actionsPosition: 'center',
    dialogClassName: '',
    contentClassName: '',
    showClose: true,
    showHeader: true,
    showFooter: true
  }

  static propTypes = {
    actions: PropTypes.any,
    actionsPosition: PropTypes.string,
    'aria-describedby': PropTypes.string,
    dialogClassName: PropTypes.string,
    children: PropTypes.node.isRequired,
    contentClassName: PropTypes.string,
    focusOnMount: PropTypes.bool,
    lastChild: PropTypes.bool,
    onHide: PropTypes.func,
    showClose: PropTypes.bool,
    showHeader: PropTypes.bool,
    showFooter: PropTypes.bool,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
  }

  render () {
    const {
      actions,
      actionsPosition,
      children,
      contentClassName,
      dialogClassName,
      title,
      showClose,
      showHeader,
      showFooter,
      ...passThroughProps
    } = this.props

    const contentClasses = classnames('kuali-dialog-section', contentClassName)

    const actionsAreRightAligned = actionsPosition === 'right'
    const actionsAreLeftAligned = actionsPosition === 'left'
    const actionsAreCenterAligned =
      !actionsAreRightAligned || !actionsAreLeftAligned

    const dialogClasses = classnames(
      'kuali-dialog',
      {
        'kuali-dialog--actions-right': actionsAreRightAligned,
        'kuali-dialog--actions-left': actionsAreLeftAligned,
        'kuali-dialog--actions-center': actionsAreCenterAligned
      },
      dialogClassName
    )

    const stringTitle = typeof title === 'string' ? title : null
    const describedby = this.props['aria-describedby'] || stringTitle

    return (
      <MDDialog
        actions={showFooter ? actions : null}
        aria-describedby={describedby}
        component={DialogInner}
        contentClassName={contentClasses}
        dialogClassName={dialogClasses}
        focusOnMount={false}
        lastChild
        {...passThroughProps}
      >
        {showHeader && (
          <header className='kuali-dialog--header'>
            <h1 className='kuali-dialog--header---title'>{title}</h1>
            {showClose && (
              <div className='kuali-dialog--header---close'>
                <IconButton onClick={this.props.onHide}>
                  <Icon name='close' />
                </IconButton>
              </div>
            )}
          </header>
        )}

        <div className='kuali-dialog--content'>{children}</div>
      </MDDialog>
    )
  }
}
