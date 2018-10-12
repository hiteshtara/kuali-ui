/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import {
  filter as _filter,
  get,
  isArray,
  isEqual,
  isFunction,
  isObject,
  isString,
  map,
  mapKeys,
  pick
} from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { ListItem, Menu } from 'react-md'

import ColumnMenuColumnHeader from './cm-column-hdr'
import styles from './style.css'

export default class ColumnMenuColumn extends Component {
  static displayName = 'ColumnMenuColumn'

  static defaultProps = {
    filter: false,
    cache: true
  }

  static propTypes = {
    addColumn: PropTypes.func.isRequired,
    data: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.func
    ]).isRequired,
    filter: PropTypes.bool,
    headerIconStyle: PropTypes.object,
    headerTextfieldStyle: PropTypes.object,
    listItem: PropTypes.instanceOf(ListItem),
    match: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.func,
      PropTypes.object,
      PropTypes.string
    ]).isRequired,
    onSelect: PropTypes.func.isRequired,
    style: PropTypes.object
  }

  constructor (props) {
    super(props)

    this.state = {
      meta: undefined,
      items: undefined,
      filter: '',
      cacheKey: '',
      selected: undefined
    }

    this.getStyles = this.getStyles.bind(this)
    this.onSelect = this.onSelect.bind(this)
    this.filterChangeHandler = this.filterChangeHandler.bind(this)
  }

  componentWillMount () {
    this.getItems(this.props)
  }

  componentWillReceiveProps (nextProps) {
    if (this.shouldInitData(this.props, nextProps)) {
      this.getItems(nextProps)
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !isEqual(this.state, nextState) || !isEqual(this.props, nextProps)
  }

  componentDidUpdate () {
    this.getItems()
  }

  /**
   * NOTE: Expect this to be overridden
   */
  getStyles () {
    const { style } = this.props
    const menu = {
      overflowY: 'auto',
      width: 180,
      height: 352
    }
    return { menu: Object.assign(menu, style) }
  }

  /**
   * NOTE: Expect this to be overridden
   */
  shouldInitData (lastProps, nextProps) {
    if (nextProps.data === lastProps.data) {
      return false
    }
    return !isEqual(lastProps.data, nextProps.data)
  }

  /**
   * NOTE: Expect this to be overridden
   */
  async getItems () {
    const { cacheKey, filter: filterText, items: lastItems } = this.state
    const filter = filterText.length >= 3 ? filterText : ''
    if (lastItems && filter === cacheKey) {
      return
    }

    const { data, filter: isFiltered } = this.props
    let items
    let meta
    if (isArray(data)) {
      items = isFiltered ? this.getFilteredArrayItems(data, filter) : data
      meta = {}
    } else if (isFunction(data)) {
      const filterParam = isFiltered ? filter : undefined
      const resp = await this.getFunctionItems(data, filterParam)
      items = resp.items
      meta = resp.meta
    } else if (isObject(data)) {
      items = this.getFilteredObjectItems(data, isFiltered ? filter : null)
      const metas = ['_id', '_name', '_version', '_type', '_meta', '_icon']
      meta = mapKeys(pick(data, metas), (v, k) => k.substr(1))
    } else {
      throw new Error('Unexpected data type')
    }

    this.setState({ meta, items, cacheKey: filter })
  }

  getFilteredArrayItems (data, filter) {
    return _filter(data, item => {
      return item.toString().includes(filter)
    })
  }

  getFilteredObjectItems (data, filter) {
    return _filter(data, (value, key) => {
      const keyStr = key.toString()
      if (key[0] === '_') {
        return false
      }
      return filter ? keyStr.includes(filter) : true
    })
  }

  getFunctionItems (dataFn, filter) {
    return new Promise(resolve => {
      dataFn(filter, (meta, items) => {
        resolve({ meta, items })
      })
    })
  }

  /**
   * NOTE: Expect this to be overridden
   * Called when the item is selected.
   */
  getItem (index) {
    const { items } = this.state
    return items[index]
  }

  /**
   * NOTE: Expect this to be overridden
   */
  isLeaf () {}

  /**
   * NOTE: Expect this to be overridden
   * NOTE: Not yet implemented
   */
  isType (type) {
    return !type
  }

  /**
   * NOTE: Expect this to be overridden
   * NOTE: Not yet implemented
   */
  containsType (type) {
    return !!type
  }

  /**
   * NOTE: Expect this to be overridden
   */
  addColumn (key, value) {
    const column =
      value.config &&
      value.config.prototype &&
      value.config.prototype instanceof Component
        ? value.config
        : ColumnMenuColumn
    this.props.addColumn(column, key, value)
  }

  noop () {}

  // --- Change Handlers ------------------------------------------------------

  filterChangeHandler (filter) {
    this.setState({ filter })
  }

  /**
   * NOTE: Expect this to be overridden
   */
  onSelect (event, key) {
    const value = this.getItem(key)
    this.setState({ selected: value })

    const match = this.props.onSelect(value)
    const leaf =
      value._cmc && value._cmc.leaf !== undefined
        ? value._cmc.leaf
        : this.isLeaf()

    if (leaf === false || (leaf === undefined && !match)) {
      this.addColumn(key, value)
    }
  }

  /**
   * NOTE: Expect this to be overridden
   */
  renderColumnMenuItem (item, key, selected, MenuItem) {
    const label = isString(key)
      ? key
      : item.name || item._name || item.toString()

    const active = item === selected
    return (
      <MenuItem
        key={key}
        value={key}
        data-test={`cm-item-${label}`}
        primaryText={label}
        active={active}
        className={active ? 'column-menu-item--active' : 'column-menu-item'}
        leftIcon={get(item, '_cmci.leftIcon')}
        style={get(item, '_cmci.style')}
        onClick={e => this.onSelect(e, key)}
      />
    )
  }

  /**
   * Renders the Column.
   */
  render () {
    const { filterChangeHandler, noop, props, state } = this
    const { listItem, filter } = props
    const { meta = { name: '' }, items, filter: filterText, selected } = state

    const ColMenuItem = listItem || ListItem

    return (
      <div className={styles.col}>
        <ColumnMenuColumnHeader
          filter={filter}
          filterText={filterText}
          name={meta.name}
          onChange={filterChangeHandler}
        />
        <Menu
          isOpen
          fullWidth
          className='column-menu-menu'
          listClassName='column-menu-list'
          onClose={noop}
        >
          {map(items, (item, key) =>
            this.renderColumnMenuItem(item, key, selected, ColMenuItem)
          )}
        </Menu>
      </div>
    )
  }
}
