/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

/* eslint-disable no-undef */
import React from 'react'
import { mount } from 'enzyme'
import sinon from 'sinon'
import toJson from 'enzyme-to-json'

import ColumnMenu, { EASE_OUT_QUAD } from '..'
import ColumnMenuColumn from '../cm-column'

describe.skip('Column Menu data:array', () => {
  let sandbox
  let props

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
    props = {
      data: ['one', 'two', 'three'],
      help: 'help text',
      match: jest.fn(),
      onSelect: jest.fn()
    }
  })

  afterEach(() => {
    sandbox.restore()
  })

  test('snapshot matches', () => {
    const wrapper = mount(<ColumnMenu {...props} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  test('works without help column', () => {
    props.help = undefined
    const wrapper = mount(<ColumnMenu {...props} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  test('fails without column or data', () => {
    props.data = false
    expect(() => {
      mount(<ColumnMenu {...props} />)
    }).toThrowErrorMatchingSnapshot()
  })

  test('can filter', () => {
    props.column = class filteredCMC extends ColumnMenuColumn {
      static defaultProps = {
        filter: true,
        cache: true
      };
    }
    const wrapper = mount(<ColumnMenu {...props} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  test('data property can change', () => {
    const initMatcher = sandbox.spy(ColumnMenu.prototype, 'initMatcher')
    const initColumns = sandbox.spy(ColumnMenu.prototype, 'initColumns')

    const wrapper = mount(<ColumnMenu {...props} />)

    expect(initMatcher.callCount).toBe(1)
    expect(initColumns.callCount).toBe(1)

    props.data = ['four']
    wrapper.setProps(props)

    expect(initMatcher.callCount).toBe(2)
    expect(initColumns.callCount).toBe(2)

    wrapper.setProps(props) // unchanged

    expect(initMatcher.callCount).toBe(3)
    expect(initColumns.callCount).toBe(2)
  })

  test('can add columns', () => {
    const wrapper = mount(<ColumnMenu {...props} />)
    const inst = wrapper.instance()

    expect(inst.state.columns.length).toBe(2)
    inst.addColumn(1, ColumnMenuColumn, null, ['four'])
    expect(inst.state.columns.length).toBe(3)
    inst.addColumn(2, ColumnMenuColumn, null, ['five'])
    expect(inst.state.columns.length).toBe(4)
    inst.addColumn(1, ColumnMenuColumn, null, ['six'])
    expect(inst.state.columns.length).toBe(3)
  })

  test('can match array types', () => {
    props.match = ['match-x', 'match-y']
    const wrapper = mount(<ColumnMenu {...props} />)
    const inst = wrapper.instance()

    expect(inst.colSelect('random')).toBe(false)
    expect(inst.colSelect('match-y')).toBe(true)
    expect(inst.colSelect({ type: 'match-y' })).toBe(true)
    expect(inst.colSelect({ toString: () => 'match-y' })).toBe(true)
  })

  test('can match object types', () => {
    class Match {}
    class MatchKid extends Match {}
    class NoMatch {}

    props.match = new Match()
    const wrapper = mount(<ColumnMenu {...props} />)
    const inst = wrapper.instance()

    expect(inst.colSelect(new NoMatch())).toBe(false)
    expect(inst.colSelect(new Match())).toBe(true)
    expect(inst.colSelect(new MatchKid())).toBe(true)
  })

  test('can match string types', () => {
    props.match = 'match'
    const wrapper = mount(<ColumnMenu {...props} />)
    const inst = wrapper.instance()

    expect(inst.colSelect('no match')).toBe(false)
    expect(inst.colSelect('match')).toBe(true)
    expect(inst.colSelect({ type: 'match' })).toBe(true)
    expect(inst.colSelect({ toString: () => 'match' })).toBe(true)
  })

  test('errors on unknown match types', () => {
    props.match = 4
    expect(() => {
      mount(<ColumnMenu {...props} />)
    }).toThrowErrorMatchingSnapshot()
  })

  test('can skip scroll animation if unnecessary', () => {
    const wrapper = mount(<ColumnMenu {...props} />)
    const inst = wrapper.instance()
    inst.scroll({ scrollLeft: 180, scrollTop: 0 })
  })

  test('scroll animation uses window.requestAnimationFrame', done => {
    window.requestAnimationFrame = fn => {
      setTimeout(() => fn(Date.now()), 16)
    }
    const target = { x: 0 }
    const wrapper = mount(<ColumnMenu {...props} />)
    wrapper.instance().scrollAnimation(target, 'x', 0, 30, 30, EASE_OUT_QUAD)
    setTimeout(done, 35)
  })

  test('scroll animation calculates transition correctly', done => {
    const target = { x: 0 }
    const wrapper = mount(<ColumnMenu {...props} />)
    const inst = wrapper.instance()

    const values = []
    function cb () {
      const avg = values.reduce((tot, val) => tot + val, 0) / values.length
      expect(values.length).toBeGreaterThan(20)
      expect(Math.abs(avg - 19) <= 2).toBe(true)
      done()
    }

    inst.scrollAnimation(target, 'x', 0, 30, 30, EASE_OUT_QUAD, cb, fn => {
      values.push(target.x)
      setTimeout(() => fn(Date.now()), 1)
    })
  })
})
