/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export class PaletteGroup extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired
  }

  styles = {
    group: {
      display: 'flex',
      flexWrap: 'wrap',
      marginBottom: 30,
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

export default class Palette extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    tints: PropTypes.shape({
      100: PropTypes.string.isRequired,
      200: PropTypes.string.isRequired,
      300: PropTypes.string.isRequired,
      400: PropTypes.string.isRequired,
      500: PropTypes.string.isRequired
    }).isRequired
  }

  styles = {
    container: {
      minWidth: 200,
      flexBasis: '25%',
      padding: 10
    },
    display: {
      height: 0,
      marginBottom: 20,
      paddingBottom: `${7 / 6 * 100}%`,
      position: 'relative',
      borderRadius: 2,
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden'
    },
    inner: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%'
    },
    chip: {
      flex: '1',
      width: '25%',
      height: '20%'
    },
    info: {},
    label: {
      marginBottom: 5,
      fontSize: 12,
      display: 'flex',
      alignContents: 'center',
      justifyContent: 'space-between'
    },
    title: {
      fontSize: 18,
      fontWeight: 700,
      color: 'rgb(60, 74, 90)',
      textTransform: 'capitalize'
    },
    sassDef: {
      fontSize: 11,
      margin: 0,
      color: 'rgba(0,0,0,0.5)'
    }
  }

  render () {
    const { styles } = this
    const { tints, title } = this.props

    return (
      <div style={styles.container}>
        <div style={{ ...styles.display, backgroundColor: tints[500] }}>
          <div style={styles.inner}>
            <div style={{ ...styles.chip, backgroundColor: tints[500] }} />
            <div style={{ ...styles.chip, backgroundColor: tints[400] }} />
            <div style={{ ...styles.chip, backgroundColor: tints[300] }} />
            <div style={{ ...styles.chip, backgroundColor: tints[200] }} />
            <div style={{ ...styles.chip, backgroundColor: tints[100] }} />
          </div>
        </div>

        <div style={styles.info}>
          <h4 style={styles.label}>
            <span style={styles.title}>{title.split('-').join(' ')}</span>
          </h4>

          <p style={styles.sassDef}>sass: palette({title})</p>
        </div>
      </div>
    )
  }
}
