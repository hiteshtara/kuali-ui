/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import {
  TabsContainer as MDTabsContainer,
  Tabs as MDTabs,
  Tab as MDTab
} from 'react-md'

export class TabsContainer extends PureComponent {
  static defaultProps = {
    ...MDTabsContainer.defaultProps
  }

  static propTypes = {
    ...MDTabsContainer.propTypes,
    className: PropTypes.string,
    variant: PropTypes.oneOf(['compressed'])
  }

  render () {
    const { className, variant, ...rest } = this.props
    const classes = classnames(
      'kuali-tabs-container',
      {
        [`kuali-tabs-container--${variant}`]: !!variant
      },
      className
    )

    return <MDTabsContainer className={classes} {...rest} />
  }
}

export class Tabs extends PureComponent {
  static defaultProps = {
    ...MDTabs.defaultProps
  }

  static propTypes = {
    ...MDTabs.propTypes,
    className: PropTypes.string
  }

  render () {
    const { className, ...rest } = this.props
    const classes = classnames('kuali-tabs', className)

    return <MDTabs className={classes} {...rest} />
  }
}

export class Tab extends PureComponent {
  static defaultProps = {
    ...MDTab.defaultProps
  }

  static propTypes = {
    ...MDTab.propTypes,
    className: PropTypes.string
  }

  render () {
    const { className, ...rest } = this.props
    const classes = classnames('kuali-tab', className)

    return <MDTab className={classes} {...rest} />
  }
}
