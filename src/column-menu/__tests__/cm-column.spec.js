/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

/* eslint-disable no-undef */
import React, { Component } from 'react'
import { mount, shallow } from 'enzyme'
import sinon from 'sinon'
import toJson from 'enzyme-to-json'
import { cloneDeep } from 'lodash'

import ColumnMenuColumn from '../cm-column'
import { ListItem } from 'react-md'

describe.skip('Column Menu Column', () => {
  let sandbox
  let props

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
    props = {
      addColumn: jest.fn(),
      data: ['one', 'two', 'three'],
      filter: true,
      match: ['one', 'two', 'three'],
      onSelect: jest.fn()
    }
  })

  afterEach(() => {
    sandbox.restore()
  })

  test('snapshot matches', () => {
    const wrapper = mount(<ColumnMenuColumn {...props} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  test('returns default styling', () => {
    props.style = {}
    const wrapper = mount(<ColumnMenuColumn {...props} />)
    const inst = wrapper.instance()

    expect(inst.getStyles()).toEqual({
      menu: {
        overflowY: 'auto',
        width: 180,
        height: 352
      }
    })
  })

  test('getItems not called if props are unchanged', () => {
    const getItemsSpy = sandbox.spy(ColumnMenuColumn.prototype, 'getItems')
    const wrapper = mount(<ColumnMenuColumn {...props} />)

    expect(getItemsSpy.callCount).toBe(1)
    wrapper.setProps(props)
    expect(getItemsSpy.callCount).toBe(1)
  })

  test('inits data only when necessary', () => {
    const newProps = cloneDeep(props)
    const wrapper = mount(<ColumnMenuColumn {...props} />)
    const inst = wrapper.instance()

    expect(inst.shouldInitData(props, props)).toBe(false)

    props.data = ['array']
    newProps.data = { match: true }
    expect(inst.shouldInitData(props, newProps)).toBe(true)

    props.data = ['one', 'two', 'three']
    newProps.data = ['one', 'two', 'three']
    expect(inst.shouldInitData(props, newProps)).toBe(false)
    newProps.data = ['one', 'two', '-NOT THREE!-']
    expect(inst.shouldInitData(props, newProps)).toBe(true)

    props.data = { match: true }
    newProps.data = { match: true }
    expect(inst.shouldInitData(props, newProps)).toBe(false)
    newProps.data = { match: false }
    expect(inst.shouldInitData(props, newProps)).toBe(true)

    props.data = () => 'match'
    newProps.data = () => 'match'
    expect(inst.shouldInitData(props, newProps)).toBe(true)
    newProps.data = () => '-NOT A MATCH!-'
    expect(inst.shouldInitData(props, newProps)).toBe(true)
  })

  test('get items: data type array', done => {
    props.filter = false
    const wrapper = mount(<ColumnMenuColumn {...props} />)
    const inst = wrapper.instance()
    inst.getItems().then(() => {
      expect(inst.state.items).toEqual(props.data)
      done()
    })
  })

  test('get filtered items: data type array', done => {
    const wrapper = mount(<ColumnMenuColumn {...props} />)
    const inst = wrapper.instance()

    inst.setState({ filter: 'thre' })
    inst.getItems().then(() => {
      expect(inst.state.items).toEqual(['three'])
      done()
    })
  })

  test('get items: data type object', done => {
    props.filter = false
    props.data = { one: 1, two: 2, three: 3 }
    const wrapper = mount(<ColumnMenuColumn {...props} />)
    const inst = wrapper.instance()
    inst.getItems().then(() => {
      expect(inst.state.items).toEqual([1, 2, 3])
      done()
    })
  })

  test('get items: data type object with meta data', done => {
    props.filter = false
    props.data = {
      _id: 'ayU8pkSs',
      _name: 'name',
      _type: 'type',
      one: 1,
      two: 2,
      three: 3
    }
    const wrapper = mount(<ColumnMenuColumn {...props} />)
    const inst = wrapper.instance()
    inst.getItems().then(() => {
      expect(inst.state.items).toEqual([1, 2, 3])
      expect(inst.state.meta).toEqual({
        id: 'ayU8pkSs',
        name: 'name',
        type: 'type'
      })
      done()
    })
  })

  test('get filtered items: data type object', done => {
    props.data = { one: 1, two: 2, three: 3 }
    props.filter = true
    const wrapper = mount(<ColumnMenuColumn {...props} />)
    const inst = wrapper.instance()

    inst.setState({ filter: 'thre' })
    inst.getItems().then(() => {
      expect(inst.state.items).toEqual([3])
      done()
    })
  })

  test('get items: data type function', done => {
    props.filter = false
    props.data = (filter, cb) => {
      cb(null, [1, 2, 3])
    }
    const wrapper = mount(<ColumnMenuColumn {...props} />)
    const inst = wrapper.instance()
    inst.getItems().then(() => {
      expect(inst.state.items).toEqual([1, 2, 3])
      done()
    })
  })

  test('get items: data type function with meta data', done => {
    props.filter = false
    props.data = (filter, cb) => {
      cb({ id: 'ayU8pkSs', name: 'name', type: 'type' }, [1, 2, 3])
    }
    const wrapper = mount(<ColumnMenuColumn {...props} />)
    const inst = wrapper.instance()
    inst.getItems().then(() => {
      expect(inst.state.items).toEqual([1, 2, 3])
      expect(inst.state.meta).toEqual({
        id: 'ayU8pkSs',
        name: 'name',
        type: 'type'
      })
      done()
    })
  })

  test('get filtered items: data type function', done => {
    props.data = (filter, cb) => {
      cb({ id: 'ayU8pkSs', name: 'name', type: 'type' }, [3])
    }
    props.filter = true
    const wrapper = mount(<ColumnMenuColumn {...props} />)
    const inst = wrapper.instance()

    inst.setState({ filter: 'thre' })
    inst.getItems().then(() => {
      expect(inst.state.items).toEqual([3])
      done()
    })
  })

  test('get items: data type string', done => {
    props.data = 'string'
    const wrapper = mount(<ColumnMenuColumn {...props} />)
    const inst = wrapper.instance()

    inst.getItems().catch(err => {
      expect(err.message).toMatch('Unexpected data type')
      done()
    })
  })

  test('can get an item by index', () => {
    const wrapper = mount(<ColumnMenuColumn {...props} />)
    expect(wrapper.instance().getItem(1)).toEqual('two')
  })

  test('provides an isLeaf function that always returns undefined', () => {
    const wrapper = mount(<ColumnMenuColumn {...props} />)
    expect(wrapper.instance().isLeaf()).toBe(undefined)
  })

  test('can call isType but will always be false', () => {
    const wrapper = mount(<ColumnMenuColumn {...props} />)
    expect(wrapper.instance().isType('cabbage')).toBe(false)
  })

  test('can call containsType but will always be true', () => {
    const wrapper = mount(<ColumnMenuColumn {...props} />)
    expect(wrapper.instance().containsType('cabbage')).toBe(true)
  })

  test('can add a default Column', () => {
    const wrapper = mount(<ColumnMenuColumn {...props} />)
    wrapper.instance().addColumn('key', 'value')
    expect(props.addColumn.mock.calls.length).toBe(1)
    expect(props.addColumn.mock.calls[0][0].displayName).toEqual(
      'ColumnMenuColumn'
    )
    expect(props.addColumn.mock.calls[0][1]).toEqual('key')
    expect(props.addColumn.mock.calls[0][2]).toEqual('value')
  })

  test('can add a custom Column', () => {
    const wrapper = mount(<ColumnMenuColumn {...props} />)

    class Custom extends Component {
      static displayName = 'Custom';
      render () {
        return <div>Custom</div>
      }
    }

    wrapper.instance().addColumn('key', { config: Custom })
    expect(props.addColumn.mock.calls.length).toBe(1)
    expect(props.addColumn.mock.calls[0][0].displayName).toEqual('Custom')
    expect(props.addColumn.mock.calls[0][1]).toEqual('key')
    expect(props.addColumn.mock.calls[0][2]).toEqual({ config: Custom })
  })

  test('can update the filter', () => {
    const wrapper = mount(<ColumnMenuColumn {...props} />)
    const inst = wrapper.instance()
    inst.filterChangeHandler('cabbage')
    expect(inst.state.filter).toEqual('cabbage')
  })

  test('can select an item in the column', () => {
    const wrapper = mount(<ColumnMenuColumn {...props} />)
    const inst = wrapper.instance()
    inst.onSelect(null, 1)
    expect(inst.state.selected).toEqual('two')
  })

  test('can select an item in the column that is a leaf node', () => {
    props.data = [{ _cmc: { leaf: true }, _name: 'Phillip' }]
    const wrapper = mount(<ColumnMenuColumn {...props} />)
    const inst = wrapper.instance()
    inst.onSelect(null, 0)
    expect(inst.state.selected).toEqual(props.data[0])
  })

  test('can click an item', () => {
    const wrapper = mount(<ColumnMenuColumn {...props} />)
    const $items = wrapper.find('.column-menu-item div[role="button"]')
    expect($items.length).toBe(3)
    $items.at(1).simulate('click')
    expect(wrapper.instance().state.selected).toEqual('two')
  })

  test('noop does nothing', () => {
    const wrapper = shallow(<ColumnMenuColumn {...props} />)
    wrapper.instance().noop()
  })

  test('can provide a custom ListItem', () => {
    props.listItem = class Custom extends ListItem {
      render () {
        return <div className='custom-list-item' />
      }
    }
    const wrapper = mount(<ColumnMenuColumn {...props} />)
    expect(wrapper.find('.custom-list-item').length).toBe(3)
  })

  test('can render menu items', () => {
    const wrapper = mount(<ColumnMenuColumn {...props} />)
    const inst = wrapper.instance()
    const component = inst.renderColumnMenuItem('v', 'k', true, ListItem)
    expect(component.props.primaryText).toEqual('k')
  })
})
