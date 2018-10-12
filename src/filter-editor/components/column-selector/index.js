/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import clone from 'lodash/clone'
import without from 'lodash/without'

import React, { Component, PureComponent } from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import classnames from 'classnames'

// eslint-disable-next-line import/named
import { Icon, ListItem, Menu, RaisedButton } from '../../..'

import Heading from '../heading'

@autobind
export class ColumnSelectorListItem extends PureComponent {
  static defaultProps = {
    className: '',
    active: false
  }

  static propTypes = {
    className: PropTypes.string,
    column: PropTypes.shape({
      label: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }),
    onToggle: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired
  }

  handleClick (evt) {
    const { column, active } = this.props
    this.props.onToggle(column.name, !active, evt)
  }

  render () {
    const { column, className, active, ...rest } = this.props
    const classes = classnames('', className)

    const variant = active ? 'info' : 'default'
    const rightIcon = <Icon name='remove_red_eye' variant={variant} />

    delete rest.onToggle

    return (
      <ListItem
        className={classes}
        onClick={this.handleClick}
        primaryText={column.label}
        rightIcon={rightIcon}
        {...rest}
      />
    )
  }
}

@autobind
export default class ColumnSelector extends Component {
  static defaultProps = {
    className: ''
  }

  static propTypes = {
    className: PropTypes.string.isRequired,
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        isDefault: PropTypes.bool.isRequired,
        name: PropTypes.string.isRequired
      })
    ).isRequired,
    filter: PropTypes.shape({
      columns: PropTypes.arrayOf(PropTypes.string)
    }),
    onChange: PropTypes.func.isRequired
  }

  state = {
    visible: false
  }

  handleReset (evt) {
    const { filter, onChange } = this.props

    onChange({ ...filter, columns: [] })
  }

  handleColumnToggle (columnName, toInclude, evt) {
    const { defaultColumns } = this
    const { filter, onChange } = this.props

    let columns = this.hasSelectedColumns()
      ? clone(filter.columns)
      : defaultColumns

    if (toInclude) {
      columns.push(columnName)
    } else {
      columns = without(columns, columnName)
    }

    onChange({ ...filter, columns })
  }

  handleClose (evt) {
    this.setState({ visible: false })
  }

  handleOpen (evt) {
    this.setState({ visible: true })
  }

  handleToggle (evt) {
    this.setState({ visible: !this.state.visible })
  }

  hasSelectedColumns () {
    const { columns } = this.props.filter
    return !!columns && columns.length > 0
  }

  isActiveColumn (col) {
    const { defaultColumns } = this
    const { filter } = this.props
    const haystack = this.hasSelectedColumns() ? filter.columns : defaultColumns

    return haystack.includes(col.name)
  }

  get defaultColumns () {
    const { columns: availableColumns } = this.props

    return availableColumns
      .filter(({ isDefault }) => isDefault)
      .map(({ name }) => name)
  }

  render () {
    const { visible } = this.state
    const {
      className,
      columns,
      filter: { columns: selectedColumns }
    } = this.props

    const classes = classnames('filter-editor__column-selector', className)

    const hasSelectedColumns = this.hasSelectedColumns()

    const toggleButton = (
      <RaisedButton label='Choose Columns' onClick={this.handleToggle}>
        <Icon name='remove_red_eye' variant='info' />
      </RaisedButton>
    )

    const metaText = hasSelectedColumns
      ? `${selectedColumns.length}/${columns.length} columns selected`
      : 'standard columns selected'

    return (
      <div className={classes}>
        <div className='filter-editor__column-selector--title'>
          <Heading className='filter-editor__title'>
            Table Column Visibility
          </Heading>

          {hasSelectedColumns ? (
            <RaisedButton label='Reset' onClick={this.handleReset} size='small'>
              <Icon name='settings_backup_restore' variant='error' />
            </RaisedButton>
          ) : null}
        </div>

        <div className='filter-editor__column-selector--body'>
          <Menu
            id='column-selector-menu'
            sameWidth={false}
            visible={visible}
            onClose={this.handleClose}
            position={Menu.Positions.BELOW}
            toggle={toggleButton}
          >
            {columns.map(col => (
              <ColumnSelectorListItem
                column={col}
                key={col.name}
                onToggle={this.handleColumnToggle}
                active={this.isActiveColumn(col)}
              />
            ))}
          </Menu>
          <p className='filter-editor__column-selector--meta'>{metaText}</p>
        </div>
      </div>
    )
  }
}
