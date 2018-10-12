/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import { parse, parseObject } from '../utils'

describe('Sass Flat Extract Utils', () => {
  describe('parse', () => {
    it('should exist', () => {
      expect(parse).toBeDefined()
    })

    it('should parse a string', () => {
      const result = parse({
        type: 'SassString',
        value: 'a string value'
      })

      expect(result).toEqual('a string value')
    })

    it('should parse a boolean', () => {
      const result = parse({
        type: 'SassBoolean',
        value: true
      })

      expect(result).toEqual(true)
    })

    it('should parse a color', () => {
      const result = parse({
        type: 'SassColor',
        value: {
          r: 255,
          g: 0,
          b: 0,
          a: 1,
          hex: '#FF0000'
        }
      })

      expect(result).toEqual(`rgba(255, 0, 0, 1)`)
    })

    it('should recursively parse a list', () => {
      const result = parse({
        type: 'SassList',
        value: [
          {
            type: 'SassBoolean',
            value: true
          },
          {
            type: 'SassBoolean',
            value: false
          }
        ]
      })

      expect(Array.isArray(result)).toBeTruthy()
      expect(result).toHaveLength(2)
      expect(result).toEqual([true, false])
    })

    it('should recursively parse a map', () => {
      const result = parse({
        type: 'SassMap',
        value: {
          $boolVar: {
            type: 'SassBoolean',
            value: true
          },
          $stringVar: {
            type: 'SassString',
            value: 'string var'
          }
        }
      })

      const expected = {
        $boolVar: true,
        $stringVar: 'string var'
      }

      expect(result).toMatchObject(expected)
    })
  })

  describe('parseObject', () => {
    it('should exist', () => {
      expect(parseObject).toBeDefined()
    })

    it('should return an object', () => {
      const result = parseObject()
      expect(typeof result === 'object').toBeTruthy()
    })

    it('should parseObject global vars', () => {
      const result = parseObject({
        global: {
          $boolVar: {
            type: 'SassBoolean',
            value: true
          },
          $colorVar: {
            type: 'SassColor',
            value: {
              r: 255,
              g: 0,
              b: 0,
              a: 1,
              hex: '#FF0000'
            }
          },
          $stringVar: {
            type: 'SassString',
            value: 'a string value'
          }
        }
      })
      const expected = {
        global: {
          $boolVar: true,
          $colorVar: 'rgba(255, 0, 0, 1)',
          $stringVar: 'a string value'
        }
      }

      expect(result).toMatchObject(expected)
    })
  })
})
