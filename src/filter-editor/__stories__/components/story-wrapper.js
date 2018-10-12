/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import React, { Component, PureComponent } from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import { action } from '@storybook/addon-actions'

import toggleable from '../../../../.storybook/mixins/toggleable'

import { Icon, FilterEditor, RaisedButton } from '../../..'
import { Divider, Menu, ListItem } from 'react-md'
import { FIELD_TYPES } from '../../constants'

const columns = [
  {
    label: 'Risk Type',
    name: 'risk_type',
    isDefault: false
  },
  {
    label: 'Status',
    name: 'status',
    isDefault: true
  },
  {
    label: 'Date Submitted',
    name: 'date_submitted',
    isDefault: true
  }
]

const fields = [
  {
    label: 'text',
    type: FIELD_TYPES.TEXT,
    name: 'text'
  },
  {
    label: 'date',
    type: FIELD_TYPES.DATE,
    name: 'text'
  },
  {
    label: 'time',
    type: FIELD_TYPES.TIME,
    name: 'time'
  },
  {
    label: 'enum',
    type: FIELD_TYPES.ENUM,
    name: 'enum',
    values: [
      {
        value: '123',
        label: 'value_label'
      }
    ]
  },
  {
    label: 'number',
    type: FIELD_TYPES.NUMBER,
    name: 'number'
  }
]

class FilterSelectorListIem extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    primaryText: PropTypes.node.isRequired
  }

  get leftIcon () {
    return <Icon name='delete' />
  }

  get rightIcon () {
    return <Icon name='done' variant='success' />
  }

  render () {
    const { className, primaryText: label, ...rest } = this.props

    const classes = className
    const primaryText = <span>{label}</span>

    return (
      <ListItem
        className={classes}
        primaryText={primaryText}
        leftIcon={this.leftIcon}
        rightIcon={this.rightIcon}
        {...rest}
      />
    )
  }
}

@toggleable()
@autobind
class FilterSelectButton extends Component {
  static propTypes = {
    isVisible: PropTypes.bool,
    onClose: PropTypes.func,
    onOpen: PropTypes.func,
    onToggle: PropTypes.func
  }

  styles = {
    container: {
      minWidth: 200,
      width: 'auto'
    },
    header: {
      padding: '10px 20px'
    },
    header_title: {
      fontSize: 15,
      fontWeight: 'bold',
      margin: 0
    },
    header_copy: {
      fontSize: 12,
      margin: 0
    }
  }

  handleClose (evt) {
    this.props.onClose()
  }

  get header () {
    return (
      <div style={this.styles.header}>
        <h3 style={this.styles.header_title}>Saved Filters</h3>
        <p style={this.styles.header_copy}>
          Save filters as a reusable view on your data.
        </p>
      </div>
    )
  }

  get toggle () {
    const { onToggle, ...rest } = this.props

    delete rest.isVisible
    delete rest.onClose
    delete rest.onOpen

    return <RaisedButton onClick={onToggle} {...rest} />
  }

  render () {
    const { isVisible } = this.props

    return (
      <Menu
        id='filter-story-wrapper-menu'
        sameWidth={false}
        visible={isVisible}
        onClose={this.handleClose}
        position={Menu.Positions.BELOW}
        style={this.styles.container}
        toggle={this.toggle}
      >
        {this.header}

        <Divider />

        <FilterSelectorListIem primaryText='first asdf asdf asdfj asdjk fasdkj fajk ads kasdf ads j;asd ;asd ;' />
        <FilterSelectorListIem primaryText='second' />
        <FilterSelectorListIem primaryText='third' />
      </Menu>
    )
  }
}

@toggleable({ startVisible: true })
@autobind
export default class FilterEditorStoryWrapper extends Component {
  static propTypes = {
    isVisible: PropTypes.bool,
    onClose: PropTypes.func,
    onOpen: PropTypes.func,
    onToggle: PropTypes.func
  }

  state = {
    filter: undefined
  }

  styles = {
    container: {
      margin: 20
    },
    header: {
      marginBottom: 10
    }
  }

  handleFilterEditorChanged (newFilter) {
    this.setState({ filter: newFilter })
    action('on filter changed')(newFilter)
  }

  handleFilterEditorSaved (evt) {
    action('on filter saved')(evt)
  }

  get newFilterButton () {
    const { isVisible } = this.props

    return (
      <RaisedButton
        disabled={isVisible}
        label='New Filter'
        onClick={this.props.onOpen}
      >
        <Icon name='add' />
      </RaisedButton>
    )
  }

  get applyFilterButton () {
    return (
      <FilterSelectButton label='Apply Filter' iconBefore={false}>
        <Icon name='arrow_drop_down' />
      </FilterSelectButton>
    )
  }

  get searchButton () {
    return (
      <RaisedButton disabled>
        <Icon name='search' />
      </RaisedButton>
    )
  }

  get toggleButton () {
    const { isVisible, onToggle } = this.props

    const variant = isVisible ? 'success' : 'plain'

    return (
      <RaisedButton onClick={onToggle} variant={variant}>
        <Icon name='filter_list' />
      </RaisedButton>
    )
  }

  get editor () {
    const { filter } = this.state
    const { onClose } = this.props

    return (
      <FilterEditor
        columns={columns}
        fields={fields}
        filter={filter}
        onClose={onClose}
        onFilterChanged={this.handleFilterEditorChanged}
        onFilterSaved={this.handleFilterEditorSaved}
      />
    )
  }

  render () {
    const { isVisible } = this.props

    return (
      <div style={this.styles.container}>
        <header style={this.styles.header}>
          {this.searchButton} {this.toggleButton} {this.newFilterButton}{' '}
          {this.applyFilterButton}
        </header>

        {isVisible ? this.editor : null}
      </div>
    )
  }
}
