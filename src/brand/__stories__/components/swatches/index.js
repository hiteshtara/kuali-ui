/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export class SwatchGroup extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired
  }

  styles = {
    group: {
      display: 'flex',
      flexWrap: 'wrap',
      marginLeft: -10,
      marginRight: -10
    }
  }

  render () {
    const { styles } = this
    const { children } = this.props

    return <div style={styles.group}>{children}</div>
  }
}

export default class Swatch extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    variableName: PropTypes.string.isRequired
  }

  styles = {
    swatch: {
      minWidth: 200,
      flexBasis: '20%',
      padding: 10
    },
    inner: {
      backgroundColor: '#FFF',
      borderRadius: 2,
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden'
    },
    display: {
      height: 0,
      paddingBottom: `${5 / 6 * 100}%`
    },
    info: {
      padding: 10
    },
    label: {
      marginBottom: 5,
      fontSize: 12,
      display: 'flex',
      alignContents: 'center',
      justifyContent: 'space-between'
    },
    title: {
      flex: 0
    },
    value: {
      flex: 0
    },
    variable: {
      fontSize: 11,
      margin: 0,
      color: 'rgba(0,0,0,0.5)'
    }
  }

  render () {
    const { styles } = this
    const { title, value, variableName } = this.props

    return (
      <div style={styles.swatch}>
        <div style={styles.inner}>
          <div style={{ ...styles.display, backgroundColor: value }} />

          <div style={styles.info}>
            <h4 style={styles.label}>
              <span style={styles.title}>{title}</span>
              <span style={styles.value}>{value}</span>
            </h4>

            <p style={styles.variable}>{variableName}</p>
          </div>
        </div>
      </div>
    )
  }
}
