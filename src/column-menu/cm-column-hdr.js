/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { TextField, FontIcons } from 'react-md'
import styles from './style.css'

export default class ColumnMenuColumnHeader extends Component {
  static propTypes = {
    filter: PropTypes.bool,
    filterText: PropTypes.string,
    iconStyle: PropTypes.object,
    name: PropTypes.string,
    onChange: PropTypes.func,
    textfieldStyle: PropTypes.object
  }

  getStyles () {
    const { iconStyle, textfieldStyle } = this.props

    const defaultStyle = {
      icon: {
        left: '-50px',
        position: 'absolute',
        top: '10px'
      },
      textfield: {
        position: 'absolute',
        top: '-3px',
        left: '13px',
        width: '160px'
      }
    }

    const { icon, textfield } = defaultStyle
    return {
      icon: Object.assign(icon, iconStyle),
      textfield: Object.assign(textfield, textfieldStyle)
    }
  }

  render () {
    const { filter, filterText, name, onChange } = this.props
    const { icon, textfield } = this.getStyles()

    return (
      <div className={styles.hdr}>
        {filter ? (
          <TextField
            key='cmc-filter-field'
            id='cmc-filter-field'
            placeholder='Filter'
            rightIcon={<FontIcon style={icon}>action_search</FontIcon>}
            value={filterText}
            onChange={onChange}
            fullWidth={false}
            style={textfield}
          />
        ) : (
          <span>{name || ''}</span>
        )}
      </div>
    )
  }
}
