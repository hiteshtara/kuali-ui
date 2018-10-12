/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import isString from 'lodash/isString' // eslint-disable-line module-name/kebab-case
import get from 'lodash/get'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'

import {
  AVAILABLE_OPERATORS,
  FIELD_TYPES,
  OPERATION_TYPES,
  OPERATOR_KEYS,
  OPERATOR_FUNCTIONS,
  OPERATOR_TYPES
} from '../../constants'

import {
  Field as FieldPropTypes,
  Operation as OperationPropTypes
} from '../../prop-types'

import DatePickerButton from '../date-picker-button'
import DeleteIcon from '../delete-icon'
import Operation from '../operation'
import TextField from '../text-field-custom'
import TimeField from '../time-field'
import SelectFieldButton from '../select-field-button'

/**
 * @param {string} fieldType
 * @param {(string[])[]} operatorMapping
 * @returns {string[]}
 */
function getOperatorsFor (fieldType, operatorMapping) {
  if (!fieldType || !operatorMapping[fieldType]) {
    return ['Please select a field']
  }
  return operatorMapping[fieldType]
}

const objectValues = typeObj => Object.keys(typeObj).map(key => typeObj[key])

@autobind
export default class Rule extends Component {
  static propTypes = {
    availableFields: PropTypes.arrayOf(FieldPropTypes).isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onRuleChanged: PropTypes.func.isRequired,
    onOperationChanged: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    operationType: OperationPropTypes,
    rowIndex: PropTypes.number.isRequired,
    selectedField: FieldPropTypes,
    selectedOperator: PropTypes.oneOf(objectValues(OPERATOR_TYPES)),
    value: PropTypes.any
  }

  static defaultProps = {
    operationType: OPERATION_TYPES.AND,
    selectedField: undefined,
    selectedOperator: undefined,
    value: undefined
  }

  constructor (props) {
    super(props)

    this.state = {
      field: props.selectedField,
      operator: props.selectedOperator,
      value: props.value
    }
  }

  deleteRule () {
    this.props.onRemove(this.props.id)
  }

  /**
   * @param {string} newField
   */
  fieldChanged (newField) {
    const field = this.props.availableFields.find(f => f.label === newField)
    const { operator } = this.state
    if (operator) {
      const newPossibleOperators = getOperatorsFor(
        field.type,
        AVAILABLE_OPERATORS
      )
      const existingOperatorIsValid = newPossibleOperators.some(
        type => type === operator
      )
      if (!existingOperatorIsValid) {
        this.setState({ operator: undefined })
      }
    }
    this.setState({
      field,
      value: undefined
    })
    this.ruleChanged(field, operator, undefined)
  }

  /**
   * @param {string} operator
   */
  operatorChanged (operator) {
    this.setState({ operator })
    const { field, value } = this.state
    if (
      operator === OPERATOR_TYPES.BLANK ||
      operator === OPERATOR_TYPES.NOT_BLANK
    ) {
      this.setState({ value: undefined })
      this.ruleChanged(field, operator, undefined)
      return
    }
    this.ruleChanged(field, operator, value)
  }

  ruleChanged (field, operator, value) {
    const functionOperatorKey = OPERATOR_KEYS[operator]
    const operatorFunction = OPERATOR_FUNCTIONS[field.type][functionOperatorKey]
    this.props.onRuleChanged({
      id: this.props.id,
      field,
      operator,
      value,
      matchFunction: operatorFunction
        ? operatorFunction(field.name, value)
        : () => {}
    })
  }

  /**
   * @param {string} dateString
   * @param {Date} dateObject
   */
  dateChanged (dateString, dateObject) {
    this.valueChanged(dateObject.getTime())
  }

  valueChanged (value) {
    const { field, operator } = this.state
    if (value === undefined || (isString(value) && value.length === 0)) {
      this.setState({ value: undefined })
      this.ruleChanged(field, operator, undefined)
    } else {
      this.setState({ value })
      this.ruleChanged(field, operator, value)
    }
  }

  getValueChooser () {
    const { field, operator, value } = this.state

    if (!field || !operator) {
      return (
        <TextField
          id={`value${this.props.id}`}
          disabled
          onChange={this.valueChanged}
          className='filter-editor__rule-control'
          value={value || ''}
        />
      )
    }

    if (
      operator === OPERATOR_TYPES.BLANK ||
      operator === OPERATOR_TYPES.NOT_BLANK
    ) {
      return null
    }

    switch (field.type) {
      case FIELD_TYPES.DATE: {
        const dateValue = value ? new Date(value) : null
        return (
          <DatePickerButton
            className='filter-editor__rule-control'
            id={`datepicker${field.label}`}
            onChange={this.dateChanged}
            value={dateValue}
          />
        )
      }
      case FIELD_TYPES.ENUM:
        return (
          <SelectFieldButton
            className='filter-editor__rule-control'
            id={`valueselector${field.label}`}
            menuItems={field.values}
            onChange={this.valueChanged}
            value={value}
          />
        )
      case FIELD_TYPES.NUMBER:
        return (
          <TextField
            id={`value${field.label}`}
            className='filter-editor__rule-control'
            onChange={this.valueChanged}
            value={value || ''}
            type='number'
          />
        )
      case FIELD_TYPES.TEXT:
        return (
          <TextField
            id={`value${field.label}`}
            className='filter-editor__rule-control'
            onChange={this.valueChanged}
            value={value || ''}
          />
        )
      case FIELD_TYPES.TIME:
        return (
          <TimeField
            id={`timeValue${field.label}`}
            className='filter-editor__rule-control'
            onChange={this.valueChanged}
            value={value || ''}
          />
        )
      default:
        throw Error('Invalid field type')
    }
  }

  render () {
    const { rowIndex, operationType, availableFields } = this.props

    return (
      <li className='filter-editor__rule'>
        <DeleteIcon onDelete={this.deleteRule} />

        <div className='filter-editor__rule-content'>
          <Operation
            rowIndex={rowIndex}
            onChange={this.props.onOperationChanged}
            value={operationType}
          />

          <SelectFieldButton
            id='field selector'
            className='filter-editor__rule-control'
            menuItems={availableFields.map(field => field.label)}
            onChange={this.fieldChanged}
            value={get(this, 'state.field.label')}
          />

          <SelectFieldButton
            id='operator selector'
            className='filter-editor__rule-control'
            menuItems={getOperatorsFor(
              get(this, 'state.field.type'),
              AVAILABLE_OPERATORS
            )}
            value={get(this, 'state.operator')}
            onChange={this.operatorChanged}
          />

          {this.getValueChooser()}
        </div>
      </li>
    )
  }
}
