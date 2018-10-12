/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import PropTypes from 'prop-types'
import { FIELD_TYPES, OPERATOR_TYPES } from '../constants'

const objectValues = typeObj => Object.keys(typeObj).map(key => typeObj[key])
export default PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  field: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  operator: PropTypes.oneOf(objectValues(OPERATOR_TYPES)),
  value: PropTypes.any,
  type: PropTypes.oneOf(objectValues(FIELD_TYPES))
})
