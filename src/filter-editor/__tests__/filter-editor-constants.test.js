/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import { generate as generateRandomString } from 'randomstring'
import {
  getStartOfDay,
  getSecondsFromString,
  getFieldFromRow,
  AVAILABLE_OPERATORS,
  FIELD_TYPES,
  OPERATOR_FUNCTIONS,
  OPERATOR_KEYS,
  OPERATOR_TYPES
} from '../constants'

const getRandomInteger = max => Math.floor(Math.random() * max)
const getValueForType = type => {
  const { DATE, NUMBER, TIME } = FIELD_TYPES
  switch (type) {
    case DATE:
      const date = new Date()
      date.setFullYear(getRandomInteger(100) + 1950)
      date.setMonth(Math.max(1, getRandomInteger(12)))
      return date
    case NUMBER:
      return getRandomInteger(100000000)
    case TIME:
      const minutes = getRandomInteger(60)
      const is24hr = Math.random() > 0.5
      const hours = getRandomInteger(is24hr ? 24 : 12)
      return `${hours}:${minutes}`
    default:
      return generateRandomString(Math.max(3, getRandomInteger(12)))
  }
}

describe('filter-editor constants', () => {
  describe('getStartOfDay', () => {
    test('returns date set to midnight of today', () => {
      const sod = getStartOfDay()
      const today = new Date()
      expect(sod.getHours()).toEqual(0)
      expect(sod.getMinutes()).toEqual(0)
      expect(sod.getSeconds()).toEqual(0)
      expect(sod.getMilliseconds()).toEqual(0)
      expect(sod.getDate()).toEqual(today.getDate())
      expect(sod.getMonth()).toEqual(today.getMonth())
      expect(sod.getFullYear()).toEqual(today.getFullYear())
    })
  })

  describe('getFieldFromRow', () => {
    it('accepts a string field', () => {
      expect(getFieldFromRow('foo', { foo: 'bar' })).toBe('bar')
    })

    it('returns the value of a function called', () => {
      expect(getFieldFromRow(() => 'foo', { baz: 'bar' })).toBe('foo')
    })

    it('field function gets row passed as argument', () => {
      const row = { foo: 'bar', baz: 'bat' }
      const fieldFunction = r => expect(r).toMatchObject(row)
      getFieldFromRow(fieldFunction, row)
    })
  })

  describe('getSecondsFromString', () => {
    const hours = getRandomInteger(24)
    const minutes = getRandomInteger(60)
    let seconds = hours * Math.pow(60, 2) + minutes * 60
    let result = getSecondsFromString(`${hours}:${minutes}`)
    expect(result).toEqual(seconds)
  })
  describe('OPERATOR_FUNCTIONS', () => {
    // BLANK, NOT_BLANK, EQUAL_TO, NOT_EQUAL_TO are similar enough between types
    Object.keys(FIELD_TYPES).forEach(type => {
      const functionSet = OPERATOR_FUNCTIONS[type]
      const { BLANK, NOT_BLANK, EQUAL_TO, NOT_EQUAL_TO } = functionSet

      test(`${type} BLANK`, () => {
        const blank = {
          key: 'blank',
          foo: ''
        }
        const notDefined = {
          key: 'undefinedKey'
        }
        const hasValue = {
          key: 'hasValue',
          foo: getValueForType(type)
        }
        const rows = [hasValue, blank, notDefined]
        const filteredRows = rows.filter(BLANK('foo'))
        expect(filteredRows).toEqual([blank, notDefined])
      })

      test(`${type} NOT_BLANK`, () => {
        const blank = {
          key: 'blank',
          foo: ''
        }
        const notDefined = {
          key: 'undefinedKey'
        }
        const hasValue = {
          key: 'hasValue',
          foo: getValueForType(type)
        }
        const rows = [hasValue, blank, notDefined]
        const filteredRows = rows.filter(NOT_BLANK('foo'))
        expect(filteredRows).toEqual([hasValue])
      })

      test(`${type} EQUAL_TO`, () => {
        const foo = getValueForType(type)
        const rows = [
          {
            key: '1',
            foo
          },
          {
            key: '2',
            foo
          },
          {
            key: '3',
            foo: getValueForType(type)
          }
        ]
        expect(rows.filter(EQUAL_TO('foo', rows[0].foo))).toEqual(
          rows.slice(0, -1)
        )
      })

      test(`${type} NOT_EQUAL_TO`, () => {
        const foo = getValueForType(type)
        const rows = [
          {
            key: '1',
            foo: getValueForType(type)
          },
          {
            key: '2',
            foo
          },
          {
            key: '3',
            foo
          }
        ]
        expect(rows.filter(NOT_EQUAL_TO('foo', foo))).toEqual(rows.slice(0, 1))
      })
    })

    describe('DATE', () => {
      const { AFTER, BEFORE } = OPERATOR_FUNCTIONS.DATE
      const todayDate = new Date()
      const futureDate = new Date()
      const tomorrowDate = new Date()
      tomorrowDate.setDate(tomorrowDate.getDate() + 1)
      futureDate.setMonth(futureDate.getMonth() + 3)
      const today = {
        key: 'today',
        date: todayDate
      }
      const tomorrow = {
        key: 'tomorrow',
        date: tomorrowDate
      }
      const future = {
        key: 'future',
        date: futureDate
      }

      describe('Invalid dates', () => {
        const exemptOperators = [OPERATOR_TYPES.BLANK, OPERATOR_TYPES.NOT_BLANK]
        AVAILABLE_OPERATORS.DATE.forEach(key => {
          if (~exemptOperators.indexOf(key)) return
          const functionName = OPERATOR_KEYS[key]
          const createDateFilter = OPERATOR_FUNCTIONS.DATE[functionName]

          test(`${functionName} return empty function when rule value is missing`, () => {
            expect(createDateFilter('date', '')).toBeInstanceOf(Function)
            expect(createDateFilter('date', undefined)).toBeInstanceOf(Function)
            expect(createDateFilter('date', null)).toBeInstanceOf(Function)
          })

          test(`${functionName} throw error on invalid rule date`, () => {
            expect(() => createDateFilter('date', 'fail')).toThrowError(
              `Rule value for date, 'fail' is not a valid Date. Unable to return filter`
            )
          })

          test(`${functionName} throw error on invalid date in row`, () => {
            const rows = [
              {
                key: 'error',
                date: 'fail'
              }
            ]
            expect(() =>
              rows.filter(createDateFilter('date', today.date))
            ).toThrowError(
              `Row value for date, 'fail' is not a valid Date. Unable to run filter`
            )
          })
        })
      })

      describe('Parses string dates', () => {
        const exemptOperators = [OPERATOR_TYPES.BLANK, OPERATOR_TYPES.NOT_BLANK]
        AVAILABLE_OPERATORS.DATE.forEach(key => {
          if (~exemptOperators.indexOf(key)) return
          const functionName = OPERATOR_KEYS[key]
          const createDateFilter = OPERATOR_FUNCTIONS.DATE[functionName]
          const dateString = '11/5/1955'

          test('rows can have date string', () => {
            const rows = [
              {
                key: 'stringDate',
                date: dateString
              }
            ]
            let testFilter = jest.fn(createDateFilter('date', today.date))
            rows.filter(testFilter)
            expect(testFilter).toHaveBeenCalledTimes(1)
          })
          test('can create filter with date string', () => {
            expect(createDateFilter('date', dateString)).toBeInstanceOf(
              Function
            )
          })
        })
      })

      describe('AFTER', () => {
        test('today', () => {
          const rows = [today, future]
          const filteredRows = rows.filter(AFTER('date', today.date))

          expect(filteredRows).toEqual([future])
        })
        test('tomorrow', () => {
          const rows = [today, tomorrow, future]
          const filteredRows = rows.filter(AFTER('date', tomorrow.date))

          expect(filteredRows).toEqual([future])
        })
        test('no results', () => {
          const rows = [today, tomorrow, future]
          const farFuture = new Date()
          farFuture.setFullYear(farFuture.getFullYear() + 1)
          const filteredRows = rows.filter(AFTER('date', farFuture))
          expect(filteredRows).toHaveLength(0)
        })
      })

      describe('BEFORE', () => {
        test('future', () => {
          const rows = [today, tomorrow, future]
          const filteredRows = rows.filter(BEFORE('date', future.date))

          expect(filteredRows).toEqual([today, tomorrow])
        })
        test('tomorrow', () => {
          const rows = [today, tomorrow, future]
          const filteredRows = rows.filter(BEFORE('date', tomorrow.date))

          expect(filteredRows).toEqual([today])
        })
        test('no results', () => {
          const rows = [today, tomorrow, future]
          const filteredRows = rows.filter(BEFORE('date', today.date))
          expect(filteredRows).toHaveLength(0)
        })
      })
    })

    describe('TEXT', () => {
      const {
        CONTAINS,
        DOES_NOT_CONTAIN,
        ENDS_WITH,
        EQUAL_TO,
        NOT_EQUAL_TO,
        STARTS_WITH
      } = OPERATOR_FUNCTIONS.TEXT
      const rows = [
        {
          key: 'foo'
        },
        {
          key: 'foobar'
        },
        {
          key: 'bar'
        },
        {
          key: 'baz'
        }
      ]
      describe('EQUAL_TO', () => {
        test('is case sensitive', () => {
          expect(rows.filter(EQUAL_TO('key', 'foo'))).toHaveLength(1)
          expect(rows.filter(EQUAL_TO('key', 'FOO'))).toHaveLength(0)
        })
      })

      describe('NOT_EQUAL_TO', () => {
        test('is case sensitive', () => {
          expect(rows.filter(NOT_EQUAL_TO('key', 'foo'))).toHaveLength(3)
          expect(rows.filter(NOT_EQUAL_TO('key', 'FOO'))).toHaveLength(4)
        })
      })

      describe('CONTAINS', () => {
        test('returns results', () => {
          expect(rows.filter(CONTAINS('key', 'ba'))).toEqual(rows.slice(1))
          expect(rows.filter(CONTAINS('key', 'f'))).toEqual(rows.slice(0, 2))
        })
        test('no results', () => {
          expect(rows.filter(CONTAINS('key', 'zed'))).toHaveLength(0)
        })
        test('is not case sensitive', () => {
          expect(rows.filter(CONTAINS('key', 'Ba'))).toHaveLength(3)
          expect(rows.filter(CONTAINS('key', 'fOo'))).toHaveLength(2)
        })
      })
      describe('DOES_NOT_CONTAIN', () => {
        test('returns results', () => {
          expect(rows.filter(DOES_NOT_CONTAIN('key', 'ba'))).toEqual(
            rows.slice(0, 1)
          )
          expect(rows.filter(DOES_NOT_CONTAIN('key', 'f'))).toEqual(
            rows.slice(2)
          )
          expect(rows.filter(DOES_NOT_CONTAIN('key', 'zed'))).toEqual(rows)
        })
        test('no results', () => {
          let specialRows = rows.slice(1)
          expect(
            specialRows.filter(DOES_NOT_CONTAIN('key', 'ba'))
          ).toHaveLength(0)
        })
        test('is not case sensitive', () => {
          expect(rows.filter(DOES_NOT_CONTAIN('key', 'Ba'))).toHaveLength(1)
        })
      })
      describe('ENDS_WITH', () => {
        test('returns results', () => {
          expect(rows.filter(ENDS_WITH('key', 'oo'))).toEqual(rows.slice(0, 1))
          expect(rows.filter(ENDS_WITH('key', 'ar'))).toEqual(rows.slice(1, 3))
        })
        test('no results', () => {
          expect(rows.filter(ENDS_WITH('key', 'ob'))).toHaveLength(0)
        })
        test('is not case sensitive', () => {
          expect(rows.filter(ENDS_WITH('key', 'oO'))).toHaveLength(1)
        })
      })
      describe('STARTS_WITH', () => {
        test('returns results', () => {
          expect(rows.filter(STARTS_WITH('key', 'foob'))).toEqual(
            rows.slice(1, 2)
          )
          expect(rows.filter(STARTS_WITH('key', 'ba'))).toEqual(rows.slice(2))
        })
        test('no results', () => {
          expect(rows.filter(STARTS_WITH('key', 'z'))).toHaveLength(0)
        })
        test('is not case sensitive', () => {
          expect(rows.filter(STARTS_WITH('key', 'F'))).toHaveLength(2)
        })
      })
    })

    describe('NUMBER', () => {
      const {
        GREATER_THAN,
        GREATER_THAN_OR_EQUAL_TO,
        LESS_THAN,
        LESS_THAN_OR_EQUAL_TO
      } = OPERATOR_FUNCTIONS.NUMBER
      const rows = [
        {
          key: 'one',
          num: 1
        },
        {
          key: 'two',
          num: 2
        },
        {
          key: 'four',
          num: 4
        },
        {
          key: 'five',
          num: 5
        },
        {
          key: '5ive',
          num: 5
        },
        {
          key: 'twenty-one',
          num: 21
        }
      ]

      describe('GREATER_THAN', () => {
        test('returns results', () => {
          expect(rows.filter(GREATER_THAN('num', 5))).toHaveLength(1)
          expect(rows.filter(GREATER_THAN('num', 2))).toHaveLength(4)
        })
        test('returns no results', () => {
          expect(rows.filter(GREATER_THAN('num', 21))).toHaveLength(0)
        })
      })
      describe('GREATER_THAN_OR_EQUAL_TO', () => {
        test('returns results', () => {
          expect(rows.filter(GREATER_THAN_OR_EQUAL_TO('num', 5))).toHaveLength(
            3
          )
          expect(rows.filter(GREATER_THAN_OR_EQUAL_TO('num', 4))).toHaveLength(
            4
          )
        })
        test('returns no results', () => {
          expect(rows.filter(GREATER_THAN_OR_EQUAL_TO('num', 22))).toHaveLength(
            0
          )
        })
      })
      describe('LESS_THAN', () => {
        test('returns results', () => {
          expect(rows.filter(LESS_THAN('num', 5))).toHaveLength(3)
          expect(rows.filter(LESS_THAN('num', 2))).toHaveLength(1)
        })
        test('returns no results', () => {
          expect(rows.filter(LESS_THAN('num', 1))).toHaveLength(0)
        })
      })
      describe('LESS_THAN_OR_EQUAL_TO', () => {
        test('returns results', () => {
          expect(rows.filter(LESS_THAN_OR_EQUAL_TO('num', 5))).toHaveLength(5)
          expect(rows.filter(LESS_THAN_OR_EQUAL_TO('num', 2))).toHaveLength(2)
        })
        test('returns no results', () => {
          expect(rows.filter(LESS_THAN_OR_EQUAL_TO('num', 0))).toHaveLength(0)
        })
      })
    })
    describe('TIME', () => {
      const { AFTER, BEFORE } = OPERATOR_FUNCTIONS.TIME
      const rows = [
        {
          time: '00:01'
        },
        {
          time: '4:59'
        },
        {
          time: '15:03'
        },
        {
          time: '23:07'
        },
        {
          time: '12:15'
        }
      ]

      describe('AFTER', () => {
        test('gets results', () => {
          expect(rows.filter(AFTER('time', '12:15'))).toEqual([
            {
              time: '15:03'
            },
            {
              time: '23:07'
            }
          ])
          expect(rows.filter(AFTER('time', '00:00'))).toEqual(rows)
        })
        test('gets no results', () => {
          expect(rows.filter(AFTER('time', '23:30'))).toHaveLength(0)
        })
      })

      describe('BEFORE', () => {
        test('gets results', () => {
          expect(rows.filter(BEFORE('time', '12:15'))).toEqual([
            {
              time: '00:01'
            },
            {
              time: '4:59'
            }
          ])
          expect(rows.filter(BEFORE('time', '23:30'))).toEqual(rows)
        })
        test('gets no results', () => {
          expect(rows.filter(BEFORE('time', '00:01'))).toHaveLength(0)
        })
      })
    })
  })
})
