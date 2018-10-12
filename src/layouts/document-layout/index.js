/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import React, { cloneElement, Component } from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import classnames from 'classnames'

import Paper from '../../papers'

@autobind
export default class DocumentLayout extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    header: PropTypes.element.isRequired,
    menu: PropTypes.element,
    sidebar: PropTypes.element,
    titleBar: PropTypes.element.isRequired
  }

  render () {
    const { children, className, header, menu, sidebar, titleBar } = this.props

    const classes = classnames('layout', 'document-layout', className)

    return (
      <div className={classes}>
        {cloneElement(header, { className: 'document-layout__header' })}
        {cloneElement(titleBar, { className: 'document-layout__titlebar' })}

        <div className='document-layout__body'>
          {menu
            ? cloneElement(menu, { className: 'document-layout__menu' })
            : null}

          <Paper className='document-layout__main' component='main' zDepth={1}>
            {children}
          </Paper>

          {sidebar
            ? cloneElement(sidebar, { className: 'document-layout__sidebar' })
            : null}
        </div>
      </div>
    )
  }
}
