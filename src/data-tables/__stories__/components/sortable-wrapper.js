/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */

import React, { PureComponent } from 'react'
import {
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn
} from '../../'
import { sortBy } from 'lodash'
import movies from '../data/movies'

export default class SortableWrapper extends PureComponent {
  state = {
    ascending: false,
    sortedMovies: sortBy(movies, 'title')
  }

  sort = () => {
    const ascending = !this.state.ascending
    const sortedMovies = this.state.sortedMovies.slice()
    sortedMovies.reverse()

    this.setState({ ascending, sortedMovies })
  }

  render () {
    const { ascending, sortedMovies } = this.state

    const rows = sortedMovies.map(({ title, year }) => (
      <TableRow key={title}>
        <TableColumn>{title}</TableColumn>
        <TableColumn numeric>{year}</TableColumn>
      </TableRow>
    ))

    return (
      <DataTable baseId='movies'>
        <TableHeader>
          <TableRow>
            <TableColumn
              grow
              sorted={ascending}
              role='button'
              onClick={this.sort}
            >
              Title
            </TableColumn>
            <TableColumn numeric>Year</TableColumn>
          </TableRow>
        </TableHeader>
        <TableBody>{rows}</TableBody>
      </DataTable>
    )
  }
}
