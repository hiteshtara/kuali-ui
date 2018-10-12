/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import React, { Component } from 'react'
import { autobind } from 'core-decorators'
import loremIpsum from 'lorem-ipsum'
import {
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn
} from '../../'

@autobind
export default class PlainWrapper extends Component {
  render () {
    return (
      <DataTable baseId='plain-wrapper' {...this.props}>
        <TableHeader>
          <TableRow>
            <TableColumn>Lorem 1</TableColumn>
            <TableColumn>Lorem 2</TableColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...new Array(5)].map((_, i) => (
            <TableRow key={i}>
              <TableColumn>
                {loremIpsum({ count: 5, units: 'words' })}
              </TableColumn>
              <TableColumn>
                {loremIpsum({ count: 5, units: 'words' })}
              </TableColumn>
            </TableRow>
          ))}
        </TableBody>
      </DataTable>
    )
  }
}
