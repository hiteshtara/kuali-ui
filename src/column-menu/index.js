/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

/* eslint-disable no-return-assign */

import { isArray, isEqual, isFunction, isObject, isString } from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import CMColumn from './cm-column'
import CMColumnHelp from './cm-column-help'

import styles from './style.css'

const COL_WIDTH = 180
export const EASE_OUT_QUAD = t => t * (2 - t)

export default class ColumnMenu extends Component {
  static propTypes = {
    column: PropTypes.func,
    data: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.func
    ]),
    help: PropTypes.string,
    match: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.func,
      PropTypes.object,
      PropTypes.string
    ]).isRequired,
    onSelect: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props)

    this.state = {
      columns: []
    }

    this.match = undefined
    this.$frame = undefined

    this.addColumn = this.addColumn.bind(this)
    this.colSelect = this.colSelect.bind(this)
  }

  componentWillMount () {
    this.initMatcher(this.props.match)
    this.initColumns(this.props)
  }

  /**
   * TODO: Possible bug. The isEqual call in this method will detect if the data
   * object is replaced, but not if it is updated
   * @param {*} nextProps
   */
  componentWillReceiveProps (nextProps) {
    this.initMatcher(nextProps.match)
    if (!isEqual(this.props, nextProps)) {
      this.initColumns(nextProps)
    }
  }

  /**
   * TODO: Possible bug. The isEqual call in this method will detect if the data
   * object is replaced, but not if it is updated
   * @param {*} nextProps
   * @param {*} nextState
   */
  shouldComponentUpdate (nextProps, nextState) {
    return !(isEqual(this.props, nextProps) && isEqual(this.state, nextState))
  }

  componentDidUpdate () {
    this.scroll()
  }

  scroll (target = this.$frame) {
    const { columns } = this.state
    const to = Math.max(0, columns.length * COL_WIDTH - COL_WIDTH)
    const from = target.scrollLeft
    target.scrollTop = 0

    if (Math.abs(from - to) > 3) {
      setTimeout(
        this.scrollAnimation.bind(
          this,
          target,
          'scrollLeft',
          from,
          to,
          800,
          EASE_OUT_QUAD
        ),
        300
      )
    }
  }

  scrollAnimation (
    target,
    attr,
    from,
    to,
    time,
    fn,
    callback,
    onFrame = window.requestAnimationFrame
  ) {
    const dist = to - from
    let start = null

    function step (ts) {
      if (!start) {
        start = ts
      }
      const progress = (ts - start) / time
      const dest = from + fn(progress) * dist
      target[attr] = dest
      if (progress < 1) {
        onFrame(step)
      } else {
        if (callback) {
          callback()
        }
      }
    }
    onFrame(step)
  }

  initColumns (props) {
    const { column, data, help, match } = props
    if (!column && !data) {
      throw new Error('ColumnMenu ERROR: no column or data')
    }

    const columns = []
    if (help) {
      const scroll = this.scroll.bind(this)
      columns.push(<CMColumnHelp key='help' help={help} scroll={scroll} />)
    }
    const Col = column || CMColumn
    columns.push(
      <Col
        key={`c${columns.length}`}
        data={data}
        match={match}
        onSelect={this.colSelect}
        addColumn={this.addColumn.bind(this, columns.length)}
      />
    )

    this.setState({ columns })
  }

  // This should be moved to the column?
  initMatcher (match) {
    if (isFunction(match)) {
      this.match = match
    } else if (isArray(match)) {
      this.match = this.matchArrayTypes.bind(this, match)
    } else if (isObject(match)) {
      this.match = this.matchObjectTypes.bind(this, match)
    } else if (isString(match)) {
      this.match = this.matchStringTypes.bind(this, match)
    } else {
      throw new Error('Unexpected match type')
    }
  }

  // This should be moved to the column?
  matchArrayTypes (obj, value) {
    if (isObject(value)) {
      value = value.type || value.toString()
    }
    return obj.includes(value)
  }

  // This should be moved to the column?
  matchObjectTypes (obj, value) {
    try {
      return value instanceof obj
    } catch (err) {
      return value instanceof obj.constructor
    }
  }

  // This should be moved to the column?
  matchStringTypes (str, value) {
    if (isObject(value)) {
      value = value.type || value.toString()
    }
    return str === value
  }

  colSelect (value) {
    if (this.match(value)) {
      this.props.onSelect(value)
      return true
    }
    return false
  }

  /* eslint-disable indent */
  addColumn (index, Col, key, value) {
    const trunc = this.state.columns.slice(0, index + 1)
    const columns = [
      ...trunc,
      (
        <Col
          key={`c${trunc.length}`}
          data={value}
          match={this.props.match}
          onSelect={this.colSelect}
          addColumn={this.addColumn.bind(this, trunc.length)}
        />
      )
    ]
    this.setState({ columns })
  }
  /* eslint-enable indent */

  render () {
    const { columns } = this.state
    const width = COL_WIDTH * columns.length

    return (
      <div className={styles.frame} ref={$el => this.$frame = $el}>
        <div
          className={styles.container}
          style={{ width: `${width}px` }}
          children={columns}
        />
      </div>
    )
  }
}
