/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const PaddedContent = ({ className, ...rest }) => {
  const classes = classnames('padded-content', className)

  return <div className={classes} {...rest} />
}

PaddedContent.propTypes = {
  className: PropTypes.string
}

export { PaddedContent }
