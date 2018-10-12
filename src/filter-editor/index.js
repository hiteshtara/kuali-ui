/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import uuidV4 from 'uuid/v4'
import {
  Field as FieldPropTypes,
  Filter as FilterPropTypes
} from './prop-types'
import { Icon, IconButton, RaisedButton, FlatButton } from '..'
import { Paper } from '../papers'

import {
  OPERATION_TYPES,
  OPERATOR_TYPES,
  OPERATOR_KEYS,
  OPERATOR_FUNCTIONS
} from './constants'

import ColumnSelector from './components/column-selector'
import Content from './components/content'
import Heading from './components/heading'
import Rules from './components/rules'
import Rule from './components/rule'

const NOOP = () => {} // eslint-disable-line no-empty-function

const getOperationFilter = (functionOperatorKey, { type, name }, value) => {
  if (!type || !functionOperatorKey || !OPERATOR_FUNCTIONS[type]) return NOOP
  const getOperationFilter = OPERATOR_FUNCTIONS[type][functionOperatorKey]
  return getOperationFilter ? getOperationFilter(name, value) : NOOP
}

const ruleFilter = (row, { field, operator, value, matchFunction }) => {
  if (matchFunction) return matchFunction(row)
  const functionOperatorKey = OPERATOR_KEYS[operator]
  const operationFilter = getOperationFilter(functionOperatorKey, field, value)

  return operationFilter(row)
}

function ruleIsValid (field, operator, value) {
  return (
    field &&
    operator &&
    (value !== undefined ||
      operator === OPERATOR_TYPES.BLANK ||
      operator === OPERATOR_TYPES.NOT_BLANK)
  )
}

@autobind
export default class FilterEditor extends Component {
  static defaultProps = {
    columns: [],
    filter: {
      columns: [],
      name: '',
      operation: OPERATION_TYPES.AND,
      rules: []
    },
    onClose: NOOP,
    title: 'Filter Rules'
  }

  static propTypes = {
    actions: PropTypes.node,
    columns: PropTypes.array,
    className: PropTypes.string,
    fields: PropTypes.arrayOf(FieldPropTypes).isRequired,
    filter: FilterPropTypes,
    footer: PropTypes.node,
    onClose: PropTypes.func,
    onFilterChanged: PropTypes.func.isRequired,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
  }

  state = {
    incompleteRules: []
  }

  handleColumnSelectionChanged (newFilter) {
    this.props.onFilterChanged(newFilter)
  }

  addRule () {
    this.setState({
      incompleteRules: [...this.state.incompleteRules, { id: uuidV4() }]
    })
  }

  clearAllRules () {
    this.setState({ incompleteRules: [] })
    this.props.onFilterChanged(
      Object.assign({}, this.props.filter, {
        rules: [],
        fn: this.getFilterForRules([])
      })
    )
  }

  operationChanged = operation => {
    const { rules } = this.props.filter
    this.props.onFilterChanged(
      Object.assign({}, this.props.filter, {
        operation,
        fn: this.getFilterForRules(rules, operation)
      })
    )
  }

  ruleChanged ({ id, field, operator, value, matchFunction }) {
    const { state, props } = this
    const valid = ruleIsValid(field, operator, value)

    let rules = [...props.filter.rules]
    const existingValidRule = rules.find(rule => rule.id === id)
    if (existingValidRule) {
      Object.assign(existingValidRule, {
        field: field.name,
        matchFunction,
        operator,
        type: field.type,
        value
      })
      if (!valid) {
        rules = rules.filter(rule => rule.id !== id)

        this.setState({
          incompleteRules: [...state.incompleteRules, existingValidRule]
        })
      }
    } else {
      if (!valid) {
        const incompleteRule = state.incompleteRules.find(
          rule => rule.id === id
        )
        Object.assign(incompleteRule, {
          field: field.name,
          type: field.type,
          operator,
          value
        })
        this.setState({ incompleteRules: state.incompleteRules })
        return
      }

      this.setState({
        incompleteRules: state.incompleteRules.filter(rule => rule.id !== id)
      })
      rules.push({
        field: field.name,
        matchFunction,
        id,
        operator,
        type: field.type,
        value
      })
    }

    const newFilter = Object.assign({}, props.filter, {
      rules,
      fn: this.getFilterForRules(rules)
    })
    props.onFilterChanged(newFilter)
  }

  getFilterForRules = (rules = [], operation) => {
    operation = operation || this.props.filter.operation
    return row => {
      if (!rules.length) return true
      return operation === OPERATION_TYPES.AND
        ? rules.every(ruleFilter.bind(this, row))
        : rules.some(ruleFilter.bind(this, row))
    }
  }

  ruleRemoved (ruleId) {
    const rules = this.props.filter.rules.filter(rule => rule.id !== ruleId)
    this.props.onFilterChanged(
      Object.assign({}, this.props.filter, {
        rules,
        fn: this.getFilterForRules(rules)
      })
    )

    this.setState({
      incompleteRules: this.state.incompleteRules.filter(
        rule => rule.id !== ruleId
      )
    })
  }

  filterNameChanged (name) {
    this.props.onFilterChanged(Object.assign({}, this.props.filter, { name }))
  }

  render () {
    const { incompleteRules } = this.state
    const {
      actions,
      columns: availableColumns,
      fields,
      filter,
      className,
      footer,
      title
    } = this.props

    let rulesToRender = []

    if (filter.rules) {
      rulesToRender = rulesToRender.concat(filter.rules)
    }

    if (incompleteRules) {
      rulesToRender = rulesToRender.concat(incompleteRules)
    }

    const rules = rulesToRender.map((rule, index) => {
      return (
        <Rule
          availableFields={fields}
          key={rule.id}
          id={rule.id}
          onOperationChanged={this.operationChanged}
          onRemove={this.ruleRemoved}
          onRuleChanged={this.ruleChanged}
          operationType={filter.operation}
          rowIndex={index}
          selectedField={fields.find(f => f.name === rule.field)}
          selectedOperator={rule.operator}
          value={rule.value}
        />
      )
    })

    return (
      <Paper className={classnames('filter-editor', className)}>
        <Content>
          <div className='filter-editor__header'>
            <Heading className='filter-editor__title'>{title}</Heading>

            {rulesToRender.length > 0 ? (
              <FlatButton
                label='Clear All Rules'
                onClick={this.clearAllRules}
                size='small'
              >
                delete
              </FlatButton>
            ) : null}
          </div>

          <Rules>{rules}</Rules>

          <div className='filter-editor__actions'>
            <RaisedButton label='Add Rule' onClick={this.addRule}>
              <Icon name='add_circle' variant='success' />
            </RaisedButton>
            {actions}
          </div>
        </Content>

        {availableColumns.length > 0 ? (
          <Content>
            <ColumnSelector
              columns={availableColumns}
              filter={filter}
              onChange={this.handleColumnSelectionChanged}
            />
          </Content>
        ) : null}

        {footer}

        <IconButton
          className='filter-editor__close'
          onClick={this.props.onClose}
          variant='plain'
        >
          <Icon name='clear' />
        </IconButton>
      </Paper>
    )
  }
}
