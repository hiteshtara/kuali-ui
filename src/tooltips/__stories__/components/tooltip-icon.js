/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { injectTooltip } from 'react-md'
import Icon from '../../../icons'

const styles = {
  tooltipContainer: {
    position: 'relative',
    display: 'inline-block',
    margin: '1em'
  }
}

/**
 * Starting with React 16, Stateless functions can not have refs, so need to create
 * a component class to work as expected.
 */
class TooltipIcon extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    tooltip: PropTypes.node,
    iconClassName: PropTypes.string,
    name: PropTypes.string
  }

  render () {
    const { children, iconClassName, name, tooltip } = this.props
    return (
      <div style={styles.tooltipContainer}>
        {tooltip}
        <Icon name={name} iconClassName={iconClassName}>
          {children}
        </Icon>
      </div>
    )
  }
}

export default injectTooltip(TooltipIcon)
