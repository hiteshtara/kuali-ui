/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import PropTypes from 'prop-types'
import { FIELD_TYPES } from '../constants'

export default PropTypes.shape({
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  type: PropTypes.oneOf([
    FIELD_TYPES.DATE,
    FIELD_TYPES.ENUM,
    FIELD_TYPES.NUMBER,
    FIELD_TYPES.TEXT,
    FIELD_TYPES.TIME
  ]).isRequired,
  values: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.bool
      ]).isRequired,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired
    })
  )
})
