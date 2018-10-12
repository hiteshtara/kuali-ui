/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import React from 'react'
import PropTypes from 'prop-types'

const style = {
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  width: '100vw',
  justifyContent: 'center',
  flexDirection: 'column'
}

const Center = (props = {}) => {
  const allStyle = {
    ...style,
    ...props.style
  }

  return <div style={allStyle}>{props.children}</div>
}

Center.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object
}

export default Center
