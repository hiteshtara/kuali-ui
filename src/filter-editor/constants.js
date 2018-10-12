/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

export const getStartOfDay = () => {
  const sod = new Date()
  sod.setHours(0)
  sod.setMinutes(0)
  sod.setSeconds(0)
  sod.setMilliseconds(0)
  return sod
}

export const getSecondsFromString = str => {
  const split = str.split(':')
  return split[0] * Math.pow(60, 2) + split[1] * 60
}

export const OPERATION_TYPES = {
  AND: 'And',
  OR: 'Or'
}

export const FIELD_TYPES = {
  DATE: 'DATE',
  ENUM: 'ENUM',
  TEXT: 'TEXT',
  NUMBER: 'NUMBER',
  TIME: 'TIME'
}

export const OPERATOR_TYPES = {
  EQUAL_TO: 'is equal to',
  NOT_EQUAL_TO: 'is not equal to',
  GREATER_THAN: 'is greater than',
  GREATER_THAN_OR_EQUAL_TO: 'is greater than or equal to',
  LESS_THAN: 'is less than',
  LESS_THAN_OR_EQUAL_TO: 'is less than or equal to',
  BEFORE: 'is before',
  AFTER: 'is after',
  CONTAINS: 'contains',
  DOES_NOT_CONTAIN: 'does not contain',
  STARTS_WITH: 'starts with',
  ENDS_WITH: 'ends with',
  BLANK: 'is blank',
  NOT_BLANK: 'is not blank'
}

export const OPERATOR_KEYS = Object.keys(OPERATOR_TYPES).reduce((acc, key) => {
  acc[OPERATOR_TYPES[key]] = key
  return acc
}, {})

// exported for testing
export const getFieldFromRow = (field, row) =>
  typeof field === 'function' ? field(row) : row[field]
const EQUAL_TO = (field, value) => row => getFieldFromRow(field, row) === value
const NOT_EQUAL_TO = (field, value) => row =>
  getFieldFromRow(field, row) !== value
const LESS_THAN = (field, value) => row => getFieldFromRow(field, row) < value
const LESS_THAN_OR_EQUAL_TO = (field, value) => row =>
  getFieldFromRow(field, row) <= value
const GREATER_THAN = (field, value) => row =>
  getFieldFromRow(field, row) > value
const GREATER_THAN_OR_EQUAL_TO = (field, value) => row =>
  getFieldFromRow(field, row) >= value
const BLANK = field => row => !getFieldFromRow(field, row)
const NOT_BLANK = field => row => !!getFieldFromRow(field, row)

export const OPERATOR_FUNCTIONS = {
  DATE: {
    AFTER: (field, value) => {
      if (!value) return () => {}
      const vDate = new Date(value)
      if (isNaN(vDate.getTime())) {
        throw Error(
          `Rule value for ${field}, '${value}' is not a valid Date. Unable to return filter`
        )
      }
      return row => {
        const rowValue = getFieldFromRow(field, row)
        const rowDate = new Date(rowValue)
        if (isNaN(rowDate.getTime())) {
          throw Error(
            `Row value for ${field}, '${rowValue}' is not a valid Date. Unable to run filter`
          )
        }
        return rowDate > vDate
      }
    },
    BEFORE: (field, value) => {
      if (!value) return () => {}
      const vDate = new Date(value)
      if (isNaN(vDate.getTime())) {
        throw Error(
          `Rule value for ${field}, '${value}' is not a valid Date. Unable to return filter`
        )
      }
      return row => {
        const rowValue = getFieldFromRow(field, row)
        const rowDate = new Date(rowValue)
        if (isNaN(rowDate.getTime())) {
          throw Error(
            `Row value for ${field}, '${rowValue}' is not a valid Date. Unable to run filter`
          )
        }
        return rowDate < vDate
      }
    },
    BLANK,
    EQUAL_TO: (field, value) => {
      if (!value) return () => {}
      const time = new Date(value).getTime()
      if (isNaN(time)) {
        throw Error(
          `Rule value for ${field}, '${value}' is not a valid Date. Unable to return filter`
        )
      }
      return row => {
        const rowValue = getFieldFromRow(field, row)
        const rowDate = new Date(rowValue)
        if (isNaN(rowDate.getTime())) {
          throw Error(
            `Row value for ${field}, '${rowValue}' is not a valid Date. Unable to run filter`
          )
        }
        return rowDate.getTime() === time
      }
    },
    NOT_BLANK,
    NOT_EQUAL_TO: (field, value) => {
      if (!value) return () => {}
      const time = new Date(value).getTime()
      if (isNaN(time)) {
        throw Error(
          `Rule value for ${field}, '${value}' is not a valid Date. Unable to return filter`
        )
      }
      return row => {
        const rowValue = getFieldFromRow(field, row)
        const rowDate = new Date(rowValue)
        if (isNaN(rowDate.getTime())) {
          throw Error(
            `Row value for ${field}, '${rowValue}' is not a valid Date. Unable to run filter`
          )
        }
        return rowDate.getTime() !== time
      }
    }
  },
  TIME: {
    AFTER: (field, value) => row =>
      getSecondsFromString(getFieldFromRow(field, row)) >
      getSecondsFromString(value),
    BEFORE: (field, value) => row =>
      getSecondsFromString(getFieldFromRow(field, row)) <
      getSecondsFromString(value),
    BLANK,
    EQUAL_TO,
    NOT_BLANK,
    NOT_EQUAL_TO
  },
  ENUM: {
    BLANK,
    EQUAL_TO,
    NOT_BLANK,
    NOT_EQUAL_TO
  },
  TEXT: {
    BLANK,
    CONTAINS: (field, value) => row =>
      ~getFieldFromRow(field, row)
        .toUpperCase()
        .search(value.toUpperCase()),
    DOES_NOT_CONTAIN: (field, value) => row =>
      !~getFieldFromRow(field, row)
        .toUpperCase()
        .search(value.toUpperCase()),
    ENDS_WITH: (field, value) => row =>
      getFieldFromRow(field, row)
        .toUpperCase()
        .substr(value.length * -1) === value.toUpperCase(),
    EQUAL_TO,
    NOT_BLANK,
    NOT_EQUAL_TO,
    STARTS_WITH: (field, value) => row =>
      getFieldFromRow(field, row)
        .toUpperCase()
        .search(value.toUpperCase()) === 0
  },
  NUMBER: {
    EQUAL_TO,
    NOT_EQUAL_TO,
    GREATER_THAN,
    GREATER_THAN_OR_EQUAL_TO,
    LESS_THAN,
    LESS_THAN_OR_EQUAL_TO,
    BLANK,
    NOT_BLANK
  }
}

export const AVAILABLE_OPERATORS = {
  DATE: [
    OPERATOR_TYPES.AFTER,
    OPERATOR_TYPES.BEFORE,
    OPERATOR_TYPES.BLANK,
    OPERATOR_TYPES.EQUAL_TO,
    OPERATOR_TYPES.NOT_BLANK,
    OPERATOR_TYPES.NOT_EQUAL_TO
  ],
  TIME: [
    OPERATOR_TYPES.AFTER,
    OPERATOR_TYPES.BEFORE,
    OPERATOR_TYPES.BLANK,
    OPERATOR_TYPES.EQUAL_TO,
    OPERATOR_TYPES.NOT_BLANK,
    OPERATOR_TYPES.NOT_EQUAL_TO
  ],
  ENUM: [
    OPERATOR_TYPES.BLANK,
    OPERATOR_TYPES.EQUAL_TO,
    OPERATOR_TYPES.NOT_BLANK,
    OPERATOR_TYPES.NOT_EQUAL_TO
  ],
  TEXT: [
    OPERATOR_TYPES.BLANK,
    OPERATOR_TYPES.CONTAINS,
    OPERATOR_TYPES.DOES_NOT_CONTAIN,
    OPERATOR_TYPES.ENDS_WITH,
    OPERATOR_TYPES.EQUAL_TO,
    OPERATOR_TYPES.NOT_BLANK,
    OPERATOR_TYPES.NOT_EQUAL_TO,
    OPERATOR_TYPES.STARTS_WITH
  ],
  NUMBER: [
    OPERATOR_TYPES.BLANK,
    OPERATOR_TYPES.EQUAL_TO,
    OPERATOR_TYPES.GREATER_THAN,
    OPERATOR_TYPES.GREATER_THAN_OR_EQUAL_TO,
    OPERATOR_TYPES.LESS_THAN,
    OPERATOR_TYPES.LESS_THAN_OR_EQUAL_TO,
    OPERATOR_TYPES.NOT_BLANK,
    OPERATOR_TYPES.NOT_EQUAL_TO
  ]
}
